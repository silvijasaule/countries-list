import React from "react";
import './country-card.scss'; 

export const CountryCard = ({countryName, countryRegion, countryArea}) => {
    
    return(
        <div className="country-card">
            <span className="country-card__name">NAME: {countryName}</span>
            <span className="country-card__region">REGION: {countryRegion}</span>
            <span className="country-card__area">SIZE: {countryArea}</span>
        </div>
    )
  
}