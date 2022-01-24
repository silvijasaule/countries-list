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

  console.log(countriesData);

  return (
    <div className="App">
      {countriesData && countriesData.map((country) => (
        <div
          key={country.id}
          className=""
        >
        <CountryCard 
        countryName={country.name}
        countryRegion={country.region}
        countryArea={country.area} />
        </div>))
      };
      </div>
  );
}

export default App;
