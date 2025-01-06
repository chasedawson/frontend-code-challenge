import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useSearchParams } from "react-router-dom";
import qs from "qs";

interface LayersState {
  presence: boolean;
  satellite: boolean;
  togglePresence: () => void;
  toggleSatellite: () => void;
}

const LayersContext = createContext<LayersState | undefined>(undefined);

export function LayersProvider({ children }: { children: React.ReactNode }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [presence, setPresence] = useState(
    () => searchParams.get("presence") === "true"
  );
  const [satellite, setSatellite] = useState(
    () => searchParams.get("satellite") === "true"
  );

  useEffect(() => {
    const params = { presence, satellite };
    setSearchParams(qs.stringify(params), { replace: true });
  }, [presence, satellite, setSearchParams]);

  const togglePresence = useCallback(() => {
    setPresence((prev) => !prev);
  }, []);

  const toggleSatellite = useCallback(() => {
    setSatellite((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({
      presence,
      satellite,
      togglePresence,
      toggleSatellite,
    }),
    [presence, satellite, togglePresence, toggleSatellite]
  );

  return (
    <LayersContext.Provider value={value}>{children}</LayersContext.Provider>
  );
}

export function useLayers() {
  const context = useContext(LayersContext);
  if (context === undefined) {
    throw new Error("useLayers must be used within a LayersProvider");
  }
  return context;
}
