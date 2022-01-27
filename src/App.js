import React, {useState, useEffect } from 'react';
import _ from "lodash"; 
import { CountryCard } from './components/CountryCard/CountryCard';
import { Button } from './components/Button/Button';

import './App.scss';

function App() {

  const [countriesData, setCountriesData] = useState();
  const [sortType, setSortType] = useState('asc');

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

  const allCountries = _.cloneDeep(countriesData);

  
  const sorted = countriesData?.sort( (a,b) => {
    const isReversed = (sortType === 'asc') ? 1 : -1;
    return isReversed * a.name.localeCompare(b.name);
  })

  const handleSort = (sortBy) => {
    if(sortBy ==='asc'){
      setSortType('asc')
    } 
    else if(sortBy === 'desc') {
      setSortType('desc')
    }
    else {
      return;
    }
  }

  const oceaniaRegion = countriesData?.filter(country => country.region === "Oceania");

  const handleOceaniaFilter = () => {
    setCountriesData(oceaniaRegion);
  }

  // unfortunately, doesn't work
  const handleClear = () => {
    console.log('clear clicked');
    setCountriesData(allCountries)
  }

  return (
    <div className="App">
      <h4>Only show countries that are:</h4>
      <div className="button-container">
        <div className="button-container--left">
          <Button onClick={handleOceaniaFilter} label={"In Oceania"}/>
          <Button onClick={handleClear} label={"Clear"} disabled/>
        </div>
        <div className="button-container--right">
          <Button onClick={() => handleSort('asc')} label={"Sort By Asc"}/>
          <Button onClick={() => handleSort('desc')} label={"Sort By Desc"}/>
        </div>
      </div>

      <ul>
          {countriesData && sorted.map((country) => (
            <div
              key={country.index}
            >
              <li>
                <CountryCard 
                countryName={country.name}
                countryRegion={country.region}
                countryArea={country.area} />
              </li>
            </div>))
          }
      </ul>
      <footer>Made by Silvija Aleknaitė, 2022</footer>
    </div>
  );
}

export default App;
