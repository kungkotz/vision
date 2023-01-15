import React from "react";
import Stories from "./Stories";
import Posts from "./Posts";

function Feed() {
	return (
		<main className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto">
			{/* By default on the mobile view, the main elemnent will consist of 1 column, 2 on medium screens and 3 on large screens with a max width of 1152px */}
			<section className="col-span-2">
				{/* This section will take up 2 out of 3 coluns on the page */}
				<Stories />
				<Posts />
			</section>
		</main>
	);
}

export default Feed;
