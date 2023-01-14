import React from "react";
import Stories from "./Stories";
function Feed() {
	return (
		<main className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto">
			{/* The main element respresents the main content on the webpage, the main content will be displayed using grid and will have 3 breakoints, from 1 to 3 */}
			<section>
				<Stories />
			</section>
		</main>
	);
}

export default Feed;
