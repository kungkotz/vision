import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Feed from "../components/Feed";
import Modal from "../components/Modal";

const Home: NextPage = () => {
	return (
		<div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
			<Head>
				<title>VISION</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Modal />
			<Header />
			<Feed />
		</div>
	);
};

export default Home;
