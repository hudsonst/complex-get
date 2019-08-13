'use strict';

// put your own value below!
const apiKey = 'jX3cFfgHZtXCmROCLxJ4fNVlCcvCJcFY3h4YakQ2'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks/';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <p class="line1">${responseJson.data[i].addresses[1].line1}<br>
      ${responseJson.data[i].addresses[1].city}, ${responseJson.data[i].addresses[1].stateCode} ${responseJson.data[i].addresses[1].postalCode}</p>
      <a href="${responseJson.data[i].url}"'>${responseJson.data[i].url}</a></li>`);
};

  //display the results section  
  $('#results').removeClass('hidden');
};

function getParks(query, maxResults=10) {
  const query_ns = query.replace(/ |, /g,',')
  const params = {
    api_key: apiKey,
    stateCode: query_ns,
    limit: maxResults,
    fields: 'addresses',
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
   // .catch(err => {
  //    $('#js-error-message').text(`Something went wrong: ${err.message}`)});
    ;
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-states').val();
    const maxResults = $('#js-max-results').val();
    getParks(searchTerm, maxResults);
  });
}

$(watchForm);