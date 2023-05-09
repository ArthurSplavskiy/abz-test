import { FormikErrors, FormikTouched } from 'formik';

export interface IUser {
	id: number;
	name: string;
	email: string;
	phone: string;
	position: string;
	position_id: number;
	registration_timestamp: number;
	photo: string;
}

export interface IPositions {
	id: number;
	name: string;
}

export interface IServerValidationError {
	name: string[] | null;
	email: string[] | null;
	phone: string[] | null;
	position_id: string[] | null;
	photo: string[] | null;
}

export interface IServerResponse {
	success: boolean;
	message: string;
	fails: IServerValidationError | null;
}

export interface IFieldError {
	touchedField?: boolean | FormikTouched<Blob>;
	formikError?: string | FormikErrors<Blob>;
	serverError?: string[] | null;
	isError?: boolean;
}
