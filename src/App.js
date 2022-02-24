import { MenuItem , FormControl, Select, Card, CardContent } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map';

function App() {
  const [countries,setCountries]=useState([]);
  const [country,setCountry]=useState('worldwide');
  const [countryInfo,setCountryInfo]=useState({});
  
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response=>response.json())
    .then(data=>{
      setCountryInfo(data)
    })
  },[])
  useEffect(()=>{
const getCountriesData = async()=>{
  await fetch("https://disease.sh/v3/covid-19/countries")
  .then((response)=>response.json())
  .then((data)=>{
    console.log(data)
    const countries=data.map((country)=>(
      {
        name:country.country,
        value:country.countryInfo.iso2
      }
    ));
    setCountries(countries);
  })
}
getCountriesData();
  },[])
  
  const onCountryChange = async (event)=>{
    const countryCode = event.target.value;
    console.log("selected country", countryCode)
    setCountry(countryCode);
    const url = 
      countryCode === "worldwide"? "https://disease.sh/v3/covid-19/countries/all" :
      `https://disease.sh/v3/covid-19/countries/${countryCode}`
      // "https://disease.sh/v3/covid-19/countries/all"
      // "https://disease.sh/v3/covid-19/countries/COUNTRY_CODE"
    await fetch(url)
    .then(response=>response.json())
    .then(data=>{
      setCountry(countryCode);
      setCountryInfo(data);
    });

  };
  console.log(countryInfo)
  return (
    <div className="app">
      <div className='app__left'>
      <div className="app__header">
      <h1>COVID-19 TRACKER</h1>
  

      <FormControl className="app__dropdown">
        <Select
        variant="outlined"
        onChange={onCountryChange}
        value={country}
        >
          <MenuItem value="worldwide">WORLDWIDE</MenuItem>
          {countries.map(country=>( <MenuItem value={country.value}>{country.name}</MenuItem>))}
         
         
        </Select>
      </FormControl>
      </div>
    <div className='app__stats'>
      <InfoBox title= "Coronavirus cases" cases={countryInfo.todayCases}total={countryInfo.cases}/>
      <InfoBox title= "Recovered"cases={countryInfo.todayRecovered}total={countryInfo.recovered}/>
      <InfoBox title= "Deaths"cases={countryInfo.todayDeaths}total={countryInfo.deaths}/>
    
    </div>
    
   
    <Map/>
    </div>
    <Card className='app__right'>

<CardContent>
<h3>Live Cases by Country</h3>
<h3>worldwide new cases</h3>

</CardContent>
  
    </Card>
  </div>
  );
}

export default App;
