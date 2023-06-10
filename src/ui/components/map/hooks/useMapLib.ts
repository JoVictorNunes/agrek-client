import { useEffect, useState } from 'react';

function useMapLib() {
  const [lib, setLib] = useState(null);

  useEffect(() => {
    (async () => {
      const lib = await window.google.maps.importLibrary('maps');
      setLib(lib);
    })();
  }, []);

  return lib;
}

export default useMapLib;
