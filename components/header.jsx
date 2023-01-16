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
		<div className="shadow-sm border-b bg-neutral-800 sticky top-0 z-50">
			<div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
				<div className="flex items-center justify-end space-x-4">
					<MenuIcon className="h-6 md:hidden cursor-pointer text-white " />
					<img
						className="h-10 rounded-full cursor-pointer"
						src="https://images.generated.photos/4JcMx1jDIXuHbfBU8clV0RLOv_jT9f3ZAZCLrO7KvRs/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NzQ0NDIxLmpwZw.jpg"
						alt=""
					/>

					<HomeIcon className="navBtn " />
					<div className="relative navBtn">
						<PaperAirplaneIcon className="navBtn rotate-45" />
						<div className="absolute -top-2 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white">
							3
						</div>
					</div>
					<PlusCircleIcon className="navBtn" />
					<UserGroupIcon className="navBtn" />
					<HeartIcon className="navBtn" />
				</div>

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
				<div className="relative hidden lg:inline-grid  w-24 cursor-pointer">
					<Image src={LogoText} fill className="object-contain" />
				</div>
				<div className="relative lg:hidden flex-shrink-0  w-10 cursor-pointer">
					<Image src={LogoEye} fill className="object-contain" />
				</div>
			</div>
		</div>
	);
}

export default header;
