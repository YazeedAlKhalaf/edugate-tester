import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	// man they are weird :D
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

	const { username, password } = await request.json();

	const encodedCreds = btoa(`${username}:${password}`);

	const options = {
		method: 'GET',
		headers: { Authorization: `Basic ${encodedCreds}` }
	};

	try {
		const resp = await fetch(
			'https://edugate.yu.edu.sa/yu/resources/common/commonServies/actorDetails/-1/1/2',
			options
		);

		return json({
			message: await resp.json()
		});
	} catch (e) {
		return json({
			message: `we screwed up: ${e}`
		});
	}
}
