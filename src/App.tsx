import React, {Component} from 'react';
import Table from './components/Table/Table';

import './App.css';

class App extends Component {
  state={}
  componentDidMount(){
    fetch('https://react-table.firebaseio.com/users.json').then(response=>response.json()).then(data=>console.log(data));
  }
  render() {
    return (
      <div className="App">
        Hi there
        <Table />
      </div>
    );
  }
}

export default App;
