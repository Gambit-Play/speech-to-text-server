const axios = require('axios');

// eslint-disable-next-line no-undef
const speechKey = process.env.SPEECH_KEY;
// eslint-disable-next-line no-undef
const speechRegion = process.env.SPEECH_REGION;

exports.getToken = async (req, res) => {
	try {
		const headers = {
			headers: {
				'Ocp-Apim-Subscription-Key': speechKey,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		};
		const tokenResponse = await axios.post(
			`https://${speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
			null,
			headers
		);

		res.status(200).send({
			token: tokenResponse.data,
			region: speechRegion,
		});
	} catch (error) {
		console.log(error);
		res.send(error);
	}
};
