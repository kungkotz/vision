import React from "react";
import { getProviders, signIn as SignIntoProvider } from "next-auth/react";
import Header from "../../components/Header";
import logo from "../../public/googleIcon.png";
import Image from "next/image";

function signIn({ providers }) {
	return (
		<>
			<Header />
			<div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-56">
				<Image className="w-80" src={logo} alt="" />
				<div className="">
					{Object.values(providers).map((provider) => (
						<div key={provider.name}>
							<button
								className="p-5 bg-gray-600 rounded-full text-white"
								onClick={() =>
									SignIntoProvider(provider.id, { callbackUrl: "/" })
								}
							>
								Sign in with {provider.name}
							</button>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export async function getServerSideProps() {
	const providers = await getProviders();

	return {
		props: {
			providers,
		},
	};
}

export default signIn;
