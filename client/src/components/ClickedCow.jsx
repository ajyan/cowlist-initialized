import React from "react";

var ClickedCow = (props) => {
    let name = JSON.stringify(props.currentCow)
  return (
  <div>
  <span> {props.currentCow.cows }</span>
  <span> {props.currentCow.description }</span>
  </div>
    )
  }

export default ClickedCow;