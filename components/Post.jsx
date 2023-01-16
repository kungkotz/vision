import React from "react";
import Image from "next/image";
import {
	BookmarkIcon,
	ChatIcon,
	DotsHorizontalIcon,
	EmojiHappyIcon,
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
			<div className="flex justify-between pt-4 px-4">
				<div className=" flex space-x-2">
					<HeartIcon className="postBtn" />
					<ChatIcon className="postBtn" />
					<PaperAirplaneIcon className="postBtn" />
				</div>
				<BookmarkIcon className="postBtn" />
			</div>
			<p className="truncate pt-4">
				<span className="ml-5 mr-1 font-bold">{username}</span>
				{text}
			</p>
			<form className="flex items-center p-4">
				<input
					className="border-none flex-1 focus:ring-0 outline-none "
					type="text"
					placeholder="Add a comment..."
				/>
				<div className="flex ">
					<EmojiHappyIcon className="postBtn mx-1" />
					<button className="font-semibold text-red-600">Publish</button>
				</div>
			</form>
		</div>
	);
}

export default Post;
