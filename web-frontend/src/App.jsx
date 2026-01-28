import FileUpload from "./components/FileUpload";
import Summary from "./components/Summary";
import Charts from "./components/Charts";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Chemical Equipment Parameter Visualizer</h1>
      <FileUpload />
      <Summary />
      <Charts />
    </div>
  );
}

export default App;
