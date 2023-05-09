import axios from 'axios';

async function getToken() {
	const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/token`);
	return data.token;
}

async function fetchPositions() {
	const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/positions`);
	return data;
}

async function postUser(formData: FormData) {
	const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/users`, formData, {
		headers: {
			Token: await getToken(),
			'Content-Type': 'multipart/form-data'
		}
	});

	return data;
}

export { getToken, fetchPositions, postUser };
