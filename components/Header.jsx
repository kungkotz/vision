import Image from "next/image";
import React from "react";
import LogoEye from "../public/logoEye.png";
import LogoText from "../public/logoText.png";
import { LogoutIcon, PlusCircleIcon, HomeIcon } from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import Router from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

function Header() {
	const { data: session } = useSession();
	const [open, setOpen] = useRecoilState(modalState);

	return (
		<div className="shadow-sm border-b bg-neutral-800 sticky top-0 z-50">
			<div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
				<div className="flex items-center justify-end space-x-4">
					{session ? (
						<>
							<div className="flex justify-between h-12 ">
								<PlusCircleIcon
									onClick={() => setOpen(true)}
									className=" md:hidden cursor-pointer text-white "
								/>
								<LogoutIcon
									onClick={signOut}
									className="text-white md:hidden cursor-pointer"
								/>
							</div>
							<HomeIcon onClick={() => Router.push("/")} className="navBtn " />

							<PlusCircleIcon
								onClick={() => setOpen(true)}
								className="navBtn"
							/>
						</>
					) : (
						<>
							<button
								className="text-white"
								onClick={() => {
									e.preventDefault(), signIn;
								}}
							>
								Sign In
							</button>
						</>
					)}
				</div>

				{}
				<div className="relative hidden lg:inline-grid  w-24 h-12 cursor-pointer">
					<Image
						onClick={() => Router.push("/")}
						src={LogoText}
						fill
						className="object-contain"
						alt="logo"
					/>
				</div>
				<div className="relative lg:hidden flex-shrink-0  w-24 h-12 cursor-pointer">
					<Image
						onClick={() => Router.push("/")}
						src={LogoEye}
						fill
						className="object-contain"
						alt="logo"
					/>
				</div>
			</div>
		</div>
	);
}

export default Header;
