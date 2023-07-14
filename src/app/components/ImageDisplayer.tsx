'use client';

import { useContext, useEffect, useState } from 'react';
import ExpandableImage from './ExpandableImage';
import { CurrentUserContext } from './UserContext';

export default function ImageDisplayer() {
	const [isImageExpanded, setIsImageExpanded] = useState(false);
	const [currentImageExpanded, setCurrentImageExpanded] = useState<
		undefined | string
	>(undefined);
	const [currentImageExpandedName, setCurrentImageExpandedName] = useState<
		undefined | string
	>(undefined);

	const [imagesArray, setImagesArray] = useState<Array<ImageJsonResponse>>();

	const closeImage = () => {
		setIsImageExpanded(false);
		setCurrentImageExpanded(undefined);
		setCurrentImageExpandedName(undefined);
	};

	const user = useContext(CurrentUserContext);

	const removeCurrentImage = async () => {
		const req = await fetch(
			`${process.env.NEXT_PUBLIC_PHOTOM_API_URL}/bucket/${currentImageExpandedName}`,
			{
				method: 'DELETE',
				headers: [['Authorization', `Bearer ${user?.bearer}`]],
			}
		);

		console.log(await req.text());
	};

	const loadImages = async () => {
		const req = await fetch(
			`${process.env.NEXT_PUBLIC_PHOTOM_API_URL}/bucket`,
			{
				method: 'GET',
				headers: [['Authorization', `Bearer ${user?.bearer}`]],
			}
		);

		const res: Array<ImageJsonResponse> = await req.json();
		res.shift();

		setImagesArray(res);

		return res;
	};

	useEffect(() => {
		loadImages();
	}, []);

	return (
		<>
			{isImageExpanded && (
				<>
					<div
						className="wh-full fixed left-0 top-0 bottom-0 right-0 opacity-70 bg-black z-40"
						onClick={closeImage}
					></div>
					<div className="fixed left-0 top-0 bottom-0 right-0 flex items-center justify-center z-40 pointer-events-none">
						<div className="relative w-3/4 h-3/4 pointer-events-auto flex items-center justify-center bg-white rounded-md border-4 border-black max-w-[275px]">
							<div
								className="absolute w-8 h-8 -right-3 -top-3 flex items-center bg-black rounded-full"
								onClick={closeImage}
							>
								<div className="absolute w-3/4 h-1 left-1/2 -translate-x-1/2 bg-white rounded-full rotate-45"></div>
								<div className="absolute w-3/4 h-1 left-1/2 -translate-x-1/2 bg-white rounded-full -rotate-45"></div>
							</div>
							<img
								src={currentImageExpanded}
								className="h-3/4 object-contain"
							/>
							<button
								onClick={removeCurrentImage}
								className={`absolute left-1/2 -translate-x-1/2 -bottom-5 py-2 px-3 rounded-full bg-red-600 text-white`}
							>
								Remover
							</button>
						</div>
					</div>
				</>
			)}
			<div className="wh-full pt-4 pb-1 border border-gray-600 bg-pink-100 rounded-lg flex flex-wrap gap-4 justify-center overflow-auto">
				{imagesArray?.map(e => {
					return (
						<ExpandableImage
							src={e.presignedUrl}
							onClick={() => {
								setIsImageExpanded(true);
								setCurrentImageExpanded(e.presignedUrl);
								setCurrentImageExpandedName(e.name);
							}}
							key={e.name}
						/>
					);
				})}
			</div>
		</>
	);
}

interface ImageJsonResponse {
	name: string;
	presignedUrl: string;
}
