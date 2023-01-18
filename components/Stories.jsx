import { faker } from "@faker-js/faker";
// https://www.npmjs.com/package/@faker-js/faker - Faker is a popular library that generates fake (but reasonable) data.
import Story from "./Story";
import { useSession } from "next-auth/react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import { db } from "../firebase";
function Stories() {
	const [fakerData, setFakerData] = useState([]);
	const { data: session } = useSession();
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		// get reference to collection
		const ref = query(collection(db, "posts"), orderBy("timestamp", "desc"));

		// subscribe to changes in collection
		const unsubscribe = onSnapshot(ref, (snapshot) => {
			// got me a new snapshot 🤳🏻
			const docs = snapshot.docs.map((doc) => {
				return {
					id: doc.id,
					...doc.data(),
				};
			});

			setPosts(docs);
		});

		return unsubscribe;
	}, []);

	// generating an empty array and setting
	return (
		<div className="overflow-x-scroll flex md:block space-x-2 md:space-x-0 p-6 mt-8 border md:border-hidden rounded-sm md:overflow-visible  ">
			{session && (
				<Story img={session.user.image} username={session.user.username} />
			)}
			{posts.map((post) => (
				<Story
					key={post.id}
					username={post.username}
					userImg={post.profileImg}
					img={post.image}
					text={post.caption}
				/>
			))}
		</div>
	);
}

export default Stories;
