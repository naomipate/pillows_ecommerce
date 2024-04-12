import React from "react";
const { REACT_APP_URL } = process.env;

async function handleGetAllPillows() {
  const res = await fetch(REACT_APP_URL + "/pillows/");
  const data = await res.json();
  return data;
}

async function handleGetOnePillow(id) {
  const res = await fetch(REACT_APP_URL + "/pillows/" + id);
  const data = await res.json();
  return data;
}

// async function handleCreatePillow() {
//   const res = await fetch(REACT_APP_URL + "/pillows/", {
//     request: "POST",
//   });
//   const data = await res.json();
//   return data;
// }

// async function handleDeletePillow() {
//   const res = await fetch(REACT_APP_URL + "/pillows/");
//   const data = await res.json();
//   return data;
// }

export { handleGetAllPillows, handleGetOnePillow };
