import UserContext from './components/UserContext';
import './styles/globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

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
			<body className={inter.className}>
				<UserContext>{children}</UserContext>
			</body>
		</html>
	);
}
