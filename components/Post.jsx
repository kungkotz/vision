import React from "react";
import Image from "next/image";
import {
	BookmarkIcon,
	ChatIcon,
	DotsHorizontalIcon,
	HeartIcon,
	PaperAirplaneIcon,
} from "@heroicons/react/outline";
// https://www.npmjs.com/package/heroicons

function Post({ id, username, userImg, img, text }) {
	return (
		<div className="my-7 border  rounded-sm ">
			<div className="flex items-center p-5">
				<img
					className="h-12 w-12 rounded-full object-contain border p-1 mr-3"
					src={userImg}
				/>
				<p className="font-bold flex-1">{username}</p>
				<DotsHorizontalIcon className="h-5" />
			</div>
			<img className="object-cover w-full" src={img} alt="" />
			<div className="flex justify-between ">
				<div className=" flex space-x-2">
					<HeartIcon className="postBtn" />
					<ChatIcon className="postBtn" />
					<PaperAirplaneIcon className="postBtn" />
				</div>
				<BookmarkIcon className="postBtn" />
			</div>
		</div>
	);
}

export default Post;
