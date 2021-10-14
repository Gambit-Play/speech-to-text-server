require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');

const { getToken } = require('./api/getToken');
const { uploadFile } = require('./api/uploadFile');

const upload = multer();
const PORT = 5001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// API's
app.get('/getToken', getToken);
app.post('/uploadFile', upload.single('file'), uploadFile);

app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});
