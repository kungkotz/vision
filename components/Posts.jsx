import React from "react";
import Post from "./Post";

function Posts() {
	const postArray = [
		{
			id: "123",
			username: "kungkotz",
			userImg:
				"https://images.generated.photos/4JcMx1jDIXuHbfBU8clV0RLOv_jT9f3ZAZCLrO7KvRs/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NzQ0NDIxLmpwZw.jpg",
			img: "https://images.generated.photos/4JcMx1jDIXuHbfBU8clV0RLOv_jT9f3ZAZCLrO7KvRs/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NzQ0NDIxLmpwZw.jpg",
			text: "This is a text",
		},
		{
			id: "123",
			username: "kungkotz",
			userImg:
				"https://images.generated.photos/4JcMx1jDIXuHbfBU8clV0RLOv_jT9f3ZAZCLrO7KvRs/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NzQ0NDIxLmpwZw.jpg",
			img: "https://images.generated.photos/4JcMx1jDIXuHbfBU8clV0RLOv_jT9f3ZAZCLrO7KvRs/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NzQ0NDIxLmpwZw.jpg",
			text: "This is a text",
		},
	];
	return (
		<div>
			{postArray.map((post) => (
				<Post
					key={post.id}
					username={post.username}
					userImg={post.userImg}
					img={post.img}
					text={post.text}
				/>
			))}
		</div>
	);
}

export default Posts;
