let randomQuoteUrl = "https://csumb.space/api/famousQuotes/getRandomQuote.php";

let authorFullName = "";
let currentQuoteId = null;
let authorBio = "";
let authorImageUrl = "";

let authorButton = document.querySelector("#displayAuthorButton");
let authorElement = document.querySelector("#authorName");
let authorBioElement = document.querySelector("#authorBio");
let authorPhotoElement = document.querySelector("#authorPhoto");
let authorInfoSection = document.querySelector("#authorInfo");

let translateButton = document.querySelector("#translateButton");
let translatedElement = document.querySelector("#translatedQuote");

async function fetchData(url) {
  let response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

async function main() {
  let randomQuoteData = await fetchData(randomQuoteUrl);
  let randomQuote = randomQuoteData.quoteText;
  let randomQuoteElement = document.querySelector("#randomQuote");

  console.log(randomQuoteData);

  let authorFirstName = randomQuoteData.firstName;
  let authorLastName = randomQuoteData.lastName;
  authorFullName = (authorFirstName + " " + authorLastName).trim();


  authorBio = randomQuoteData.bio 
  authorImageUrl = randomQuoteData.imageUrl

  currentQuoteId = randomQuoteData.quoteId;
  randomQuoteElement.textContent = randomQuote 
}

main();

authorButton.addEventListener("click", () => {
  authorElement.textContent = authorFullName 
  authorBioElement.textContent = authorBio 
  if (authorImageUrl) {
    authorPhotoElement.src = authorImageUrl;
    authorPhotoElement.alt = authorFullName 
  }
  authorInfoSection.style.display = "block";
});

translateButton.addEventListener("click", async () => {
  if (!currentQuoteId) {
    translatedElement.textContent = "No quote to translate yet!";
    return;
  }

  let lang = "SP";
  let url = `https://csumb.space/api/famousQuotes/translateQuote.php?lang=${lang}&quoteId=${currentQuoteId}`;
  let translationData = await fetchData(url);

  console.log(translationData);

  
  translatedElement.textContent = translationData.translation;
});

