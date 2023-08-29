'use client';

import { useContext, useEffect, useState } from 'react';
import ExpandableImage from './ExpandableImage';
import { CurrentUserContext } from './UserContext';
import { ImageJsonResponse } from '../interfaces/ImageJsonResponse';
import Spinner from './Spinner';

export default function ImageDisplayer({
	imagesArray,
	loadImagesFunc,
}: {
	imagesArray: Array<ImageJsonResponse>;
	loadImagesFunc: () => Promise<ImageJsonResponse[]>;
}) {
	const [isImageExpanded, setIsImageExpanded] = useState(false);
	const [currentImageExpanded, setCurrentImageExpanded] = useState<
		undefined | string
	>(undefined);
	const [currentImageExpandedName, setCurrentImageExpandedName] = useState<
		undefined | string
	>(undefined);
	const [imageIsRemoved, setImageIsRemoved] = useState<boolean>(false);
	const [isRemovingImage, setIsRemovingImage] = useState<boolean>(false);

	const closeImage = () => {
		setIsImageExpanded(false);
		setCurrentImageExpanded(undefined);
		setCurrentImageExpandedName(undefined);
		setImageIsRemoved(false);
		setIsRemovingImage(false);
	};

	const user = useContext(CurrentUserContext);

	const removeCurrentImage = async () => {
		setIsRemovingImage(true);
		const req = await fetch(
			`${process.env.NEXT_PUBLIC_PHOTOM_API_URL}/bucket/${currentImageExpandedName}`,
			{
				method: 'DELETE',
				headers: [['Authorization', `Bearer ${user?.bearer}`]],
			}
		);

		loadImagesFunc();
		setImageIsRemoved(true);
		setIsRemovingImage(false);

		await req.text();
	};
	return (
		<>
			{isImageExpanded && (
				<>
					<div
						className="wh-full fixed left-0 top-0 bottom-0 right-0 opacity-70 bg-black z-40"
						onClick={closeImage}
					></div>
					<div className="fixed left-0 top-0 bottom-0 right-0 flex items-center justify-center z-40 pointer-events-none">
						<div className="relative w-3/4 h-3/4 pointer-events-auto flex flex-col items-center justify-center bg-white rounded-md border-4 border-black max-w-[370px]">
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
							{imageIsRemoved && (
								<p className="font-bold text-center text-green-600">
									Imagem removida com sucesso
								</p>
							)}
							<button
								onClick={removeCurrentImage}
								disabled={imageIsRemoved}
								className={`flex justify-center min-w-[120px] absolute left-1/2 -translate-x-1/2 -bottom-5 py-2 px-3 rounded-full bg-red-600 text-white`}
							>
								{isRemovingImage ? <Spinner /> : <p>Remover</p>}
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
