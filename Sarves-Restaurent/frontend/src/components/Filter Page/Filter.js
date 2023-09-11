import React, { useState, useEffect } from "react";
import img from "../asserts/istockphoto-1371064975-170667a.jpg";
import "./filter.css";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import FilterNav from "../Navbar";

export default function Filter() {
  const location = useLocation();
  const history = useHistory();
  const [restaurants, setRestaurants] = useState([]);
  const [locations, setLocations] = useState([]);
  const [cuisine, setcuisine] = useState([]);

  useEffect(() => {
    const qs = queryString.parse(location.search);
    const { mealtype, location_id } = qs;
    console.log("Location_id", location_id);
    const filterObj = {
      searchFilter: {
        mealtype_id: Number(mealtype),
        location_id: Number(location_id),
      },
    };

    // Fetch restaurant data based on filters
    axios({
      method: "POST",
      url: "http://localhost:3001/api/restaurent/filter",
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((response) => {
        setRestaurants(response.data.data.restaurent);
        setLocations(response.data.data.restaurent);
        // console.log("response", response.data.data.restaurent);
        // setTotalPage(new Array(response?.data?.data?.totalPage).fill("test"));
      })
      .catch((err) => console.log(err));

    //Fetch all restaurant data
    // axios({
    //   method: "GET",
    //   url: "http://localhost:3001/api/restaurent/getRestaurent",
    //   headers: { "Content-Type": "application/json" },
    // })
    //   .then((response) => {
    //     setLocations(response.data.data.restaurent);
    //     console.log("location : ", response.data.data.restaurent);
    //   })
    //   .catch((err) => console.log(err));

    axios({
      method: "GET",
      url: "http://localhost:3001/api/location/getLocation",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        setLocations(response.data.data);
        console.log("locations :", response);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log("restuarent :", restaurants);

  const handleLocationChange = (even) => {
    const locationsData = even.target.value;

    const qs = queryString.parse(location.search); //this is from mealtype from home page when we select the mealtype it will give us restaurent list
    const { mealtype } = qs;
    history.push(`/filter?mealtype=${mealtype}&location_id=${locationsData}`);
    window.location.reload();
  };
  const handleCuisineChange = (cuisineId) => {
    const qs = queryString.parse(location.search); //this is from mealtype from home page when we select the mealtype it will give us restaurent list
    const { mealtype } = qs;

    const index = cuisine.indexOf(cuisineId);
    console.log("index", index);
    if (index == -1) {
      cuisine.push(cuisineId);
    } else {
      cuisine.splice(index, 1);
    }

    const filterObj = {
      searchFilter: {
        mealtype_id: Number(mealtype),
        cuisine: cuisine.length == 0 ? undefined : cuisine,
      },
    };
    axios({
      method: "POST",
      url: "http://localhost:3001/api/restaurent/filter",
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((response) => {
        setRestaurants(response.data.data.restaurent);
        setcuisine();
        console.log("cuision Response", response);
        // this.setState({
        //   totalPage: new Array(response?.data?.data?.totalPage).fill("test"),
        // });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {" "}
      <FilterNav />
      <div className="overall-container">
        <h1>Breakfast Places in India</h1>
        <input
          className="hidden datalist"
          type="search"
          placeholder="Filter / Sort"
          list="cities"
        />
        <div className="container1">
          <div className="filters">
            <h3 className="h3">Filters</h3>
            <h4 className="h4">Select Location</h4>
            <select className="datalist" onChange={handleLocationChange}>
              <option>Select City</option>
              {locations.map((item, i) => {
                return (
                  <option key={i} value={item.location_id}>
                    {`${item.name}, ${item.city}`}
                  </option>
                );
              })}
            </select>

            <div className="Culsine">
              <h4 className="h4">Culsine</h4>
              <input
                type="checkbox"
                id="ni"
                onChange={() => handleCuisineChange(1)}
              />
              <label for="ni">North Indian</label>
              <br />
              <input
                type="checkbox"
                id="si"
                onChange={() => handleCuisineChange(2)}
              />
              <label for="si">South Indian</label>
              <br />
              <input
                type="checkbox"
                id="c"
                onChange={() => handleCuisineChange(3)}
              />
              <label for="c">Chinese</label>
              <br />
              <input
                type="checkbox"
                id="ff"
                onChange={() => handleCuisineChange(4)}
              />
              <label for="ff">Fast food</label>
              <br />
              <input
                type="checkbox"
                id="sf"
                onChange={() => handleCuisineChange(5)}
              />
              <label for="sf">Street food</label>
              <br />
            </div>
            <div className="Cost">
              <h4 className="costoftwo">Cost For Two</h4>
              <input type="radio" name="amount" id="1" />
              <label for="1">Less Then $500</label>
              <br />
              <input type="radio" name="amount" id="2" />
              <label for="2">$500 to $1000</label>
              <br />
              <input type="radio" name="amount" id="3" />
              <label for="3">$100 to $1500</label>
              <br />
              <input type="radio" name="amount" id="4" value="amount" />
              <label for="4">F$1500 to $2000</label>
              <br />
              <input type="radio" name="amount" id="5" />
              <label for="5">$2000 +</label>
              <br />
            </div>
            <div>
              <h4 className="sort">Sort</h4>
              <input type="radio" name="sort" id="sort1" />
              <label for="sort1">Price low to high</label>
              <br />
              <input type="radio" name="sort" id="sort2" />
              <label for="sort2">Price high to low</label>
            </div>
          </div>
          <div className="box">
            {restaurants.length > 0 ? (
              restaurants.map((item) => {
                return (
                  <a href="#">
                    <div className="box1">
                      <img
                        src={item.image}
                        className="imgs"
                        alt="The Big Chill Cakery"
                        width="90px"
                        height="80px"
                      />
                      <div className="content1">
                        <h2 className="h2">{item.name}</h2>
                        <h5 className="h5"> {item.locality}</h5>
                        <p className="p">{item.city}</p>
                      </div>
                      <hr />
                      <div className="cost">
                        <p>
                          <span className="cuisines">CUISINES:</span>
                          {item.cuisine.map(
                            (cuisineItem, index) =>
                              `${cuisineItem.name} ${
                                index < item.cuisine.length - 1 ? "," : ""
                              } `
                          )}
                        </p>
                        <p>
                          <span className="cf2">COST FOR TWO:</span>&#8377;
                          {item.min_price}
                        </p>
                      </div>
                    </div>
                  </a>
                );
              })
            ) : (
              <div
                className="noresults"
                style={{
                  color: "red",
                  textAlign: "center",
                  fontSize: "35px",
                  fontWeight: "bold",
                  fontFamily: "cursive",
                }}
              >
                No Results Here...
              </div>
            )}
            {restaurants.length > 0 ? (
              <div className="buttons">
                <span>
                  <button className="mb">
                    <a href="#">&lt;</a>
                  </button>
                </span>
                <span>
                  <button className="mb mb2">
                    <a href="#" className="mb2">
                      1
                    </a>
                  </button>
                </span>
                <span>
                  <button className="mb">
                    <a href="#">2</a>
                  </button>
                </span>
                <span>
                  <button className="mb">
                    <a href="#">3</a>
                  </button>
                </span>
                <span>
                  <button className="mb">
                    <a href="#">4</a>
                  </button>
                </span>
                <span>
                  <button className="mb">
                    <a href="#">5</a>
                  </button>
                </span>
                <span>
                  <button className="mb">
                    <a href="#">&gt;</a>
                  </button>
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
