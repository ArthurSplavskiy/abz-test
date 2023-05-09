import { FC, ReactNode } from 'react';

interface Props {
	children: ReactNode;
	className?: string;
}

export const Wrapper: FC<Props> = ({ children, className = '' }) => {
	return (
		<div
			className={className}
			style={{
				width: '100%',
				maxWidth: '1170px',
				marginInline: 'auto',
				paddingInline: '16px'
			}}>
			{children}
		</div>
	);
};
