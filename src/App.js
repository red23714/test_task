import Collibrate from "./components/Collibrate";
import './App.css';

function App(props) {
  return (
    <div className="App">
      <Collibrate state={props.state}/>
    </div>
  );
}

export default App;
