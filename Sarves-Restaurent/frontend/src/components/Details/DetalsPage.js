import React, { useEffect, useState } from "react";
import axios from "axios";
import queryString from "query-string";
import { Carousel } from "react-responsive-carousel";
import { useLocation } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "react-tabs/style/react-tabs.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Navbar from "../Navbar";
import "./detailPage.css";
export default function DetalsPage() {
  const [restaurent, setRestaurent] = useState({});
  const location = useLocation();
  useEffect(() => {
    const qs = queryString.parse(location.search);

    const { restaurent } = qs;
    axios({
      method: "GET",
      url: `http://localhost:3001/api/restaurent/getRestaurentDetails/${restaurent}`,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        setRestaurent(response.data.data.restaurent);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Navbar />
      <div style={{ padding: "5px 100px 5px 100px" }}>
        <div>
          <div>
            <Carousel showThumbs={false}>
              <div>
                <img
                  src={
                    "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                  }
                  style={{ height: "400px", width: "100%" }}
                />
                <p className="legend">Legend 1</p>
              </div>
              <div>
                <img
                  src={
                    "https://media.istockphoto.com/id/481149282/photo/south-indian-food.jpg?s=612x612&w=0&k=20&c=w43naq0743XDvzCi5FW_ROvzw4_KaCkuam16sfy3hTc="
                  }
                  style={{ height: "400px", width: "100%" }}
                />
                <p className="legend">Legend 2</p>
              </div>
              <div>
                <img
                  src={
                    "https://t3.ftcdn.net/jpg/02/52/63/16/240_F_252631636_qnuNZp2bx1rjXJt2ydrsMVRTaMA1Nd43.jpg"
                  }
                  style={{ height: "400px", width: "100%" }}
                />
                <p className="legend">Legend 3</p>
              </div>
            </Carousel>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>{restaurent.name}</h1>{" "}
          <div>
            <button
              className="btn-order"
              onClick={() => this.handleModal(restaurent._id, true)}
            >
              Place online order
            </button>
          </div>
        </div>

        <ul>
          {restaurent?.cuisine?.map((item, index) => (
            <li key={index}>{`${item.name}`}</li>
          ))}
        </ul>
        <div>
          <Tabs>
            <TabList>
              <Tab>Overview</Tab>
              <Tab>Contact</Tab>
            </TabList>

            <TabPanel>
              <h3 className="about">About this place</h3>
              <h4 className="head">cuisine</h4>
              <h4>Bakery, Fast-food</h4>
              <div className="head">
                Average Cost{" "}
                <span className="value">
                  &#8377; {restaurent.min_price} for two people(approx)
                </span>
              </div>
            </TabPanel>
            <TabPanel>
              <h3>{restaurent.name}</h3>
              <h3 style={{ color: "red" }}>
                Phone Number :{" "}
                <span style={{ color: "black" }}>
                  {" "}
                  {restaurent.contact_number}
                </span>
              </h3>
              <h3 style={{ color: "red" }}>
                Address :{" "}
                <span style={{ color: "black" }}> {restaurent.address}</span>
              </h3>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
