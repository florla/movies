// Import necessary modules: Express for creating the web server, hbs for handlebars templating, and path for working with file paths
const express = require('express');
const hbs = require('hbs');
const path = require('path');

// Import the movieID function from the 'film' module in the 'utils' directory
const movieID = require('./utils/film');

// Create an instance of the Express application
const app = express();

// Define paths for Express configuration
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');

// Set up handlebars as the view engine and specify the views directory
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// Serve static files from the public directory
app.use(express.static(publicDirectoryPath));

// Define a route for the home page that renders the 'index' view
app.get('', (req, res) => {
    res.render('index');
});

// Define a route for the '/similar' endpoint that expects a 'movie' query parameter
app.get('/similar', (req, res) => {
    // Extract the 'movie' query parameter from the request
    const { movie } = req.query;

    // Check if the 'movie' parameter is missing and return an error if so
    if (!movie) {
        return res.send({ error: 'Please enter a movie name' });
    }

    // Call the movieID function with the movie name, passing a callback function to handle the result
    movieID(movie, (error, data) => {
        // Handle any errors returned by the movieID function
        if (error) {
            return res.send({ error });
        }

        // Send the data obtained from the movieID function as the response
        res.send(data);
    });
});

// Start the server on port 5000 and log a message when it is up and running
app.listen(5000, () => {
    console.log('Server is up on port 5000.');
});