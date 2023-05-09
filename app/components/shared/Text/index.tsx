'use client';

import { FC } from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

interface Props {
	tag?: 'p' | 'h1' | 'h2';
	textAlign?: 'inherit' | 'center';
	color?: 'white' | 'black';
	marginBottom?: number;
	className?: string;
	children: string;
}

export const Text: FC<Props> = ({
	tag = 'p',
	textAlign = 'inherit',
	color = 'black',
	marginBottom = 0,
	className,
	children
}) => {
	const textStyle = {
		textAlign,
		marginBottom
	};

	const colorStyle = {
		[styles.white]: color === 'white',
		[styles.black]: color === 'black'
	};

	if (tag === 'h1')
		return (
			<h1 className={classNames(className, styles.h1, colorStyle)} style={textStyle}>
				{children}
			</h1>
		);
	if (tag === 'h2')
		return (
			<h2 className={classNames(className, styles.h2, colorStyle)} style={textStyle}>
				{children}
			</h2>
		);

	return (
		<p className={classNames(className, styles.p, colorStyle)} style={textStyle}>
			{children}
		</p>
	);
};
