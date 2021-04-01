import "./App.css";
import DataSet from "./components/DataSet";
import Graph from "./components/Graph";
import { createRandomPeople } from "./scripts/generateData";

function App() {
  const people = createRandomPeople(30);
  // const people = [
  //   { weight: 0.5, height: 1.4 },
  //   { weight: 2.4, height: 1.9 },
  //   { weight: 2.9, height: 3.2 },
  // ];

  return (
    <div className="App">
      <DataSet data={people} />
      <Graph data={people} x={"weight"} y={"height"} />
    </div>
  );
}

export default App;
