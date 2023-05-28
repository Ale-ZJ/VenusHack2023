// womenScript.js file retrieves the women's name, what they are known for
// and a summary of their contribution and background

// Load the JSON data
fetch('techwomen.json')
  .then(response => response.json())
  .then(data => {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    function search() {
      const query = searchInput.value.toLowerCase();
      const results = data.filter(item => item.id === query);

      // Clear previous results
      searchResults.innerHTML = '';

      // Display search results
      if (results.length === 0) {
        searchResults.innerHTML = 'No results found.';
      } else {
        results.forEach(item => {
          const resultElement = document.createElement('div');

          const womenName = document.createElement('h3');
          womenName.textContent = item.name;
          resultElement.appendChild(womenName);

          const womenKnownFor = document.createElement('p');
          womenKnownFor.textContent = item.known_for;
          resultElement.appendChild(womenKnownFor);

          const womenSummary = document.createElement('p');
          womenSummary.textContent = item.Bio.Summary;
          resultElement.appendChild(womenSummary);


          searchResults.appendChild(resultElement);
        });
      }
    }

    // Bind search function to button click
    const searchButton = document.querySelector('button');
    searchButton.addEventListener('click', search);
  });