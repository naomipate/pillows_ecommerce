import React from "react";
import "./DisplayAll.css";
import { handleGetAllPillows } from "../../../utils/urlRequests.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DisplayAll() {
  const [pillows, setPillows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let data = await handleGetAllPillows();
      setPillows(data);
    };
    fetchData();
  }, []);

  console.log(pillows);
  let pillowElList = pillows.map((pillowDetails, index) => {
    return <Pillow key={index} pillowDetails={pillowDetails} />;
  });

  return <div className="pillows-container">{pillowElList}</div>;
}

const Pillow = ({ pillowDetails }) => {
  let navigate = useNavigate();
  const handlePillowOnClick = (pillowID) => {
    console.log(pillowID);
    navigate(`/pillows/${pillowID}`);
  };

  return (
    <div
      className="pillow-card"
      onClick={() => handlePillowOnClick(pillowDetails.id)}
    >
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
export default DisplayAll;
