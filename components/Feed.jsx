import React from "react";
import Stories from "./Stories";
import Posts from "./Posts";
import SideProfile from "./SideProfile";

function Feed() {
	return (
		<main className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto">
			{/* By default on the mobile view, the main elemnent will consist of 1 column, 2 on medium screens and 3 on large screens with a max width of 1152px */}

			<section className=" hidden xl:inline-grid md:col-span-1">
				<div className="fixed">
					<SideProfile />
				</div>
			</section>

			<section className="col-span-2 md:hidden">
				{/* This section will take up 2 out of 3 coluns on the page */}

				<Stories />
				<Posts />
			</section>
			<section className="col-span-2  ">
				{/* This section will take up 2 out of 3 coluns on the page */}

				<div className="hidden md:flex ">
					<div>
						<Posts />
					</div>
					<Stories />
				</div>
			</section>
		</main>
	);
}

export default Feed;
