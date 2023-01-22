import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import { db } from "../firebase";

function Posts() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const ref = query(collection(db, "posts"), orderBy("timestamp", "desc"));
		const unsubscribe = onSnapshot(ref, (snapshot) => {
			const docs = snapshot.docs.map((doc) => {
				return {
					id: doc.id,
					...doc.data(),
				};
			});

			setPosts(docs);
		});

		return unsubscribe;
	}, [db]);

	return (
		<div>
			{posts.map((post) => (
				<Post
					key={post.id}
					postId={post.id}
					username={post.username}
					userImage={post.userImage}
					img={post.image}
					text={post.caption}
				/>
			))}
		</div>
	);
}

export default Posts;
