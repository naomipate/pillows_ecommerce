import React from "react";
import "./Create.css";

function Create() {
  async function createPillow(e) {
    let formData = new FormData();

    formData.append("brand_name", "Armani");
    formData.append("display_name", "Test Pillow");
    formData.append("is_deleted", false);
    formData.append("has_text", true);
    formData.append("color", "black");
    formData.append("img_url", imageFile);

    const res = await fetch("http://localhost:8080/pillows", {
      method: "POST",
      body: formData,
    });
    let data = await res.json();
    console.log(data);
    e.preventDefault();
  }
  return (
    <div>
      <form onSubmit={createPillow}>
        <input
          filename={imageFile}
          onChange={(e) => setImageFile(e.target.files[0])}
          type="file"
          accept="image/*"
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Create;
