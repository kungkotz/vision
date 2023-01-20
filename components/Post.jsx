import React, { useState, useEffect } from "react";
import {
	BookmarkIcon,
	ChatIcon,
	DotsHorizontalIcon,
	EmojiHappyIcon,
	HeartIcon,
	PaperAirplaneIcon,
} from "@heroicons/react/outline";

import {
	HeartIcon as HeartIconLiked,
	ChatIcon as ChatIconOpen,
} from "@heroicons/react/solid";
// https://www.npmjs.com/package/heroicons
import { db } from "../firebase";
import { useSession } from "next-auth/react";
import {
	addDoc,
	collection,
	serverTimestamp,
	query,
	orderBy,
	onSnapshot,
	setDoc,
	doc,
	deleteDoc,
} from "firebase/firestore";
import Moment from "react-moment";

function Post({ postId, username, userImage, img, text }) {
	const { data: session } = useSession();
	const [comment, setComment] = useState("");
	const [commentsArray, setCommentsArray] = useState([]);
	const [isInputFieldOpen, setIsInputFieldOpen] = useState(false);
	const [likes, setLikes] = useState([]);
	const [hasLiked, setHasLiked] = useState(false);

	const handleInputField = () => {
		isInputFieldOpen ? setIsInputFieldOpen(false) : setIsInputFieldOpen(true);
	};

	const sendComment = async (e) => {
		e.preventDefault();
		const userComment = comment;
		setComment("");
		await addDoc(collection(db, "posts", postId, "comments"), {
			comment: userComment,
			username: session.user.username,
			userImage: session.user.image,
			timestamp: serverTimestamp(),
		});
	};

	const likePost = async () => {
		const ref = doc(db, "posts", postId, "likes", session.user.uid);
		if (hasLiked) {
			await deleteDoc(doc(db, "posts", postId, "likes", session.user.uid));
		} else
			await setDoc(ref, {
				usename: session.user.username,
			});
	};

	useEffect(
		() =>
			setHasLiked(
				likes.findIndex((like) => like.id === session?.user?.uid) !== -1
			),
		[likes]
	);

	useEffect(
		() =>
			onSnapshot(collection(db, "posts", postId, "likes"), (snapshot) =>
				setLikes(snapshot.docs)
			),
		[db, postId]
	);

	useEffect(() => {
		const ref = query(
			collection(db, "posts", postId, "comments"),
			orderBy("timestamp", "desc")
		);
		const unsubscribe = onSnapshot(ref, (snapshot) => {
			const docs = snapshot.docs.map((doc) => {
				return {
					id: doc.id,
					...doc.data(),
				};
			});
			setCommentsArray(docs);
		});

		return unsubscribe;
	}, [db, postId]);

	return (
		<div className="my-7 border  rounded-sm ">
			<div className="flex items-center p-5">
				<img
					className="h-12 w-12 rounded-full object-contain border p-1 mr-3"
					src={userImage}
					alt="TRYHARD"
				/>
				<p className="font-bold flex-1">{username}</p>
				<DotsHorizontalIcon className="h-5" />
			</div>
			<img className="object-cover w-full" src={img} alt="" />
			<div className="flex justify-between pt-4 px-4 ">
				<div className=" flex space-x-4">
					{hasLiked ? (
						<HeartIconLiked
							className="postBtn text-red-600"
							onClick={likePost}
						/>
					) : (
						<HeartIcon className="postBtn" onClick={likePost} />
					)}
					{isInputFieldOpen ? (
						<ChatIcon className="postBtn" onClick={handleInputField} />
					) : (
						<ChatIcon
							className="postBtn text-blue-600"
							onClick={handleInputField}
						/>
					)}
					<PaperAirplaneIcon className="postBtn" />
				</div>
				<BookmarkIcon className="postBtn" />
			</div>
			<p className="truncate pt-4 ">
				{likes.length > 0 && (
					<p className="font-bold mb-1 ml-5">{likes.length} Likes</p>
				)}
				<span className="ml-5 font-bold">{username} </span>
				{text}
			</p>
			<div className="">
				<div className="ml-10  overflow-y-scroll mt-5">
					{commentsArray.map((comment) => (
						<div key={comment.id} className="flex items-center space-x-2 mb-3">
							<img
								src={comment.userImage}
								alt=""
								className="h-7 rounded-full"
							/>
							<p className="text-sm flex-1">
								<span className="font-bold">{comment.username}</span>{" "}
								{comment.comment}
							</p>
							<Moment className="text-xs pr-3" fromNow>
								{comment.timestamp?.toDate()}
							</Moment>
						</div>
					))}
				</div>
			</div>
			<div hidden={isInputFieldOpen}>
				<form className="flex items-center p-4">
					<input
						className="border-none flex-1 focus:ring-0 outline-none "
						type="text"
						placeholder="Add a comment..."
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					/>
					<div className="flex ">
						<EmojiHappyIcon className="postBtn mx-1" />
						<button
							onClick={sendComment}
							type="submit"
							className="font-semibold"
							disabled={!comment.trim()}
						>
							Post
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Post;
