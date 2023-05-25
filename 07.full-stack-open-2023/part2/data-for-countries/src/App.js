import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
    const [filter, setFilter] = useState('')
    const [countries, setCountries] = useState([])

    useEffect(() => {
        axios
            .get('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then(response => setCountries(response.data))
    }, [])

    const found = countries.filter(c => 
        c.name.common.toLowerCase().startsWith(filter.toLowerCase())
    )

    if (filter.length === 0 || countries.length === 0)
        return <Form input={filter} setInput={setFilter}/>

    if (found.length > 10)
        return (
            <>
                <Form input={filter} setInput={setFilter}/>
                <p>Too many matches, specify another filter</p>
            </>
        )

    if (found.length > 1)
        return (
            <>
                <Form input={filter} setInput={setFilter}/>
                <ul>
                    { found.map(country => <li key={country.name.common}>
                        {country.name.common}
                        <button onClick={() => setFilter(country.name.common)}>show</button>
                        </li>
                    )}
                </ul>
            </>
        )

    if (found.length === 1)
        return (
            <>
                <Form input={filter} setInput={setFilter}/>
                <Country country={found[0]} />
            </>
        )

    return (
        <>
            <Form input={filter} setInput={setFilter}/>
        </>
    )
}

const Form = ({ input, setInput }) => (
    <label>
        find countries
        <input type='text' onChange={e => setInput(e.target.value)} value={input}/>
    </label>
)

const Country = ({ country }) => {
    const name = country.name.common
    const capital = country.capital[0]
    const area = country.area
    const languages = Object.values(country.languages)
    const image = country.flags.png


    return (
        <>
            <h2>{name}</h2>
            capital {capital} <br/>
            area {area}
            <h3>languages:</h3>
            <ul>
                { languages.map(l => <li key={l}>{l}</li>) }
            </ul>
            <img src={image} alt='country flag'/>

            <Weather country={country} />
        </>
    )
}

const Weather = ({ country }) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [lat, lon] = country.capitalInfo.latlng
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`

    const [weather, setWeather] = useState(null)

    useEffect(() => {
        axios
            .get(url)
            .then(response => setWeather(response.data))
    }, [])

    if (weather === null) return null

    const iconSrc = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

    return (
        <>
            <h2>Weather in {country.capital[0]}</h2>
            temperature {weather.main.temp} celsius <br />
            <img src={iconSrc} alt='weather icon'/> <br />
            wind {weather.wind.speed} m/s
        </>
    )
}

export default App;
