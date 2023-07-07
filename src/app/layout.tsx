import UserContext from './components/UserContext';
import './styles/globals.css';
import { Ysabeau } from 'next/font/google';

const ysabeau = Ysabeau({ subsets: ['latin'] });

export const metadata = {
	title: 'PhotomAlbum',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt-br">
			<body className={ysabeau.className}>
				<UserContext>{children}</UserContext>
			</body>
		</html>
	);
}
