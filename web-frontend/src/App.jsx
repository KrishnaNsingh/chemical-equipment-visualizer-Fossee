import { useState } from "react";
import FileUpload from "./components/FileUpload";
import Summary from "./components/Summary";
import Charts from "./components/Charts";
import PdfDownload from "./components/PdfDownload";
import History from "./components/History";
import "./App.css";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div>
      <header className="appHeader">
        <div>
          <h1 className="appTitle">Chemical Equipment Visualizer</h1>
          <p className="appSubtitle">
            Upload a CSV to generate a quick summary, visual analytics, and a downloadable report.
          </p>
        </div>
      </header>

      <main className="appShell">
        <section className="stack">
          <FileUpload onUploadSuccess={() => setRefreshKey(refreshKey + 1)} />
          <Summary key={refreshKey} />
          <History />
          <PdfDownload />
        </section>

        <section className="stack">
          <Charts />
        </section>
      </main>
    </div>
  );
}

export default App;