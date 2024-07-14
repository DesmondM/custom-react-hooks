import { useState, useEffect } from 'react';
import { fetchUserPlaces } from '../http'

export function useFetch(fetchFunction, initialValue) {
    const [isFetching, setIsFetching] = useState(false)
    const [error, setError] = useState()
    const [fetchedData, setFetchedData] = useState(initialValue)

    useEffect(()=>{
        async function fetchData() {
            setIsFetching(true);
      
            try {
              const data = await fetchFunction();
      
                setFetchedData(data);
                setIsFetching(false);
              
            } catch (error) {
              setError({
                message:
                  error.message || 'Failed to fetch data, please try again later.',
              });
              setIsFetching(false);
            }
          }
      
          fetchData();
    }, [fetchFunction])
    return {
        isFetching,
        error,
        fetchedData
    }
}