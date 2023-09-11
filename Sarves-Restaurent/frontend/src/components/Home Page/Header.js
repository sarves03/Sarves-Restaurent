import React, { useEffect, useState } from "react";
import icon from "../asserts/magnifying-glass-solid.svg";
import Navbar from "../Navbar";
import axios from "axios";
import { useHistory } from "react-router-dom";
export default function Header(props) {
  const [restaurent, setRestaurent] = useState([]);
  const [inputText, setInputText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const history = useHistory();

  const handleLocation = (event) => {
    const locationId = event.target.value;
    sessionStorage.setItem("locationId", locationId);

    axios({
      method: "GET",
      url: `http://localhost:3001/api/restaurent/getRestaurent/${locationId}`,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        setRestaurent({ restaurent: response.data.data.restaurent });
        console.log("handleLocation in select", restaurent);
      })
      .catch((err) => console.log(err));
  };
  console.log("suggestions: ", suggestions);
  console.log("restaurent: ", restaurent);
  const handleSearch = (event) => {
    const inputText = event.target.value;
    const suggestions = restaurent?.restaurent?.filter((item) =>
      item.name.toLowerCase().includes(inputText.toLowerCase())
    );
    setSuggestions(suggestions);
    setInputText(inputText);
  };

  const selectingRestaurant = (resObj) => {
    history.push(`/details?restaurent=${resObj._id}`);
  };

  const showSuggestion = () => {
    if (suggestions.length == 0 && inputText == undefined) {
      return null;
    }
    if (suggestions.length > 0 && inputText == "") {
      return null;
    }
    if (suggestions.length == 0 && inputText) {
      return (
        <ul
          style={{
            backgroundColor: "white",
            width: "300px",
            margin: "auto",
            marginTop: "5px",
          }}
        >
          <li>No Search Results Found</li>
        </ul>
      );
    }
    return (
      <ol
        style={{
          backgroundColor: "white",
          width: "250px",
          margin: "auto",
          marginTop: "5px",
        }}
      >
        {suggestions?.map((item, index) => (
          <li key={index} style={{ fontSize: "12px", padding: "5px" }}>
            {`${item.name}-${item.locality},${item.city}`}{" "}
            <span
              style={{ cursor: "pointer", color: "red" }}
              onClick={() => selectingRestaurant(item)}
            >
              Order Now
            </span>
          </li>
        ))}
      </ol>
    );
  };

  return (
    <div>
      <div className="f-image">
        <Navbar />
        <div className="round">e!</div>
        <div className="search">
          <h3 className="find">Find the best restaurents,cafes, and bars</h3>
          <div>
            <select
              className="datalistinput"
              onChange={handleLocation}
              style={{ marginRight: "5px" }}
            >
              <option value="1">Select City</option>
              {props.locationsData.map((item, index) => {
                return (
                  <option
                    id="cities"
                    value={item.location_id}
                    key={index}
                  >{`${item.name}, ${item.city}`}</option>
                );
              })}
            </select>
            <div className="inputdiv">
              <img
                className="icon"
                src={icon}
                alt="icon"
                width="18px"
                height="16px"
              />
              <input
                type="search"
                id="search"
                placeholder="Search for Restuarents"
                onChange={handleSearch}
              />
            </div>
            {showSuggestion()}
          </div>
        </div>
      </div>
    </div>
  );
}
