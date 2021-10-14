const { BlobServiceClient } = require('@azure/storage-blob');
const { nanoid } = require('nanoid');

const AZURE_STORAGE_CONNECTION_STRING =
	// eslint-disable-next-line no-undef
	process.env.AZURE_STORAGE_CONNECTION_STRING;

exports.uploadFile = async (req, res) => {
	try {
		const { file } = req;

		console.log('@@@@@ file: ', file);

		const nameArray = file.originalname.split('.');
		const fileType = nameArray[nameArray.length - 1];
		const blobName = `${nanoid()}.${fileType}`;

		const blobServiceClient = BlobServiceClient.fromConnectionString(
			AZURE_STORAGE_CONNECTION_STRING
		);
		const containerClient =
			blobServiceClient.getContainerClient('container1');
		const blockBlobClient = containerClient.getBlockBlobClient(blobName);
		const uploadBlobResponse = await blockBlobClient.upload(
			file.buffer,
			file.size
		);

		console.log('@@@@@ uploadBlobResponse: ', uploadBlobResponse);

		res.status(200).send({ blobName });
	} catch (error) {
		console.log(error);
		res.send(error);
	}
};
