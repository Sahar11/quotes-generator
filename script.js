const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const year = document.getElementById('year');

let apiQuotes = [];

function showLoadingSpinner(){
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

//Show new Quote
function newQuote() {
  showLoadingSpinner();
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //Check if Author feild is blank and replace it with 'unknown'

  if(!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;    
  }
  // Check Quote length to determine styling
  if (quote.text.length > 50) {
  quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
 }
 //Set Quote, Hide Loader
 quoteText.textContent = quote.text;
 currentYear();
 removeLoadingSpinner();
}

// Right copy right in footer
function currentYear() {
  year.textContent =  `Copyright ©  Sahar   ${new Date().getFullYear()}`;
}

// Get quotes from API
async function getQuotes() {
  showLoadingSpinner();
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = 'https://type.fit/api/quotes';
  try {
  const response = await fetch(apiUrl);
  apiQuotes = await response.json();
  newQuote();
  } catch (error){
    // Catch Error Here
   console.log("whoops, no quote", error);
   getQuotes();
  }
  currentYear();
}

// Tweet Quote
function tweetQuote() {
  
  const twitterUrl =`https://twitter.com/compose/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//on Load
getQuotes();
