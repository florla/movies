// Add an event listener to the form with the ID 'movieForm' to handle the form submission
document.getElementById('movieForm').addEventListener('submit', async function (event) {
    // Prevent the default form submission 
    event.preventDefault();

    // Get the value of the movie input and trim any leading or trailing whitespace
    const movieInput = document.getElementById('movieInput').value.trim();

    // Check if the movie input is empty and display an alert if so
    if (!movieInput) {
        alert('Please enter a movie name.');
        return;
    }

    try {
        // Make an asynchronous request to the '/similar' endpoint with the movie input as a query parameter
        const response = await fetch(`/similar?movie=${encodeURIComponent(movieInput)}`);
        // Parse the response data as JSON
        const data = await response.json();

        // Call the displayResults function with the retrieved data
        displayResults(data);
    } catch (error) {
        // Log any errors to the console and display an error alert
        console.error('Error', error);
        alert('Error. Please try again.');
    }
});

// Define a function to display the results on the webpage
function displayResults(data) {
    // Get the container element with the ID 'resultContainer'
    const resultContainer = document.getElementById('resultContainer');
    // Clear any existing content 
    resultContainer.innerHTML = '';

    // Check if an error is present in the data and display an error message if found
    if (data.error) {
        resultContainer.innerHTML = `<p class="error">${data.error}</p>`;
        return;
    }
    // Join the similar movie titles into a comma-separated string
    const similarMovies = data.similar.join(', ');
    // Create an array of img elements with src attributes set to the movie poster image URLs
    const posterImages = data.images.map(image => `<img src="${image}" alt="Movie Poster">`).join(' ');

    // Create HTML content to display the similar movies and poster images
    const resultHTML = `
        <h2>Similar Movies:</h2>
        <p>${similarMovies}</p>
        <div id="posterContainer">${posterImages}</div>
    `;

    // Set the inner HTML of the result container to the generated HTML content
    resultContainer.innerHTML = resultHTML;
}