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

    return (
        <>
        <label>
            find countries
            <input id='country' type='text' onChange={e => setFilter(e.target.value)} value={filter}/>
        </label>
        <Info countries={countries} country={filter} setCountry={setFilter} />
        </>
    )
}

const Info = ({ country, countries, setCountry }) => {
    if (country.length === 0 || countries.length === 0) return null

    const search = country[0].toUpperCase() + country.substring(1)
    const found = countries.filter(c => c.name.common.startsWith(search))

    if (found.length > 10)
        return <p>Too many matches, specify another filter</p>
    if (found.length > 1)
        return (
            <ul>
                { found.map(c =>
                    <li key={c.name.common}>
                        {c.name.common}
                        <button onClick={() => setCountry(c.name.common)}>show</button>
                    </li>) 
                }
            </ul>
        )
    if (found.length === 1) {
        const name = found[0].name.common
        const capital = found[0].capital[0]
        const area = found[0].area
        const languages = Object.values(found[0].languages)
        const image = found[0].flags.png

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
            </>
        )
    }
    
    return null
}
        

export default App;
