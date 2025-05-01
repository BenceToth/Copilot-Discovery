"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { searchLocations, getMarineWeather } from "@/lib/api";
import type { Location, MarineWeather } from "@/lib/api";

export default function Home() {
  const [query, setQuery] = useState("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [marineWeather, setMarineWeather] = useState<MarineWeather | null>(null);

  const handleSearch = async () => {
    if (!query) return;
    setIsLoading(true);
    try {
      const results = await searchLocations(query);
      setLocations(results);
      setSelectedLocation(null);
      setMarineWeather(null);
    } catch (error) {
      console.error("Error searching locations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSelect = async (location: Location) => {
    setSelectedLocation(location);
    const weather = await getMarineWeather(location.latitude, location.longitude);
    setMarineWeather(weather);
  };

  const handleBackToSearch = () => {
    setSelectedLocation(null);
    setMarineWeather(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-2">Surf Report</h1>
      <p className="text-muted-foreground mb-8">Search for a location to view current surf conditions</p>
      
      {!selectedLocation ? (
        <>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Enter location name"
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </div>

          <ul className="w-full max-w-md">
            {locations.map((location) => (
              <li 
                key={location.id} 
                className="p-4 border-b hover:bg-slate-50 cursor-pointer transition-colors"
                onClick={() => handleLocationSelect(location)}
              >
                <div className="font-semibold">{location.name}, {location.country}</div>
                <div className="text-sm text-muted-foreground">
                  Lat: {location.latitude.toFixed(4)}, Lon: {location.longitude.toFixed(4)}
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <Card className="p-6 mb-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Current Conditions for {selectedLocation.name}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 p-4 bg-slate-50 rounded-lg">
                <div className="text-3xl font-bold">
                  {marineWeather?.current.wave_height}
                  <span className="text-sm font-normal ml-1">
                    {marineWeather?.current_units.wave_height}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">Wave Height</div>
              </div>
              <div className="space-y-2 p-4 bg-slate-50 rounded-lg">
                <div className="text-3xl font-bold">
                  {marineWeather?.current.sea_surface_temperature}
                  <span className="text-sm font-normal ml-1">
                    {marineWeather?.current_units.sea_surface_temperature}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">Water Temperature</div>
              </div>
            </div>
            {marineWeather && (
              <p className="text-sm text-muted-foreground mt-4">
                Last updated: {new Date(marineWeather.current.time).toLocaleString()}
              </p>
            )}
          </Card>
          <Button 
            variant="outline"
            onClick={handleBackToSearch}
            className="w-full max-w-md"
          >
            Back to Search
          </Button>
        </>
      )}
    </div>
  );
}
