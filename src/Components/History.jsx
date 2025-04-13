import React, { useEffect, useState } from "react";
import { BiX } from "react-icons/bi";

export default function History({setOpenHistory, active, dataHistory, setDataHistory}) {
  // useEffect(() => {
  //   localStorage.getItem("DB") && setData(JSON.parse(localStorage.getItem("DB")))
  // }, [])
  const removeItemHandler = (shippment) => {
    let DB = JSON.parse(localStorage.getItem("DB")) || []
    DB = DB.filter(i => i.shippment !== shippment)
    setDataHistory(DB)
    localStorage.setItem("DB", JSON.stringify(DB))
  }
  const hiddenHistory = (e) => {
    if (e.target.classList.contains("History")) setOpenHistory(false)
  }

  return (
    <div onClick={hiddenHistory} className={`History${!active ? " closed" : ""}`}>
      <div className="historyContainer">
        <h2>
          History
          <span>
            <BiX onClick={() => setOpenHistory(false)} />
          </span>
        </h2>
        <div style={{ padding: "10px 20px" }} className="historyItem">
          <div className="content">
            <p>LWSTR</p>
            <p>DDSTOR</p>
            <p>Total TTC</p>
          </div>
        </div>
        <div className="items-container">
          {dataHistory.map((item, i) => (
            <div key={i} className="historyItem">
              <div className="head">
                <div className="shippment">{item.shippment}</div>
                <span className="remove">
                  <BiX onClick={() => removeItemHandler(item.shippment)} />
                </span>
              </div>
              <div className="content">
                <p>{item.output.lwstr.toFixed(2)} Dhs</p>
                <p>{item.output.ddstor.toFixed(2)} Dhs</p>
                <p>{item.output.ttc.toFixed(2)} Dhs</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
