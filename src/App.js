import { MenuItem , FormControl, Select } from '@material-ui/core';
import { useState } from 'react';
import './App.css';

function App() {
  const [countries,setCountries]=useState(['usa','us','india'])
  return (
    <div className="app">
      <div className="app__header">
      <h1>COVID-19 TRACKER</h1>
  

      <FormControl className="app__dropdown">
        <Select
        variant="outlined"
        value="abc"
        >
          {countries.map(country=>( <MenuItem value={country}>{country}</MenuItem>))}
         
         
        </Select>
      </FormControl>
      </div>
    {/* header */}
    {/* title */}
    {/* infobox */}
    {/* infobox */}
    {/* infobox */}
    {/* table */}
    {/* graph */}
    {/* map */}

    </div>
  );
}

export default App;
