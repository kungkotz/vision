import React, { useState } from "react";
import { useEffect } from "react";
import { faker } from "@faker-js/faker";

function SuggestedProfiles() {
	const [suggestedProfiles, setSuggestedProfiles] = useState([]);

	useEffect(() => {
		const suggestedProfiles = [...Array(5)].map((_, i) => ({
			id: i,
			username: faker.internet.userName(),
			avatar: faker.image.avatar(),
		}));

		setSuggestedProfiles(suggestedProfiles);
	}, []);
	return (
		<div className="ml-10 mt-4">
			<div className="flex justify-between text-sm mb-4">
				<h3 className="text-xl font-medium mx-4 ">Suggested Profiles</h3>
				<button className="text-red-400 font-bold">See All</button>
			</div>
			{suggestedProfiles.map((profile) => (
				<div
					key={profile.id}
					className="flex items-center justify-between mt-3"
				>
					<img
						className="rounded-full border p-[2px] w-10 h-10"
						src={profile.avatar}
						alt=""
					/>
					<div className="flex-1 m-1">
						<h2 className="font-semibold text-sm">{profile.username}</h2>
						<h3 className="text-xs text-gray-400"> {profile.company}</h3>
					</div>
					<button className="text-red-400 text-xs font-bold">Follow</button>
				</div>
			))}
		</div>
	);
}

export default SuggestedProfiles;
