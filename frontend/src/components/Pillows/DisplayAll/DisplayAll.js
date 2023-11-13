import React from "react";
import "./DisplayAll.css";
import { handleGetAllPillows } from "../../../utils/urlRequests.js";
import { useEffect, useState } from "react";

function DisplayAll() {
  const [pillows, setPillows] = useState([]);
  const [imageFile, setImageFile] = useState();

  useEffect(() => {
    const fetchData = async () => {
      let data = await handleGetAllPillows();
      setPillows(data);
    };
    fetchData();
  }, []);

  console.log(pillows);
  let pillowElList = pillows.map((pillowDetails) => {
    return <Pillow pillowDetails={pillowDetails} />;
  });

  const Pillow = ({ pillowDetails }) => {
    // {
    //     "id": 2,
    //     "brand_name": "Versace",
    //     "display_name": "Face",
    //     "is_deleted": false,
    //     "has_text": true,
    //     "color": "gold",
    //     "img_url": "/images/pillows/face.png"
    // }
    return (
      <div className="pillow-card">
        <div
          className="image"
          style={{
            backgroundImage: `url(http://localhost:8080${pillowDetails.img_url})`,
          }}
        ></div>
        <div className="display-name">{pillowDetails.display_name}</div>
        <div className="brand-name">{pillowDetails.brand_name}</div>
        <div className="rating">Rating</div>
        <div className="price">$0.00</div>
        <div className="shipping-details"></div>

        {/* <img src={"http://localhost:8080" + pillowDetails.img_url} alt={pillowDetails.display_name} width="75" /> */}
      </div>
    );
  };

  //   useEffect(() => {
  //     async function fetchData() {
  //       let pillows = await handleGetAllPillows();
  //       return pillows;
  //     }
  //     fetchData();
  //   }, []);
}
export default DisplayAll;
