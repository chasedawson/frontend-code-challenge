import { useState } from "react";
import { SplitView } from "@globalfishingwatch/ui-components";
import { LayersProvider } from "./contexts/LayersContext";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { BrowserRouter } from "react-router-dom";
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <BrowserRouter>
      <LayersProvider>
        <SplitView
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          aside={<Sidebar />}
          main={<Main />}
        />
      </LayersProvider>
    </BrowserRouter>
  );
}

export default App;
