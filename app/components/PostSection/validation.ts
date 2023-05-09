import { IFieldError } from '@/app/types';
import * as yup from 'yup';

const MAX_FILE_SIZE = 102400 * 10; //1MB
const validFileExtensions = { image: ['jpg', 'jpeg'] };

function isValidFileType(fileName: string) {
	// @ts-ignore
	return fileName && validFileExtensions.image.indexOf(fileName.split('.').pop()) > -1;
}

function getAllowedExt(type: string) {
	// @ts-ignore
	return validFileExtensions[type].map((e) => `.${e}`).toString();
}

const validationSchema = yup.object({
	name: yup.string().required('Name is required'),
	email: yup.string().email('Enter a valid email').required('Email is required'),
	phone: yup
		.string()
		.min(10, 'Phone should be of minimum 10 characters length')
		.required('Phone is required'),
	position: yup.string(),
	photo: yup
		.mixed()
		.required('Photo is required')
		// Not a valid image type
		.test('is-valid-type', 'Photo is required', (value) =>
			// @ts-ignore
			isValidFileType(value && value.name?.toLowerCase())
		)
		.test(
			'is-valid-size',
			'Max allowed size is 100KB',
			// @ts-ignore
			(value) => value && value.size <= MAX_FILE_SIZE
		)
});

export const setFieldError = <T>({
	touchedField,
	formikError,
	serverError,
	isError
}: IFieldError): T | undefined => {
	if (serverError) {
		if (isError) return true as T;
		return serverError.join(' ') as T;
	}
	if (touchedField && formikError) {
		if (isError) return Boolean(formikError) as T;
		return formikError as T;
	}
};

export { getAllowedExt, validationSchema };
