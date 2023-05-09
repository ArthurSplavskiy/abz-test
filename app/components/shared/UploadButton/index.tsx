'use client';

import { Button, TextField } from '@mui/material';
import { FC } from 'react';
import styles from './index.module.scss';

interface Props {
	value: string;
	helperText: string;
	accept: string;
	error: boolean | undefined;
	onBlur: (...args: any[]) => void;
	onChange: (...args: any[]) => void;
}

export const UploadButton: FC<Props> = ({ value, onChange, helperText, accept, error, onBlur }) => {
	return (
		<div className={styles.btn}>
			<Button variant='outlined' component='label' color={error ? 'error' : 'primary'}>
				Upload{' '}
				<input
					id='photo'
					name='photo'
					hidden
					accept={accept}
					type='file'
					onChange={onChange}
					onBlur={onBlur}
				/>
			</Button>
			<TextField
				placeholder='Upload your photo'
				variant='outlined'
				value={value}
				helperText={helperText}
				error={error}
			/>
		</div>
	);
};
