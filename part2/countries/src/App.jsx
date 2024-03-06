import { useState, useEffect } from "react";

const CountryList = ({ country, filtered }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      {filtered.length > 1 && (
        <div style={{display:"flex", alignItems:"center", gap:"1rem"}}>
          <p>{country.name.common} </p>
          <button onClick={() => setToggle(!toggle)}>Show</button>
        </div>
      )}
      {filtered.length === 1 || toggle ?(
        <div className="ountry-info">
          <h2>{country.name.common}</h2>
          {country.capital.map((capital) => (
            <p key={country.name}>Capital: {capital}</p>
          ))}
          <p>Area: {country.area}</p>
          <p>More INFO HERE</p> 
          <h3>Languages</h3>
          <ul>
           {Object.entries(country.languages).map(([key, language]) => (
            <li key={key}>{language}</li>
           ))}
           </ul>
           <img src={country.flags.png} alt={`Flag of ${country.name.common}`}/>
        </div>
      ) : null}
    </div>
  );
};

function App() {
  const [countries, setCountries] = useState(null);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  const getCountries = () => {
    fetch("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Newtwork response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  };

  useEffect(() => {
    getCountries();
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearch(e.target.value);
    filteredCountries(searchTerm);
  };

  const filteredCountries = (searchTerm) => {
    if (searchTerm) {
      const filteredCountries = countries
        ? countries.filter(
            (country) =>
              country.name.common &&
              country.name.common.toLowerCase().includes(search.toLowerCase())
          )
        : [];
      setFiltered(filteredCountries);
    } else {
      setFiltered([]);
    }
  };

  return (
    <div>
      <div>
        <span>Find Country </span>
        <input type="text" onChange={handleSearch} />
        {filtered.length <= 10 ? (
          <>
            {filtered.map((item) => (
              <CountryList
                key={item.name.common}
                country={item}
                filtered={filtered}
              />
            ))}
          </>
        ) : search ? (
          <p>Too many matches, specify another filter</p>
        ) : null}
      </div>
    </div>
  );
}

export default App;
