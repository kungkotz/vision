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
		<div className="overflow-x-scroll flex space-x-2 p-6 mt-8 border rounded-sm  scrollbar-thin scrollbar-thumb-black ">
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
