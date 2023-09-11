import React from "react";
import { useHistory } from "react-router-dom";
/*import Breakfast from "../asserts/breakfast.png";
import Lunch from "../asserts/lunch.jpg";
import Dinner from "../asserts/dinner.jpg";
import Snacks from "../asserts/snacks.jpg";
import Drinks from "../asserts/drinks.jpg";
import NightLife from "../asserts/night party.jpeg";*/
import Drinks from "../asserts/drinks.jpg";

export default function Quicksearch(props) {
  const history = useHistory();

  const handleNavigate = (mealname, mealtype) => {
    const locationId = sessionStorage.getItem("locationId");
    if (locationId) {
      history.push(
        `/filter?mealname=${mealname}&mealtype=${mealtype}&location_id=${locationId}`
      );
    } else history.push(`/filter?mealname=${mealname}&mealtype=${mealtype}`);
  };
  //console.log(props.QuicksearchitemsData.image);
  const { name, content, image } = props.QuicksearchitemsData;
  return (
    <div>
      <div
        className="boxs"
        onClick={() =>
          handleNavigate(
            props.QuicksearchitemsData.name,
            props.QuicksearchitemsData.meal_type
          )
        }
        style={{ cursor: "pointer" }}
      >
        <a>
          <div className="items">
            <h3>{name}</h3>
            <p>{content}</p>
          </div>
          {props.QuicksearchitemsData.image && (
            <img
              className="image"
              src={image}
              width="200px"
              height="110px"
              alt={props.QuicksearchitemsData.name}
            />
          )}
        </a>
      </div>
    </div>
  );
}
