import React, { createContext, useState, useContext, useEffect } from 'react';
import API_BASE_URL from '../services/apiConfig';

const TripContext = createContext();

export const useTrips = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrips must be used within a TripProvider');
  }
  return context;
};

export const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [nextTrip, setNextTrip] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTrips = async () => {
    setIsLoading(true);
    try {
      // Fetch all trips for Enterprise page
      const tripsRes = await fetch(`${API_BASE_URL}/entreprise/trajets`);
      const tripsData = await tripsRes.json();
      setTrips(tripsData);

      // Fetch employees for dropdowns
      const employeesRes = await fetch(`${API_BASE_URL}/entreprise/equipe`);
      const employeesData = await employeesRes.json();
      setEmployees(employeesData);

      // Fetch next trip for Sidebar
      const nextRes = await fetch(`${API_BASE_URL}/entreprise/trajets/next`);
      const nextData = await nextRes.json();
      setNextTrip(nextData);
    } catch (error) {
      console.error('Error fetching trips:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addNewTrajet = async (trajetData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/calendrier/trajet`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trajetData)
      });
      
      if (response.ok) {
        // Refresh all data after successful addition
        await fetchTrips();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding trajet:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const value = {
    trips,
    employees,
    nextTrip,
    isLoading,
    refreshTrips: fetchTrips,
    addNewTrajet
  };

  return (
    <TripContext.Provider value={value}>
      {children}
    </TripContext.Provider>
  );
};
