import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import { db } from "../firebase";

function Posts() {
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		const unsubscribe = onSnapshot(
			query(collection(db, "posts"), orderBy("timestamp", "desc")),
			(snapshot) => {
				setPosts(snapshot.docs);
			}
		);
		return unsubscribe();
	}, [db]);
	console.log(posts);
	return (
		<div>
			{posts.map((post) => (
				<Post
					key={post.id}
					username={post.data().username}
					userImg={post.data().profileImg}
					img={post.data().image}
					text={post.data().caption}
				/>
			))}
		</div>
	);
}

export default Posts;
