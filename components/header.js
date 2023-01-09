import Image from "next/image";
import React from "react";
import LogoEye from "../public/logoEye.png";
import LogoText from "../public/logoText.png";
import {
	SearchIcon,
	PlusCircleIcon,
	UserGroupIcon,
	HeartIcon,
	PaperAirplaneIcon,
	MenuIcon,
	HomeIcon,
} from "@heroicons/react/outline";

function header() {
	return (
		<div>
			{/* Left side */}
			<div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
				<div className="relative hidden lg:inline-grid  w-24 cursor-pointer">
					<Image src={LogoText} fill class="object-contain" />
				</div>
				<div className="relative lg:hidden flex-shrink-0  w-10 cursor-pointer">
					<Image src={LogoEye} fill class="object-contain" />
				</div>
				{/* Middle - Search input */}
				<div className="max-w-xs">
					<div className="relative mt-1 p-3 rounded-md ">
						<div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
							<SearchIcon className="h-5 w-5 text-gray-500" />
						</div>
						<input
							className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300  focus:ring-black focus:border-black rounded-md"
							type="text"
							placeholder="Search"
						/>
					</div>
				</div>
				{/* Right side */}
				<div className="flex items-center justify-end space-x-4">
					<HomeIcon className="navBtn" />
					<MenuIcon className="h-6 md:hidden cursor-pointer" />
					<PaperAirplaneIcon className="navBtn" />
					<PlusCircleIcon className="navBtn" />
					<UserGroupIcon className="navBtn" />
					<HeartIcon className="navBtn" />
				</div>
			</div>
		</div>
	);
}

export default header;
