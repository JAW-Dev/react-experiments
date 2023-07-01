import React, { createContext, useEffect, useState, useContext } from 'react';
import { useQuery } from 'react-query';
import { allUserHabits, fetchContentData } from '../helpers/apiCalls';

const DataContext = createContext();

export function DataProvider({ children }) {
  const { data: contentData } = useQuery('contentData', fetchContentData);

  const { data: userHabits } = useQuery('userHabits', allUserHabits);

  const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

  const [videoMap, setVideoMap] = useState(getLocalStorage('videoMap') || {});
  const [latestVideo, setLatestVideo] = useState(
    getLocalStorage('latestVideo') || {}
  );

  useEffect(() => {
    localStorage.setItem('videoMap', JSON.stringify(videoMap));
  }, [videoMap]);

  useEffect(() => {
    localStorage.setItem('latestVideo', JSON.stringify(latestVideo));
  }, [latestVideo]);

  return (
    <DataContext.Provider
      value={{
        contentData,
        userHabits,
        videoMap,
        setVideoMap,
        latestVideo,
        setLatestVideo
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

export default useData;
