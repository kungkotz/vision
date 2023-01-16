import { useSession } from "next-auth/react";
import React from "react";

function SideProfile() {
	const { data: session } = useSession();
	console.log(session);
	return (
		<div className="flex items-center justify-between mt-14 ml-10 ">
			<img
				className="rounded-full border p-[2px] w-16 h-16"
				src="https://images.generated.photos/4JcMx1jDIXuHbfBU8clV0RLOv_jT9f3ZAZCLrO7KvRs/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NzQ0NDIxLmpwZw.jpg"
				alt="random"
			/>
			<div className="flex-1 mx-4">
				<h2 className="font-bold">Kungkotz</h2>
				<h3
					className="text-sm text-gray-400
                "
				>
					Welcome to Vision
				</h3>
			</div>
			<button className="text-red-400 font-bold">Sign Out</button>
		</div>
	);
}

export default SideProfile;
