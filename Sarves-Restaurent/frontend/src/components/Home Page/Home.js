import React, { useEffect, useState } from "react";
import Items from "./Items";
import Header from "./Header";
import "./home.css";
import axios from "axios";
function Home() {
  const [locations, setLocations] = useState([]);
  const [mealtypes, setMealtypes] = useState([]);
  useEffect(() => {
    sessionStorage.clear();
    // Fetch locations
    axios({
      method: "GET",
      url: "http://localhost:3001/api/location/getLocation",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        setLocations(response.data.data);
      })
      .catch((err) => console.log(err));

    // Fetch meal types
    axios({
      method: "GET",
      url: "http://localhost:3001/api/mealtype/getAllMealTypes",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        setMealtypes(response.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // console.log("API Locations Data: " + JSON.stringify(locations));
  // console.log("API MealTypes Data: " + JSON.stringify(mealtypes));

  return (
    <div>
      <Header locationsData={locations} />
      <Items quicksearchData={mealtypes} />
    </div>
  );
}

export default Home;
