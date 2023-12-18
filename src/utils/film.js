// Import the 'node-fetch' library to make HTTP requests
const fetch = require('node-fetch');

// Define an asynchronous function 'getMovieInfo' with parameters 'movieName' and 'callback'
const getMovieInfo = async (movieName, callback) => {
  // Construct the URL for the first API request to search for a movie
  const url =
    'https://api.themoviedb.org/3/search/movie?query=' +
    movieName +
    '&include_adult=false&api_key=d66d4602dd24d33db6655c2ace0fda18&language=en-US&page=1';

  // Define options for the first API request
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjZkNDYwMmRkMjRkMzNkYjY2NTVjMmFjZTBmZGExOCIsInN1YiI6IjY1N2Y3NmViMzIzZWJhNjIzMTg3YTkyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QDtbzAhjs286zSE2zBc-2bih4vp5UymxmTpi2FwHzdk',
    },
  };

  try {
    // Make the first API request to get information about the original movie
    const response = await fetch(url, options);
    const json = await response.json();
    const originalMovie = json.results[0];

    // Initialize arrays to store similar movie titles and their poster images
    const similar = [];
    const images = [];

    // Add information about the original movie to the arrays
    similar.push(originalMovie.title);
    images.push('https://image.tmdb.org/t/p/original/' + originalMovie.poster_path);

    // Get the ID of the original movie for the second API request
    const movieID = originalMovie.id;

    // Construct the URL for the second API request to get similar movies
    const url2 = `https://api.themoviedb.org/3/movie/${movieID}/similar?language=en-US&page=1`;

    // Define options for the second API request
    const options2 = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZGUxN2VlZDlkNzBiOWE0Njk1MzU4NThjZTE4NjA5NCIsInN1YiI6IjY1NzliNGQ2ZWM4YTQzMDExYTNhZjc0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w9onnPn6ncV4Vfg9jaQkWS5R6s8_zwculWSCS2i8z_k',
        },
      };
  
      // Make the second API request to get information about similar movies
      const response1 = await fetch(url2, options2);
      const json1 = await response1.json();
  
      // Iterate through the results of the second API request and add information to the arrays
      json1.results.forEach((element) => {
        similar.push(element.title);
        images.push('https://image.tmdb.org/t/p/original/' + element.poster_path);
      });
  
      // Create a result object with the collected information
      const result = {
        similar: similar,
        images: images,
      };
  
      // Invoke the callback function with the result and no error
      return callback(undefined, result);
    } catch (error) {
      // Handle errors by logging them to the console
      console.error('Error:', error);
    }
  };
  
  // Export the 'getMovieInfo' function to make it available to other modules
  module.exports = getMovieInfo;