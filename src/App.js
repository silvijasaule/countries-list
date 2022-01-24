import React, {useState, useEffect } from 'react';
import './App.scss';

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
    </div>
  );
}

export default App;
