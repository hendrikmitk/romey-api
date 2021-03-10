const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.use(express.json());

/////////////////
// I M P O R T //
/////////////////

const spotData = require('./utils/spotData');

/////////////////
// R O U T E S //
/////////////////

// GET ALL SPOTS
app.get('/spots', (req, res) => {
	res.json({
		code: 200,
		status: 'OK',
		description: 'Selected all spot data from database',
		data: spotData
	});
});

// GET ONE SPOT BY ID
app.get('/spots/:id', (req, res) => {
	const paramId = req.params.id;
	const spotIds = []; // Array to store all spotIds in

	// Iterate trough spotData
	spotData.forEach(spot => {
		spotIds.push(spot.id.toString()); // Convert ids to strings and store in array

		// Return spot object when id found
		if (spot.id == paramId) {
			res.json({
				code: 200,
				status: 'OK',
				description: 'Selected one spot from database',
				data: spot
			});
		}
	});

	// Check if requested spotId exist in spotIds
	if (!spotIds.includes(paramId)) {
		res.json({
			code: 404,
			status: 'Not Found', // spotId does not exist
			description: 'Spot does not exist in database',
			data: {}
		});
	}
});

/////////////////
// L I S T E N //
/////////////////
app.listen(port, () => {
	console.log(`Server running and listening on port ${port}`);
});
