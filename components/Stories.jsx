import { faker } from "@faker-js/faker";
// https://www.npmjs.com/package/@faker-js/faker - Faker is a popular library that generates fake (but reasonable) data.
import { useEffect, useState } from "react";
import Story from "./Story";
function Stories() {
	const [fakerData, setFakerData] = useState([]);
	useEffect(() => {
		const fakerData = [...Array(20)].map((_, i) => ({
			id: i,
		}));
		setFakerData(fakerData);
	}, []);

	// generating an empty array and setting
	return (
		<div className="overflow-x-scroll flex md:block space-x-2 md:space-x-0 p-6 mt-8 border md:border-hidden rounded-sm md:overflow-visible  ">
			{fakerData.map((profile) => (
				<Story
					key={faker.datatype.uuid()}
					img={faker.image.avatar()}
					username={faker.internet.userName()}
				/>
			))}
		</div>
	);
}

export default Stories;
