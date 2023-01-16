import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

function SideProfile() {
	const { data: session } = useSession();
	return (
		<div className="flex items-center justify-between mt-14 ml-10 ">
			<img
				className="rounded-full border p-[2px] w-16 h-16"
				src={session?.user.image}
				alt="random"
			/>
			<div className="flex-1 mx-4">
				<h2 className="font-bold">{session?.user?.username}</h2>
				<h3
					className="text-sm text-gray-400
                "
				>
					Welcome to Vision
				</h3>
			</div>
			<button onClick={signOut} className="text-red-400 font-bold">
				Sign Out
			</button>
		</div>
	);
}

export default SideProfile;
