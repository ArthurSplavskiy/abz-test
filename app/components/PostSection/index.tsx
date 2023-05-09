'use client';

import { Button, Text, UploadButton } from '@/app/components/shared';
import { TextField } from '@mui/material';
import { useQuery } from 'react-query';
import { IPositions, IServerResponse, IServerValidationError } from '@/app/types';
import { useFormik } from 'formik';
import { useUserRefetch } from '../GetSection/refetchState';
import { fetchPositions, postUser } from './api';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { validationSchema, getAllowedExt, setFieldError } from './validation';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { AxiosError } from 'axios';
import { scrollToBlock } from '@/app/utils/scrollToBlock';
import Image from 'next/image';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputMask from 'react-input-mask';
import styles from './index.module.scss';
import toast from 'react-hot-toast';

const theme = createTheme({
	palette: {
		primary: {
			main: '#00BDD3'
		}
	}
});

export const PostSection = () => {
	const [isSuccess, setIsSuccess] = useState(false);
	const [serverErrors, setServerErrors] = useState<IServerValidationError | null>(null);
	const { refetchUsers } = useUserRefetch((state) => state);
	const { data } = useQuery<{ positions: IPositions[] }>('positions', () => fetchPositions());

	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			phone: '',
			position: '1',
			photo: {
				name: ''
			} as Blob
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			const loadingToast = toast.loading('Waiting...');
			try {
				const formData = new FormData();
				formData.append('position_id', values.position);
				formData.append('name', values.name);
				formData.append('email', values.email);
				formData.append('phone', values.phone.replace(/\s+/g, ''));
				formData.append('photo', values.photo);
				await postUser(formData);
				setIsSuccess(true);
				refetchUsers();
				scrollToBlock('get-section');
			} catch (error: unknown) {
				const e = error as AxiosError<IServerResponse>;
				toast.error(e.message);
				if (e?.response?.data.fails) {
					setServerErrors(e.response.data.fails);
				}
			} finally {
				toast.dismiss(loadingToast);
			}
		}
	});

	return (
		<ThemeProvider theme={theme}>
			<section id='post-section' className={'stack'}>
				<Text tag='h2' textAlign='center' marginBottom={50}>
					{isSuccess ? 'User successfully registered' : 'Working with POST request'}
				</Text>
				{isSuccess ? (
					<Image
						className={styles.successImage}
						src={'/success-image.svg'}
						alt='success'
						width={328}
						height={290}
					/>
				) : (
					<form className={styles.form} onSubmit={formik.handleSubmit}>
						<TextField
							id='name'
							name='name'
							label='Your name'
							variant='outlined'
							value={formik.values.name}
							onChange={formik.handleChange}
							error={setFieldError<boolean>({
								touchedField: formik.touched.name,
								formikError: formik.errors.name,
								serverError: serverErrors?.name,
								isError: true
							})}
							helperText={setFieldError<string>({
								touchedField: formik.touched.name,
								formikError: formik.errors.name,
								serverError: serverErrors?.name,
								isError: false
							})}
							onBlur={() =>
								serverErrors && setServerErrors((prev: any) => ({ ...prev, name: null }))
							}
						/>
						<TextField
							id='email'
							name='email'
							label='Email'
							variant='outlined'
							value={formik.values.email}
							onChange={formik.handleChange}
							error={setFieldError<boolean>({
								touchedField: formik.touched.email,
								formikError: formik.errors.email,
								serverError: serverErrors?.email,
								isError: true
							})}
							helperText={setFieldError<string>({
								touchedField: formik.touched.email,
								formikError: formik.errors.email,
								serverError: serverErrors?.email,
								isError: false
							})}
							onBlur={() =>
								serverErrors && setServerErrors((prev: any) => ({ ...prev, email: null }))
							}
						/>
						<InputMask
							id='phone'
							name='phone'
							mask='+38 999 999 99 99'
							value={formik.values.phone}
							onChange={formik.handleChange}
							error={setFieldError<boolean>({
								touchedField: formik.touched.phone,
								formikError: formik.errors.phone,
								serverError: serverErrors?.phone,
								isError: true
							})}
							helperText={
								setFieldError<string>({
									touchedField: formik.touched.phone,
									formikError: formik.errors.phone,
									serverError: serverErrors?.phone,
									isError: false
								}) || '+38 (XXX) XXX - XX - XX'
							}
							onBlur={() =>
								serverErrors && setServerErrors((prev: any) => ({ ...prev, phone: null }))
							}>
							{/* @ts-ignore */}
							{(props) => (
								<TextField
									id={props.id}
									name={props.phone}
									label='Phone'
									variant='outlined'
									value={props.value}
									onChange={props.onChange}
									error={props.error}
									helperText={props.helperText}
									onBlur={props.onBlur}
								/>
							)}
						</InputMask>
						<FormControl style={{ justifySelf: 'baseline' }}>
							<FormLabel>Select your position</FormLabel>
							<RadioGroup aria-labelledby='select-your-position' defaultValue='1'>
								{data?.positions.map((p) => (
									<FormControlLabel
										key={p.id}
										value={p.id}
										label={p.name}
										control={<Radio id='position' name='position' onChange={formik.handleChange} />}
									/>
								))}
							</RadioGroup>
						</FormControl>
						<UploadButton
							value={formik.values.photo?.name}
							accept={getAllowedExt('image')}
							onChange={(e) => {
								formik.setFieldValue('photo', e.currentTarget.files[0]);
							}}
							error={setFieldError<boolean>({
								touchedField: formik.touched.photo,
								formikError: formik.errors.photo,
								serverError: serverErrors?.photo,
								isError: true
							})}
							helperText={
								setFieldError<string>({
									touchedField: formik.touched.photo,
									formikError: formik.errors.photo,
									serverError: serverErrors?.photo,
									isError: false
								}) as string
							}
							onBlur={() =>
								serverErrors && setServerErrors((prev: any) => ({ ...prev, photo: null }))
							}
						/>
						<Button
							type='submit'
							disabled={
								serverErrors ? Object.values(serverErrors).some((key: any) => key !== null) : false
							}>
							Sign up
						</Button>
					</form>
				)}
			</section>
			<Toaster
				toastOptions={{
					success: {
						style: {
							background: 'green'
						}
					},
					error: {
						style: {
							background: 'red',
							color: 'white'
						}
					}
				}}
			/>
		</ThemeProvider>
	);
};
