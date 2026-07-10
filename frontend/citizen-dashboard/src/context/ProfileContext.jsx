import React, { createContext, useState, useEffect, useContext } from 'react';
import { citizenService } from '../services/citizenService';

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const data = await citizenService.getProfile();
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile context:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch if there's a token, otherwise we might be on login page
    const token = localStorage.getItem('janvaani_token');
    if (token) {
      fetchProfile();
    } else {
      setIsLoading(false);
    }
  }, []);

  const updateProfileState = (newProfileData) => {
    setProfile(prev => ({ ...prev, ...newProfileData }));
  };

  const refreshProfile = async () => {
    await fetchProfile();
  };

  return (
    <ProfileContext.Provider value={{ profile, isLoading, updateProfileState, refreshProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
