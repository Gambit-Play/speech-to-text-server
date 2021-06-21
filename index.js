require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { getToken } = require('./api/getToken');

const PORT = 5001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// API's
app.get('/getToken', getToken);

app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});
