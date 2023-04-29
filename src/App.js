import { Route, useLocation } from "react-router-dom";
import "./App.css";

import Detail from "./wiews/Details/Detail";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./wiews/Landing/Landing";
import Home from "./wiews/Home/Home";
import Form from "./wiews/Form/Form";
import LandingPage from "./components/PortFolio/LandingPage";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && <Navbar />}
      <Route exact path="/" render={() => <Landing />} />
      <Route exact path="/home" render={() => <Home />} />
      <Route exact path="/create" render={() => <Form />} />
      <Route exact path="/detail/:id" render={() => <Detail />} />
      <Route exact path="/landing" render={() => <LandingPage />} />
    </div>
  );
}

export default App;
