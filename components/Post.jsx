import React, { useState, useEffect } from "react";
import {
	BookmarkIcon,
	ChatIcon,
	DotsHorizontalIcon,
	EmojiHappyIcon,
	HeartIcon,
	PaperAirplaneIcon,
} from "@heroicons/react/outline";
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
} from "firebase/firestore";
import Moment from "react-moment";

function Post({ postId, username, userImage, img, text }) {
	const { data: session } = useSession();
	const [comment, setComment] = useState("");
	const [commentsArray, setCommentsArray] = useState([]);
	const [commentField, setCommentField] = useState(true);

	const handleInputField = () => {
		commentField ? setCommentField(false) : setCommentField(true);
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
	}, [db]);

	return (
		<div className="my-7 border  rounded-sm ">
			<div className="flex items-center p-5">
				<img
					className="h-12 w-12 rounded-full object-contain border p-1 mr-3"
					src={userImage}
				/>
				<p className="font-bold flex-1">{username}</p>
				<DotsHorizontalIcon className="h-5" />
			</div>
			<img className="object-cover w-full" src={img} alt="" />
			<div className="flex justify-between pt-4 px-4 ">
				<div className=" flex space-x-2">
					<HeartIcon className="postBtn" />
					<ChatIcon className="postBtn" onClick={handleInputField} />
					<PaperAirplaneIcon className="postBtn" />
				</div>
				<BookmarkIcon className="postBtn" />
			</div>
			<p className="truncate pt-4 ">
				<span className="ml-5 font-bold">{username}</span>
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
			<div hidden={commentField}>
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
