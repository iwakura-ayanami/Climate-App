import React, { useState } from 'react'


export const WheatherApp = () => {
  
       
        const urlBase = 'https://api.openweathermap.org/data/2.5/weather';
        const API_KEY = '9255e1b7d4e4b827ddbce20c0e63b2aa'

        const [ciudad, setCiudad] = useState('')
        const [dataClima, setdataClima] = useState(null)
        const difKelvin = 273.15
        const handleCambioCiudad = (e) => {
            setCiudad(e.target.value)
        }
        const handleSubmit = (e) => {

            e.preventDefault()
            if(ciudad.length > 0) fetchClima()

        }
        const fetchClima = async () => {
            try{
                const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`) 
                const data = await response.json()
                setdataClima(data)
            }
            catch{

                console.error('Rayos ha ocurrido un error fernan: ', error)

            }            
        }

    return (
    <div className="container">

        <h1>Aplicacion del clima</h1>
        <form onSubmit={handleSubmit}>
            <input 
            type="text"
            value={ciudad}
            onChange={handleCambioCiudad}
            />
            <button type='submit'>Buscar</button> 
        </form>
        {
            
            dataClima && (
                <div>
                <h2>{dataClima.name}</h2>
                <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)} °C</p>
                <p>Condicion meteorologica: {dataClima.weather[0].description}</p>
                <img src={`http://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} alt="" />
                </div>
            )
        }

    </div>
  )
}

