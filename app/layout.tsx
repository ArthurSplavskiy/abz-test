import { Header } from '@/app/components';
import { Nunito } from 'next/font/google';
import QueryProvider from './utils/QueryProvider';
import './globals.css';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata = {
	title: 'Next App',
	description: 'Test Task'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={nunito.className}>
				<Header />
				<QueryProvider>{children}</QueryProvider>
			</body>
		</html>
	);
}
