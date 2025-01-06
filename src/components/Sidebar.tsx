import { Logo, SwitchRow } from "@globalfishingwatch/ui-components";
import { useLayers } from "../contexts/LayersContext";
import styles from "./Sidebar.module.css";

function Sidebar() {
  const { presence, satellite, togglePresence, toggleSatellite } = useLayers();

  return (
    <div className={styles.sidebar}>
      <Logo className={styles.logo} />
      <div className={styles.content}>
        <SwitchRow
          active={presence}
          onClick={togglePresence}
          tooltip="Toggle layer visibility"
          tooltipPlacement="top"
          label="Presence"
        />
        <SwitchRow
          active={satellite}
          onClick={toggleSatellite}
          tooltip="Toggle layer visibility"
          tooltipPlacement="top"
          label="Satellite"
        />
      </div>
    </div>
  );
}

export default Sidebar;
