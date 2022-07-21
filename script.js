const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const year = document.getElementById('year');

let apiQuotes = [];
// Show Loading
function loading(){
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//Hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

//Show new Quote
function newQuote() {
  loading();
  // Pick a random quote from apiQuotes array
  const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
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
 complete();
}
function currentYear() {
  year.textContent =  `Copyright ©  Sahar   ${new Date().getFullYear()}`;
}

// Get quotes from API

// async function getQuotes() {
//   const apiURL = " https://random-math-quote-api.herokuapp.com/ 213 ";
//   try {
//   const response = await fetch(apiUrl);
//   apiQuotes = await response.json();
//   newQuote();
//   } catch (error){
//     // Catch Error Here
  
//   }
// }

// Tweet Quote

function tweetQuote() {
  const twitterUrl =`https://twitter.com/compose/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//console.log("TESTING");
//on Load
newQuote();
