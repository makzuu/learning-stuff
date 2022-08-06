import axios from 'axios'
import { useState, useEffect } from 'react'

const Weather = ({ country }) => {
    const [weather, setWeather] = useState({temperature: '', wind: '', icon: ''})

    const API_KEY = process.env.REACT_APP_API_KEY
    const [lat, lon] = country.capitalInfo.latlng

    useEffect(
        () => {
            axios
                .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
                .then(res => res.data)
                .then(weather => {
                    setWeather({
                        temperature: weather.main.temp,
                        wind: weather.wind.speed,
                        icon: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
                    })
                    
                })
        }, [])

    return (
        <>
        <img src={country.flags.png} />
        <h2>Weather in {country.capital[0]}</h2>
        <p>temperature {weather.temperature} Celsius</p>
        <img src={weather.icon} alt='' />
        <p>wind {weather.wind} m/s</p>
        </>
    )
}

const Country = ({ country, onlyOne, selectCountry }) => {
    if (!onlyOne) return <p>{country.name.common} <button onClick={selectCountry(country.name.common)}>show</button></p>

    return (
        <>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <h2>languages:</h2>
        <ul>
            {Object.values(country.languages).map(language =>
                <li key={language}>{language}</li>
            )}
        </ul>
        <Weather country={country} />
        </>
    )
}

const Countries = ({ countries, selectCountry }) => (
    <>
    {countries.map(country => <Country key={country.name.common} country={country} onlyOne={false} selectCountry={selectCountry} />)}
    </>
)

const Results = ({ query, countries, selectCountry }) => {

    const filterCountries = countries.filter(country => 
        country.name.common.toLowerCase().substring(0, query.length) === query.toLowerCase()
    )

    if (filterCountries.length > 10) return <p>Too many matches, specify another filter</p>

    if (filterCountries.length > 1) return <Countries countries={filterCountries} selectCountry={selectCountry}/>

    if (filterCountries.length === 1) return <Country country={filterCountries[0]} onlyOne={true} />
}

const App = () => {

    const [query, setQuery] = useState('')
    const [countries, setCountries] = useState([])

    const hdlrQuery = (event) => setQuery(event.target.value)

    const selectCountry = (country) => () => setQuery(country)

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                console.log(response.data)
                setCountries(response.data)
            })
    }, [])

    return (
        <>
        <label>find countries</label>
        <input value={query} onChange={hdlrQuery}/>

        <Results query={query} countries={countries} selectCountry={selectCountry}/>
        </>
    )
}

export default App;
