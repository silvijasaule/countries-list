import React, {useState, useEffect } from 'react';
import './App.scss';
import { CountryCard } from './components/CountryCard/CountryCard';

function App() {

  const [countriesData, setCountriesData] = useState();

  useEffect(() => {
  fetch(
    "https://restcountries.com/v2/all?fields=name,region,area"
  )
    .then((res) => res.json())
    .then(
      (result) => {
        setCountriesData(result);
      }
    );
  }, []);

  // Ascending (A to Z)
  const sortAsc = []
  .concat(countriesData)
  .sort((a, b) => (a.name > b.name ? 1 : -1));

  console.log(sortAsc);

  // Descending (Z to A)
  const sortDesc = []
  .concat(countriesData)
  .sort((a, b) => (a.name > b.name ? -1 : 1));

  // eslint-disable-next-line no-unused-vars
  const oceaniaRegion = countriesData.filter(country => country.region === "Oceania").map(filteredCountries => 
    <li>

    <CountryCard 
    countryName={filteredCountries.name}
    countryRegion={filteredCountries.region}
    countryArea={filteredCountries.area} />
      </li> )

  console.log(sortDesc);

  return (
    <div className="App">
      <ul>
          {countriesData && countriesData.map((country) => (
            <div
              key={country.id}
              className=""
            >
              <li>
                <CountryCard 
                countryName={country.name}
                countryRegion={country.region}
                countryArea={country.area} />
              </li>
            </div>))
          };
      </ul>
    </div>
  );
}

export default App;
