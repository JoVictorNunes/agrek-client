import { useEffect, useState } from 'react';

function useGeometryLib() {
  const [lib, setLib] = useState(null);

  useEffect(() => {
    (async () => {
      const lib = await window.google.maps.importLibrary('geometry');
      setLib(lib);
    })();
  }, []);

  return lib;
}

export default useGeometryLib;
