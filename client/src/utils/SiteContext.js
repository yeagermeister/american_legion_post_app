import { createContext, useState } from 'react';

export const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const [siteData, setSiteData] = useState(null); // Initialize with null or initial data

  // Function to update the siteData state
  const updateSiteData = (data) => {
    setSiteData(data);
  };

  return (
    <SiteContext.Provider value={{ siteData, updateSiteData }}>
      {children}
    </SiteContext.Provider>
  );
};