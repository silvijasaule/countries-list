import React, {useState, useEffect } from 'react';
import { CountryCard } from './components/CountryCard/CountryCard';
import { Button } from './components/Button/Button';

import './App.scss';

function App() {

  const [countriesData, setCountriesData] = useState();
  const [allCountriesData, setAllCountriesData] = useState();
  const [sortType, setSortType] = useState('asc');

  useEffect(() => {
  fetch(
    "https://restcountries.com/v2/all?fields=name,region,area"
  )
    .then((res) => res.json())
    .then(
      (result) => {
        setCountriesData(result);
        setAllCountriesData(result)
      }
    );
  }, []);
  
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

  console.log(countriesData);

  const oceaniaRegion = countriesData?.filter(country => country.region === "Oceania");
  const smallerThanLithuania = countriesData?.filter(country => country.area < 65300);


  const handleOceaniaFilter = () => {
    setCountriesData(oceaniaRegion);
  }

  const handleLithuaniaFilter = () => {
    setCountriesData(smallerThanLithuania);
  }

  const handleClear = () => {
    setCountriesData(allCountriesData)
  }

  return (
    <div className="App">
      <h4>Only show countries that are:</h4>
      <div className="button-container">
        <div className="button-container--left">
          <Button onClick={handleOceaniaFilter} label={"In Oceania"}/>
          <Button onClick={handleLithuaniaFilter} label={"Smaller than Lithuania"}/>
          <Button onClick={handleClear} label={"Clear"} />
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
