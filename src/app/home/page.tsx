'use client';

import Header from '../components/Header';
import ImageDisplayer from '../components/ImageDisplayer';
import { useContext } from 'react';
import { CurrentUserContext } from '../components/UserContext';

export default function Home() {
	const user = useContext(CurrentUserContext);
	return (
		<>
			<Header />
			<main className="h-full pt-20 bg-home">
				<section className="h-full flex items-center justify-center">
					<div className="relative z-50 h-3/4 w-3/4">
						<div className="absolute -z-10 -left-10 -top-10">
							<img src="kuromi-top-left-corner.png" className="w-16"></img>
						</div>
						<ImageDisplayer />
						<div className="absolute -z-10 -right-10 -bottom-2 rotate-90">
							<img src="kuromi-bottom-right-corner.png" className="w-12"></img>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
