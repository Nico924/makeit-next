import countriesNl from './country_nl';
import countriesFr from './country_fr';
import countriesEn from './country_en';

const countries = [];

const keys = Object.keys(countriesEn);

keys.forEach((key): void => {
  countries.push({
    en: countriesEn[key],
    fr: countriesFr[key],
    nl: countriesNl[key],
    text: countriesEn[key],
    value: key,
  });
});

export default countries;
