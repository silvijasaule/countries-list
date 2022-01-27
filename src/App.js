import React, {useState, useEffect } from 'react';
import './App.scss';
import { CountryCard } from './components/CountryCard/CountryCard';
import _ from "lodash"; 

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
      <button type="button" className='button' onClick={() => handleSort('asc')}>Sort By Asc</button>
      <button type="button" className='button' onClick={() => handleSort('desc')}>Sort By Desc</button>
      <span>Only show countries that are:</span>
      <button type="button" className='button' onClick={handleOceaniaFilter}>In Oceania</button>
      <button type="button" className='button' onClick={handleClear} >Clear</button>

      <ul>
          {countriesData && sorted.map((country) => (
            <div
              key={country.index}
              className=""
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
    </div>
  );
}

export default App;
