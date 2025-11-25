console.log("Hola api clima");

// Función para obtener los datos del clima de la API
async function fetchWeatherData(latitude, longitude) {
    // La URL de la API de Open-Meteo con la latitud, longitud y clima actual
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=celsius&wind_speed_unit=kmh`;

    try {
        const response = await fetch(url);
        // Verifica si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.statusText}`);
        }

        const data = await response.json();

        // Puedes descomentar estos console.log para ver los datos en la consola
        // console.log(data);
        // console.log(data.current_weather);

        // Retorna el objeto 'current_weather' que contiene la temperatura y el viento
        return data.current_weather;
    } catch (error) {
        console.error("Hubo un error al obtener los datos del clima:", error);
        // En caso de error, retornamos null o un objeto de error para manejarlo
        return null;
    }
}

// Función que se ejecuta al hacer clic en el botón "Get Weather"
async function handleFetchClick() {
    console.log("Boton fetch clickeado");

    // 1. Obtener valores de latitud y longitud de los inputs
    const latitude = document.getElementById("latitude-input").value;
    const longitude = document.getElementById("longitude-input").value;

    // 2. Obtener referencias a los elementos de la interfaz de usuario
    const tempDisplay = document.getElementById("temp-display");
    const windDisplay = document.getElementById("wind-display");
    const resultBox = document.getElementById("weather-result");

    // Opcional: Mostrar un estado de carga
    tempDisplay.textContent = '...';
    windDisplay.textContent = '...';
    resultBox.classList.remove("hidden"); // Asegura que la caja de resultados sea visible

    const currentWeather = await fetchWeatherData(latitude, longitude);

        tempDisplay.textContent = currentWeather.temperature;
        windDisplay.textContent = currentWeather.windspeed;
}