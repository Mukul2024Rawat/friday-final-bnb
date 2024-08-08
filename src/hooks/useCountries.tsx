import countries from 'world-countries';

const formattedCountries = countries.map((country : any) => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region,
}));

export const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value);
}


export const useCountries = () => {
    const getAll = () => formattedCountries;

   
    return {
        getAll,
        getByValue
    }
};
