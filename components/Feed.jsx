import React from "react";
import Stories from "./Stories";
import Posts from "./Posts";
import SideProfile from "./SideProfile";
import SuggestedProfiles from "./SuggestedProfiles";

function Feed() {
	return (
		<main className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto">
			<section className=" hidden xl:inline-grid md:col-span-1">
				<div className="fixed ">
					<SideProfile />
					<SuggestedProfiles />
				</div>
			</section>

			<section className="col-span-2 md:hidden">
				<Stories />
				<Posts />
			</section>
			<section className="col-span-2  ">
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
