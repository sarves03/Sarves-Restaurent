import React from "react";
import Quicksearch from "./Quicksearch";
export default function Items(props) {
  return (
    <div>
      {" "}
      <div className="container">
        <h1>Quick Searches</h1>
        <p style={{ fontSize: "16px" }}>
          Discover restuarent by the type of the meal
        </p>
        <div className="grid">
          {props.quicksearchData.map((item) => {
            return <Quicksearch QuicksearchitemsData={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
