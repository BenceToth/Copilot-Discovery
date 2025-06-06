export interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code: string;
  timezone: string;
}

interface LocationResponse {
  results?: Location[];
  generationtime_ms: number;
}

export interface WeatherForecast {
  latitude: number;
  longitude: number;
  timezone: string;
  current_weather: {
    temperature: number;
    windspeed: number;
    time: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: number[];
    windspeed_10m: number[];
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
    windspeed_10m_max: number[];
  };
}

export interface MarineWeather {
  latitude: number;
  longitude: number;
  current: {
    time: string;
    interval: number;
    wave_height: number;
    sea_surface_temperature: number;
  };
  current_units: {
    time: string;
    interval: string;
    wave_height: string;
    sea_surface_temperature: string;
  };
}

export async function searchLocations(query: string): Promise<Location[]> {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=en&format=json`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: LocationResponse = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
}

export async function getWeatherForecast(latitude: number, longitude: number): Promise<WeatherForecast | null> {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation_probability,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,windspeed_10m_max&current_weather=true&timezone=auto`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    return null;
  }
}

export async function getMarineWeather(latitude: number, longitude: number): Promise<MarineWeather | null> {
  try {
    const response = await fetch(
      `https://marine-api.open-meteo.com/v1/marine?latitude=${latitude}&longitude=${longitude}&current=wave_height,sea_surface_temperature`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Marine API response:', data);  // Debug log
    
    // Check if the response has valid data
    if (!data.current || 
        typeof data.current.wave_height === 'undefined' || 
        typeof data.current.sea_surface_temperature === 'undefined') {
      console.log('No marine data available for this location');
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching marine weather:', error);
    return null;
  }
}