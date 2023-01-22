import Story from "./Story";
import { useSession } from "next-auth/react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
function Stories() {
	const { data: session } = useSession();
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const ref = query(collection(db, "stories"), orderBy("timestamp", "desc"));

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
		<div className="overflow-x-scroll flex md:block space-x-2 md:space-x-0 p-6 mt-8 border md:border-hidden rounded-sm md:overflow-visible  ">
			{session && (
				<>
					{posts.map((post) => (
						<Story
							key={post.id}
							username={post.username}
							userImg={post.profileImage}
							img={post.image}
							text={post.caption}
						/>
					))}
				</>
			)}
		</div>
	);
}

export default Stories;
