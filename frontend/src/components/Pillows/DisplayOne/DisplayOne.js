import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { handleGetOnePillow } from "../../../utils/urlRequests";
import "./DisplayOne.css";

function DisplayOne() {
  let { id } = useParams();
  const [pillow, setPillow] = useState({
    // {
    //     "id": 2,
    //     "brand_name": "Versace",
    //     "display_name": "Face",
    //     "is_deleted": false,
    //     "has_text": true,
    //     "color": "gold",
    //     "img_url": "/images/pillows/face.png"
    // }
  });

  useEffect(() => {
    const fetchData = async () => {
      let data = await handleGetOnePillow(id);
      setPillow(data);
    };
    fetchData();
  }, []);

  return (
    <div className="pillow-page">
      <div
        className="image"
        style={{
          backgroundImage: `url(http://localhost:8080${pillow.img_url})`,
        }}
      ></div>
      <div className="details">
        <div>{pillow.display_name}</div>
        <div>{pillow.brand_name}</div>
        <div className="rating">Rating</div>
        <div className="price">$0.00</div>
        <div className="shipping-details"></div>
      </div>
    </div>
  );
}

export default DisplayOne;
