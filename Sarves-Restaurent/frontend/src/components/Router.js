import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Home from "../components/Home Page/Home";
import Filter from "../components/Filter Page/Filter";
import DetalsPage from "./Details/DetalsPage";
// import Navbar from "./Navbar";

function Routermain() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route path="/filter" component={Filter} />
      <Route path="/details" component={DetalsPage} />
      {/* <Route path="*" component={Navbar} /> */}
    </BrowserRouter>
  );
}
export default Routermain;
