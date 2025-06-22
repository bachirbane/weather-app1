import { useState } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

 
  const now = new Date();
  const dateString = now.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });



  const fetchWeather = async () => {
    if (!city) return;
    const API_KEY = import.meta.env.VITE_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  // 📸 Retourne une image de fond selon la météo
  const getWeatherBackgroundImage = () => {
    if (!weather || !weather.weather) {
      return
    }
  

    const condition = weather.weather[0].main.toLowerCase();

    switch (condition) {
      case "clear":
        return "url('https://cdn.pixabay.com/photo/2017/11/04/08/14/tree-2916763_960_720.jpg')";
      case "clouds":
        return "url('https://media.istockphoto.com/id/1134293928/photo/seascape.jpg?s=612x612&w=0&k=20&c=o8rLo8gZaXUGULNtzrMn8JJeFPtz03Twa4zrhQwkvFM=')";
      case "rain":
        return "url('https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1400&q=80')";
      case "thunderstorm":
        return "url('https://images.unsplash.com/photo-1604152135912-04a022e236c3?auto=format&fit=crop&w=1400&q=80')";
      case "snow":
        return "url('https://images.unsplash.com/photo-1608889178311-179ba4c8971e?auto=format&fit=crop&w=1400&q=80')";
      case "mist":
      case "fog":
        return "url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1400&q=80')";
      default:
        return "url('https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=1400&q=80')";
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center transition-all  "
      style={{ backgroundImage: getWeatherBackgroundImage() }}
    >
      <div className="p-30">

      
      <div className="p-6 max-w-md mx-auto  bg-white/30 backdrop-blur-md rounded-xl shadow-md text-black space-y-4  ">
        <h1 className="text-2xl font-bold text-center">🌤️ Application Météo</h1>

        <input
          type="text"
          placeholder="Entrer une ville🔍"
          className="input input-bordered text-lg rounded-full px-10 text-center font-bold text-black w-full"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <div className="flex justify-center">
          <button className=" btn bg-green-600" onClick={fetchWeather}>
            Voir la météo
          </button>
        </div>

        {weather && weather.main && (
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold">{weather.name}</h2>
            <p>{weather.weather[0].description}</p>
            <p>🌡️ {weather.main.temp}°C</p>
            
           
          </div>
        )}

       <div className="text-center text-xl italic text-black/80 font-bold">
  📅 {dateString}
</div>

      </div>
    </div>
    </div>
  );
};

export default Weather;
