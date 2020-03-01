import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cows: [],
      currentCow: null
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
      this.setState({cows: result, currentCow: result[0]});
    })
  }

  onClick(event){
    this.setState({currentCow: event.target})
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
    <form onSubmit={this.onSubmit}>
    <label>
      Name:
    <input type="text" name="name" />
    </label>
    <label>
      Description:
    <input type="text" name="description" />
    </label>
    <input type="submit" value="Submit"/>
    <CowList handleClick={this.onClick} cows={this.state.cows}/>
    </form>
    </div>
    )
  }
}

var CowList = (props) => {
let cows = props.cows.map((cow,i) => {
  return <Cow onClick={props.handleClick} key={i} cowName={cow.cows} cowDesc={cow.description}/>
})

return <div>{cows}</div>
}

class Cow extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      clicked: false
    }

  }

  render() {
  return (<div onClick={this.props.onClick}>
    {this.props.cowName}
  </div>) 
  }  
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App/>, mountNode);