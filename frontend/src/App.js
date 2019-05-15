import React from 'react';
import './App.css';
import './components/Card.css';
import axios from 'axios'
import Card from './components/Card'
import animate from 'animate.css'
class App extends React.Component {

  constructor() {
    super()
    this.state = {
      tasks: []
    }
  }
  handleNewTask = (task) => {
    // (this);
    const auxTasks = [ ...this.state.tasks ]
    auxTasks.unshift(task)
    this.setState({ tasks: auxTasks })
  }
  fetchTasks() {
    const url = 'http://localhost:4000/tasks'

    return axios.get(url)
  }

  componentWillMount() {
    this.fetchTasks().then(response => {
      
      this.setState({tasks: [...response.data].reverse()})      
    })
  }
  itemsComponents() {
    
    const items = this.state.tasks.map((task, index) => {
      
      return (
          <Card key={index} status={task.prio} name={task.name} note={task.note} editable="false"></Card>
      )
    })
    return (
      <div className="animated fadeIn">
        {items}
      </div>
    )
  }
  render() {
    return (
      <div className="App">
        <div className="todo">
          <div className="header">
            <div className="date">
              <h2>Hoje</h2>
            </div>
          </div>
          <Card name="Nova Tarefa" note="Notas sobre a tarefa" editable= {true} onPostTask = {this.handleNewTask}></Card>
          {this.itemsComponents()}
        </div>
      </div>
    ) 
  }
}

export default App;
