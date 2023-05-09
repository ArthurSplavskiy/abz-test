'use client';

import { Button, Text } from '@/app/components/shared';
import { scrollToBlock } from '@/app/utils/scrollToBlock';
import styles from './index.module.scss';
import classNames from 'classnames';

export const Hero = () => {
	return (
		<div className={styles.hero} style={{ backgroundImage: 'url("/hero.jpeg")' }}>
			<div className={classNames(styles.content, 'stack')}>
				<Text tag='h1' textAlign='center' color='white' marginBottom={21}>
					Test assignment for front-end developer
				</Text>
				<Text textAlign='center' color='white' marginBottom={32}>
					What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS
					with a vast understanding of User design thinking as they&#39;ll be building web
					interfaces with accessibility in mind. They should also be excited to learn, as the world
					of Front-End Development keeps evolving.
				</Text>
				<Button onClick={() => scrollToBlock('post-section')}>Sign up</Button>
			</div>
		</div>
	);
};
