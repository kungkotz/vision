import Image from "next/image";
import React from "react";
import LogoEye from "../public/logoEye.png";
import LogoText from "../public/logoText.png";

import {
	LogoutIcon,
	SearchIcon,
	PlusCircleIcon,
	UserGroupIcon,
	HeartIcon,
	PaperAirplaneIcon,
	MenuIcon,
	HomeIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import Router from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

function header() {
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

							<div className="relative navBtn">
								<PaperAirplaneIcon className="navBtn rotate-45" />
								<div className="absolute -top-2 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white">
									3
								</div>
							</div>
							<PlusCircleIcon
								onClick={() => setOpen(true)}
								className="navBtn"
							/>
							<UserGroupIcon className="navBtn" />
							<HeartIcon className="navBtn" />
						</>
					) : (
						<>
							<button className="text-white" onClick={signIn}>
								Sign In
							</button>
							<HomeIcon onClick={() => Router.push("/")} className="navBtn " />
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
					/>
				</div>
				<div className="relative lg:hidden flex-shrink-0  w-24 h-12 cursor-pointer">
					<Image
						onClick={() => Router.push("/")}
						src={LogoEye}
						fill
						className="object-contain"
					/>
				</div>
			</div>
		</div>
	);
}

export default header;
