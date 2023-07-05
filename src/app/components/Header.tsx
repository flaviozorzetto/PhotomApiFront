import { Ysabeau } from 'next/font/google';

const LoveLight = Ysabeau({ weight: '400', subsets: ['latin'] });

export default function Header() {
	return (
		<header
			className={`flex items-center w-full h-20 bg-pink-300 px-4 fixed text-2xl border-b border-black  ${LoveLight.className}`}
		>
			<div className="w-12">
				<img alt="kuromi logo" className="h-full w-full" src="/kuromi.png" />
			</div>
			<div className="absolute left-2/4 -translate-x-1/2">
				<h1>Photo Album</h1>
			</div>
		</header>
	);
}
