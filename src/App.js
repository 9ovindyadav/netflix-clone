import './App.scss';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Header from "./Components/Header/header.jsx";
import Home from "./Components/Home/home.jsx";

function App() {
  return (
    <Router>
      <Header/>
      <Home/>
    </Router>
  );
}

export default App;
