import { useState } from "react";
import FileUpload from "./components/FileUpload";
import Summary from "./components/Summary";
import Charts from "./components/Charts";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Chemical Equipment Parameter Visualizer</h1>

      <FileUpload onUploadSuccess={() => setRefreshKey(refreshKey + 1)} />

      <Summary key={refreshKey} />

      <Charts />
    </div>
  );
}

export default App;
