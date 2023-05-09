import { FC } from 'react';
import { Text } from '@/app/components/shared';
import Image from 'next/image';
import styles from './index.module.scss';
import classNames from 'classnames';

interface Props {
	image?: string;
	name: string;
	position: string;
	email: string;
	phone: string;
}

export const Card: FC<Props> = ({ image = '/photo-cover.svg', name, email, phone, position }) => {
	return (
		<article className={classNames(styles.article, 'stack')}>
			<Image className={styles.avatar} src={image} alt={name} width={70} height={70} />
			<Text className={styles.articleText} tag='p' textAlign='center'>
				{name}
			</Text>
			<div className={'stack'}>
				<Text className={styles.articleText} tag='p' textAlign='center'>
					{position}
				</Text>
				<a className={styles.articleText} href={`mailto:${email}`}>
					{email}
				</a>
				<a className={styles.articleText} href={`tel:${phone}`}>
					{phone}
				</a>
			</div>
		</article>
	);
};
