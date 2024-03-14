'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const getCountrydata = function(country){
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
    request.send();

    request.addEventListener('load',function(){
        const [data] = JSON.parse(this.responseText);

        // Generate HTML for languages
        let languageHTML = '';
        if (data.languages) {
            for (const langCode in data.languages) {
                languageHTML += `${data.languages[langCode]}`;
            }
        }

        // Generate HTML for currencies
        let currenciesHTML = '';
        if (data.currencies) {
            for (const currencyCode in data.currencies) {
                const currency = data.currencies[currencyCode];
                currenciesHTML += `${currency.name} (${currencyCode})`;
            }
        }

        const html = `<article class="country">
            <img class="country__img" src="${data.flags.png}" />
            <div class="country__data">
                <h3 class="country__name">${data.name.common}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${data.population}</p>
                <p class="country__row"><span>🗣️</span>${languageHTML}</p>
                <p class="country__row"><span>💰</span>${currenciesHTML}</p>
            </div>
        </article>`;
        countriesContainer.insertAdjacentHTML('beforeend', html);
        countriesContainer.style.opacity = 1;
    });
};

getCountrydata('germany');
getCountrydata('portugal');
getCountrydata('usa');
