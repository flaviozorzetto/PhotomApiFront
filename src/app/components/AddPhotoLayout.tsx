import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { CurrentUserContext } from '../components/UserContext';

export default function AddPhotoLayout({
	setAddPhotoDisplay,
}: {
	setAddPhotoDisplay: (arg0: boolean) => void;
}) {
	const user = useContext(CurrentUserContext);
	const [file, setFile] = useState<Blob>();
	const [fileUrl, setFileUrl] = useState<string>();
	const fileInputRef = useRef<HTMLInputElement>(null);

	const fileHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) {
			setFile(undefined);
			return;
		}
		setFile(e.target.files[0]);
	};

	const uploadHandler = async () => {
		const formData = new FormData();
		if (file) {
			formData.append('file', file);
		}

		const req = await fetch(
			`${process.env.NEXT_PUBLIC_PHOTOM_API_URL}/bucket`,
			{
				method: 'POST',
				headers: [['Authorization', `Bearer ${user?.bearer}`]],
				body: formData,
			}
		);

		const res = await req.text();
		
		console.log(res);
	};

	useEffect(() => {
		if (fileUrl) {
			URL.revokeObjectURL(fileUrl);
			setFileUrl(undefined);
		}
		if (file) {
			const objectUrl = URL.createObjectURL(file);
			setFileUrl(objectUrl);
		}
	}, [file]);

	return (
		<>
			<div
				className="wh-full fixed top-0 left-0 bottom-0 right-0 z-50 bg-black opacity-70"
				onClick={() => {
					setAddPhotoDisplay(false);
				}}
			></div>
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-3/4 h-3/4 max-w-sm bg-white rounded-md border-4 border-black">
				<div
					className="absolute w-8 h-8 -right-3 -top-3 flex items-center bg-black rounded-full"
					onClick={() => {
						setAddPhotoDisplay(false);
					}}
				>
					<div className="absolute w-3/4 h-1 left-1/2 -translate-x-1/2 bg-white rounded-full rotate-45"></div>
					<div className="absolute w-3/4 h-1 left-1/2 -translate-x-1/2 bg-white rounded-full -rotate-45"></div>
				</div>
				<div className="h-full w-full flex flex-col justify-center items-center p-4">
					{fileUrl && (
						<img
							className="w-full h-5/6 object-contain"
							alt="selected-photo"
							src={fileUrl}
						></img>
					)}
					<div className="flex gap-4">
						<button
							className="add-photo-button"
							onClick={() => {
								if (fileInputRef.current) {
									fileInputRef.current.click();
								}
							}}
						>
							Selecionar imagem
						</button>
						{file && (
							<button
								className="add-photo-button bg-green-200"
								onClick={uploadHandler}
							>
								Subir Imagem
							</button>
						)}
					</div>
					<input
						type="file"
						className="hidden"
						ref={fileInputRef}
						accept="image/*"
						onChange={fileHandler}
					/>
				</div>
			</div>
		</>
	);
}
