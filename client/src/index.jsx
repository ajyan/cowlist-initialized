import React from "react";
import ReactDOM from "react-dom";
import Cow from './components/Cow.jsx'
import ClickedCow from './components/ClickedCow.jsx'
import CowList from './components/CowList.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cows: [],
      currentCow: {cows: null}
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this)
  }

  
  componentDidMount(){
    this.fetcher();
  }

  fetcher(){
    fetch('http://localhost:3000/api/cows')
    .then(res => res.json())
    .then((result) => {
      this.setState({cows: result});
    })
  }

  onClick(event){
    this.setState({currentCow: this.state.cows[event.target.id]})
  }

  onSubmit(event){
    event.preventDefault()
    var submission = {
      cowname: event.target.name.value,
      description: event.target.description.value
    }
    this.post(submission)
  }

  post(submission) {
    fetch('http://localhost:3000/api/cows',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submission)
      }
    ).then(() => {
      this.fetcher();
    })
  }
  

  render() {
    return (
    <div> 
      <h1>Wi-Cow-pedia</h1>
      <ClickedCow currentCow={this.state.currentCow}/>
    <form onSubmit={this.onSubmit}>
    <label>
      Name:
    <input type="text" name="name" />
    </label>
    <br></br>
    <label>
      Description:
    <input type="text" name="description" />
    </label>
    <br></br>
    <input type="submit" value="Submit"/>
    <CowList handleClick={this.onClick} cows={this.state.cows}/>
    </form>
    </div>
    )
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App/>, mountNode);