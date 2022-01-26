import React, {useState, useEffect } from 'react';
import './App.scss';
import { CountryCard } from './components/CountryCard/CountryCard';

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

  // eslint-disable-next-line no-unused-vars
  const oceaniaRegion = countriesData?.filter(country => country.region === "Oceania");

  return (
    <div className="App">
      <button type="button" className='button' onClick={() => handleSort('asc')}>Sort By Asc</button>
      <button type="button" className='button' onClick={() => handleSort('desc')}>Sort By Desc</button>
      <span>Only show countries that are:</span>
      <button type="button" className='button' id="oceaniaRegionButton">In Oceania</button>
      <button type="button" className='button'>Smaller than LT</button>
      <button type="button" className='button' >Clear</button>

      {/* <input type="radio" name="oceaniaRegionButton" id="oceaniaRegionButton" />
      <label htmlFor="oceaniaRegionButton">in Oceania region</label>
      <input type="radio" name="smallerThanLithuania" id="smallerThanLithuania" />
      <label htmlFor="smallerThanLithuania">smaller than Lithuania</label> */}

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
          };
      </ul>
    </div>
  );
}

export default App;
