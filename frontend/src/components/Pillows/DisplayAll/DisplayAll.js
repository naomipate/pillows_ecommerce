import React from "react";
import "./DisplayAll.css";
import { handleGetAllPillows } from "../../../utils/urlRequests.js";
import { useEffect, useState } from "react";

function DisplayAll() {
  const [imageFile, setImageFile] = useState();

  //   useEffect(() => {
  //     async function fetchData() {
  //       let pillows = await handleGetAllPillows();
  //       return pillows;
  //     }
  //     fetchData();
  //   }, []);

  function handleGetImageFromComputer(e) {
    setImageFile(e.target.value);
  }

  async function createPillow() {
    let displayName = "Test Pillow";
    let brandName = "Armani";

    let formData = new FormData();

    formData.append("display_name", displayName);
    formData.append("brand_name", brandName);
    formData.append("files", imageFile);

    console.log(formData);

    const res = await fetch("http://localhost:8080/pillows", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        boundary: "files",
      },
      body: {
        formData,
      },
    });
    let data = await res.json();
    console.log(data);
  }
  return (
    <div>
      <input type="file" onChange={handleGetImageFromComputer} />
      <button onClick={createPillow}>Submit</button>
      Hello World
    </div>
  );
}

export default DisplayAll;
