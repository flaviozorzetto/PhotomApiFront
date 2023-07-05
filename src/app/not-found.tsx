import Link from 'next/link';

export default function NotFound() {
	return (
		<main className="h-screen bg-cyan-200 flex items-center justify-center">
			<h1>
				Page not found, click{' '}
				<Link className="text-blue-700 underline" href={'/home'}>
					here
				</Link>{' '}
				to return to home page
			</h1>
		</main>
	);
}
