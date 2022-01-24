import React from "react";
import './country-card.scss'; 

export const CountryCard = ({countryName, countryRegion, countryArea}) => {

    return(
        <div className="country-card">
            <div className="country-card__name">NAME: {countryName}</div>
            <div className="country-card__region">REGION: {countryRegion}</div>
            <div className="country-card__area">SIZE: {countryArea}</div>
        </div>
    )
  
}