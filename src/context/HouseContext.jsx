import { createContext, useState, useEffect } from 'react';
import { housesData } from '../data/Data';

export const HouseContext = createContext(null);

const HouseProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState('Select Country');
  const [countries, setCountries] = useState([]);
  const [price, setPrice] = useState('Select Price');
  const [property, setProperty] = useState('Select type');
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const allCountries = houses.map((house) => house.country);
    const uniqueCountries = [...new Set(allCountries)];
    setCountries(uniqueCountries);
  }, [houses]);

  useEffect(() => {
    const allPropertyTypes = houses.map((house) => house.type);
    const uniquePropertyTypes = [...new Set(allPropertyTypes)];
    setProperties(uniquePropertyTypes);
  }, [houses]);

  const isDefault = (str) => {
    return str === 'Select';
  };

  const searchHandler = () => {
    const minPrice = parseInt(price.split(' ')[0]);
    const maxPrice = parseInt(price.split(' - ')[1]);

    const filteredHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price);

      if (isDefault(country) && isDefault(price) && isDefault(property)) {
        return house;
      }

      if (!isDefault(country) && isDefault(price) && isDefault(property)) {
        return house.country === country;
      }

      if (isDefault(country) && !isDefault(price) && isDefault(property)) {
        return housePrice >= minPrice && housePrice <= maxPrice;
      }

      if (isDefault(country) && isDefault(price) && !isDefault(property)) {
        return house.type === property;
      }

      if (!isDefault(country) && !isDefault(price) && isDefault(property)) {
        return house.country === country && housePrice >= minPrice && housePrice <= maxPrice;
      }

      if (!isDefault(country) && isDefault(price) && !isDefault(property)) {
        return house.country === country && house.type === property;
      }

      if (isDefault(country) && !isDefault(price) && !isDefault(property)) {
        return housePrice >= minPrice && housePrice <= maxPrice && house.type === property;
      }

      if (house.country === country && housePrice >= minPrice && housePrice <= maxPrice && house.type === property) {
        return house;
      }
    });

    setHouses(filteredHouses);
  };

  return (
    <HouseContext.Provider
      value={{
        houses,
        country,
        setCountry,
        countries,
        price,
        setPrice,
        property,
        setProperty,
        properties,
        searchHandler,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseProvider;
