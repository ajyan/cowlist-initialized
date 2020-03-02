import React from "react";
import Cow from './Cow.jsx'

var CowList = (props) => {
    let cows = props.cows.map((cow,i) => {
      return <Cow onClick={props.handleClick} key={i} num={i} cowName={cow.cows} cowDesc={cow.description}/>
    })
      return <div>{cows}</div>
}

export default CowList;
