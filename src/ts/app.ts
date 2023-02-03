
// First a demo of fetch from an API with country data
// this demo is to better understand the JSON we get from the API and how we
// extract info from the returned data

const allCountriesUrl = "https://restcountries.com/v3.1/all";

async function loadAllCountries() {
    const response = await fetch(allCountriesUrl);
    const data = await response.json();

    // nu har vi en variabel data med hela svaret ifrån urlen
    // console.log(data);

    // vad innehåller data?
    // först tecknet längst upp till vänster är [ dvs vi har fått en array
    // nästa tecken är { dvs ett objekt
    // dvs data är en array av objekt

    // data[20] är att plocka ut ett objekt på plats 20 i arrayen datan
    const country20 = data[20];
    console.log(country20.name);  // detta är ett objekt
    console.log("Common name: " + country20.name.common);
    console.log("Official name: " + country20.name.official);
    console.log("Capital: " + country20.capital[0]);
    // nu har vi en output som går att skicka till DOMen! dags för html osv
}

loadAllCountries();

// ======================================================================================

const allDisneyCharactersUrl = "https://api.disneyapi.dev/characters";

const pElement = document.querySelector("p") as HTMLParagraphElement;
const ulElement = document.querySelector("ul") as HTMLElement;
const buttonElement = document.querySelector("button") as HTMLButtonElement;

buttonElement.addEventListener("click", async (event) => {
    event.preventDefault();

    const response = await fetch(allDisneyCharactersUrl);
    const data = await response.json();

    const oneCharacter = data.data[23];
    console.log("Name: " + oneCharacter.name);
    console.log("From movie: " + oneCharacter.films[0]);

    pElement.innerHTML = `Name: ${oneCharacter.name} from movie ${oneCharacter.films[0]}`;

    // data.data är en array som vi kan loopa och visa upp
    data.data.forEach((element: any) => {
        ulElement.innerHTML += `<li>Name: ${element.name} from movie ${element.films[0]}</li>`;
    });
});

// ======================================================================================

// Show countries matching search for currenct
const currencySearchUrl = "https://restcountries.com/v3.1/currency/";

const btnCurrency = document.getElementById("btn-currency") as HTMLButtonElement;
const listCurrency = document.getElementById("list-currency") as HTMLElement;
const inputCurrency = document.getElementById("currency") as HTMLInputElement;

btnCurrency.addEventListener("click", async (event) => {
    event.preventDefault();

    if (inputCurrency.value.length > 0) {
        // sökordet står i inputCurrency.value
        // vår sammansatta url är då currencySearchUrl + inputCurrency.value

        const response = await fetch(currencySearchUrl + inputCurrency.value);
        const data = await response.json();

        //console.log(data);

        // här kan vi behöva lite mer robust kod som kollar ifall vi fick ett svar eller inte

        listCurrency.innerHTML = "";

        data.forEach((country: any) => {
            listCurrency.innerHTML += `<li>Name: ${country.name.common}</li>`;
        });

        inputCurrency.value = "";
    }

});
