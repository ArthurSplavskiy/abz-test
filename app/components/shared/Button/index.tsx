'use client';

import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';

interface Props
	extends Omit<
		DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
		'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'
	> {
	type?: 'button' | 'submit';
	children: ReactNode;
}

export const Button: FC<Props> = ({ type = 'button', children, className, ...props }) => {
	return (
		<button type={type} className={classNames(className, styles.btn)} {...props}>
			{children}
		</button>
	);
};
