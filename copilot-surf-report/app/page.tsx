"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchLocations } from "@/lib/api";
import type { Location } from "@/lib/api";

export default function Home() {
  const [query, setQuery] = useState("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setIsLoading(true);
    try {
      const results = await searchLocations(query);
      setLocations(results);
    } catch (error) {
      console.error("Error searching locations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-2">Surf Report</h1>
      <p className="text-muted-foreground mb-8">Search for a location to view current surf conditions</p>
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
          <li key={location.id} className="p-4 border-b hover:bg-slate-50">
            <div className="font-semibold">{location.name}, {location.country}</div>
            <div className="text-sm text-muted-foreground">
              Lat: {location.latitude.toFixed(4)}, Lon: {location.longitude.toFixed(4)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
