import { useMemo } from 'react';

function useSettings() {
  const MAP_OPTIONS = useMemo(
    () => ({
      zoom: 10,
      // Guaçuí
      center: {
        lat: -20.769763628403116,
        lng: -41.67081580328377,
      },
      mapTypeControl: false,
      mapTypeId: 'hybrid',
    }),
    []
  );

  const DRAWING_MANAGER_OPTIONS = useMemo(
    () => ({
      drawingMode: 'polygon',
      drawingControl: false,
    }),
    []
  );

  return {
    MAP_OPTIONS,
    DRAWING_MANAGER_OPTIONS,
  };
}

export default useSettings;
