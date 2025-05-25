import { useState, useEffect } from 'react';

interface LocationData {
  city: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
  isp?: string;
  ipv6?: string;
}

interface IpData {
  ip: string;
  location: LocationData | null;
}

export const useIpAddress = () => {
  const [ipData, setIpData] = useState<IpData>({ ip: '', location: null });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get IP address and detailed information
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();

        // Get detailed location data
        const locationResponse = await fetch(`https://ipapi.co/${ipData.ip}/json/`);
        const locationData = await locationResponse.json();
        
        // Set city to Seoul if the location is in Seoul
        const city = locationData.city.includes('-gu') ? 'Seoul' : locationData.city;
        
        setIpData({
          ip: ipData.ip,
          location: {
            city: city,
            region: locationData.region,
            country: locationData.country_name,
            latitude: locationData.latitude,
            longitude: locationData.longitude,
            isp: locationData.org,
            ipv6: locationData.ipv6 || 'Not detected'
          }
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch location data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { ipData, loading, error };
}; 