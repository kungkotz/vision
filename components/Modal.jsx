/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { CameraIcon } from "@heroicons/react/outline";
import { db, storage } from "../firebase";
import {
	addDoc,
	collection,
	doc,
	serverTimestamp,
	updateDoc,
} from "@firebase/firestore";
import { useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

export default function postModal() {
	const { data: session } = useSession();
	const [open, setOpen] = useRecoilState(modalState);
	const [selectedFile, setSelectedFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const [buttonStatus, setButtonStatus] = useState(false);
	const [isStory, setIsStory] = useState(false);
	const captionRef = useRef(null);
	const filePickerRef = useRef(null);
	const cancelButtonRef = useRef(null);

	const uploadPost = async () => {
		if (loading) return;
		setLoading(true);
		if (!isStory) {
			const docRef = await addDoc(collection(db, "posts"), {
				username: session.user.username,
				caption: captionRef.current.value,
				userImage: session.user.image,
				timestamp: serverTimestamp(),
			});
			console.log("New doc added with ID", docRef.id);
			const imageRef = ref(storage, `posts/${docRef.id}/image`);

			await uploadString(imageRef, selectedFile, "data_url").then(
				async (snapshot) => {
					const downloadURL = await getDownloadURL(imageRef);
					await updateDoc(doc(db, "posts", docRef.id), {
						image: downloadURL,
					});
				}
			);
			setOpen(false);
			setLoading(false);
			setSelectedFile(null);
		} else if (isStory) {
			const docRef = await addDoc(collection(db, "stories"), {
				username: session.user.username,
				userImage: session.user.image,
				timestamp: serverTimestamp(),
			});
			console.log("New doc added with ID", docRef.id);
			const imageRef = ref(storage, `stories/${docRef.id}/image`);

			await uploadString(imageRef, selectedFile, "data_url").then(
				async (snapshot) => {
					const downloadURL = await getDownloadURL(imageRef);
					await updateDoc(doc(db, "stories", docRef.id), {
						image: downloadURL,
					});
				}
			);
			setOpen(false);
			setLoading(false);
			setSelectedFile(null);
		}
	};

	const cancel = () => {
		setSelectedFile(null);
		setOpen(false);
	};

	const addImageToPost = (e) => {
		const reader = new FileReader();
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
		}
		reader.onload = (e) => {
			setSelectedFile(e.target.result);
		};
	};

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as="div"
				className="fixed z-10 inset-0 overflow-y-auto"
				initialFocus={cancelButtonRef}
				onClose={() => cancel()}
			>
				<div
					className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block
					sm:p-0"
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className="hidden sm:inline-block sm:align-middle sm:h-screen"
						aria-hidden="true"
					>
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<div
							className="inline-block align-bottom bg-white rounded-lg
							 text-left 
							 overflow-hidden shadow-xl 
							 transform transition-all 
							 sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
						>
							<div>
								{selectedFile ? (
									<div>
										<div>
											<img src={selectedFile} alt="HERE BE FILE" />
										</div>
									</div>
								) : (
									<div className="flex justify-center cursor-pointer">
										<CameraIcon
											className="h-24 w-24 text-red-600 "
											aria-hidden="true"
											onClick={() => filePickerRef.current.click()}
										/>
										<input
											ref={filePickerRef}
											type="file"
											hidden
											onChange={addImageToPost}
										/>
									</div>
								)}

								{!isStory && (
									<div>
										<div className="mt-3 text-center sm:mt-5">
											<div className="mt-2 ">
												<input
													className=" border-none focus-ring-0 w-full text-center "
													type="text"
													ref={captionRef}
													placeholder="Write a caption..."
													accept=".png, .jpg, .jpeg"
												/>
											</div>
										</div>
									</div>
								)}
							</div>
							<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
								<button
									type="button"
									disabled={!selectedFile}
									className="w-full inline-flex justify-center rounded-md
									border border-transparent shadow-sm px-4 py-2 bg-red-600
									text-base font-medium text-white hover:bg-red-700 
									focus:outline-none focus:ring-2 focus:ring-offset-2
									focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:bg-gray-600"
									onClick={uploadPost}
									title={
										!selectedFile ? "Please select a file to upload" : "Publish"
									}
								>
									{loading ? "Publishing..." : "Publish"}
								</button>

								<button
									type="button"
									className="mt-3 w-full inline-flex justify-center
									rounded-md border border-gray-300 shadow-sm px-4 py-2
									bg-white text-base font-medium text-gray-700
									hover:bg-gray-50 focus:outline-none focus:ring-2
									focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0
									sm:ml-3 sm:w-auto sm:text-sm"
									onClick={() => setSelectedFile(null)}
								>
									Reset
								</button>
								<button
									type="button"
									className="mt-3 w-full inline-flex justify-center
									rounded-md border border-gray-300 shadow-sm px-4 py-2
									bg-white text-base font-medium text-gray-700
									hover:bg-gray-50 focus:outline-none focus:ring-2
									focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0
									sm:ml-3 sm:w-auto sm:text-sm"
									onClick={() => cancel()}
									ref={cancelButtonRef}
								>
									Cancel
								</button>
								<label class="inline-flex relative items-center mr-5 cursor-pointer">
									<input
										type="checkbox"
										className="sr-only peer"
										checked={isStory}
										readOnly
									/>
									<div
										onClick={() => {
											setIsStory(!isStory);
										}}
										className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  mt-5 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
									></div>
									<span className="ml-2 text-sm font-medium mt-5 text-gray-900">
										Post a Story?
									</span>
								</label>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
