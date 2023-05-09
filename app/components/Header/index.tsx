'use client';

import { Button, Wrapper } from '@/app/components/shared';
import { scrollToBlock } from '@/app/utils/scrollToBlock';
import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.scss';

export const Header = () => {
	return (
		<header className={styles.header}>
			<Wrapper>
				<div className={styles.justify}>
					<Link className={styles.logo} href='/'>
						<Image src='/logo.svg' alt='Vercel Logo' width={104} height={26} priority />
					</Link>
					<div className={styles.actions}>
						<Button onClick={() => scrollToBlock('get-section')}>Users</Button>
						<Button onClick={() => scrollToBlock('post-section')}>Sign up</Button>
					</div>
				</div>
			</Wrapper>
		</header>
	);
};
