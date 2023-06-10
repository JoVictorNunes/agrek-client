import { useEffect, useState } from 'react';

function useDrawingLib() {
  const [lib, setLib] = useState(null);

  useEffect(() => {
    (async () => {
      const lib = await window.google.maps.importLibrary('drawing');
      setLib(lib);
    })();
  }, []);

  return lib;
}

export default useDrawingLib;
