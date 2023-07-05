'use client';

import { useState } from 'react';
import ExpandableImage from './ExpandableImage';
import { Ysabeau } from 'next/font/google';
const LoveLight = Ysabeau({ weight: '400', subsets: ['latin'] });

export default function ImageDisplayer() {
	const [isImageExpanded, setIsImageExpanded] = useState(false);
	const [currentImageExpanded, setCurrentImageExpanded] = useState<
		null | string
	>(null);
	const image: string = 'thays1.jpg';
	const closeImage = () => {
		setIsImageExpanded(false);
		setCurrentImageExpanded(null);
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
						<div className="relative w-fit h-3/4 pointer-events-auto">
							<div
								className="absolute w-8 h-8 -right-3 -top-3 flex items-center bg-black rounded-full"
								onClick={closeImage}
							>
								<div className="absolute w-3/4 h-1 left-1/2 -translate-x-1/2 bg-white rounded-full rotate-45"></div>
								<div className="absolute w-3/4 h-1 left-1/2 -translate-x-1/2 bg-white rounded-full -rotate-45"></div>
							</div>
							<img src={image} className="wh-full object-contain" />
							<button
								className={`absolute left-1/2 -translate-x-1/2 -bottom-5 py-2 px-3 rounded-full bg-red-600 text-white ${LoveLight.className}`}
							>
								Remover
							</button>
						</div>
					</div>
				</>
			)}
			<div className="wh-full pt-4 pb-1 border border-gray-600 bg-pink-100 rounded-lg flex flex-wrap gap-4 justify-center overflow-auto">
				<ExpandableImage
					src={image}
					onClick={() => {
						setIsImageExpanded(true);
						setCurrentImageExpanded(image);
					}}
				/>
				<ExpandableImage
					src={image}
					onClick={() => {
						setIsImageExpanded(true);
						setCurrentImageExpanded(image);
					}}
				/>
				<ExpandableImage
					src={image}
					onClick={() => {
						setIsImageExpanded(true);
						setCurrentImageExpanded(image);
					}}
				/>
				<ExpandableImage
					src={image}
					onClick={() => {
						setIsImageExpanded(true);
						setCurrentImageExpanded(image);
					}}
				/>
				<ExpandableImage
					src={image}
					onClick={() => {
						setIsImageExpanded(true);
						setCurrentImageExpanded(image);
					}}
				/>
			</div>
		</>
	);
}
