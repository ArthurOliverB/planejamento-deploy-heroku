import React from 'react';
import animate from 'animate.css'
import './Card.css';
import plus from '../assets/plus.png'
import axios from 'axios'
class Card extends React.Component {


    constructor() {
        super()
        this.state = {
            name: 'Nova tarefa', 
            note: 'Teste', 
            prio: ''
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleNoteChange = this.handleNoteChange.bind(this)
    }

    handleNameChange(e) {
        this.setState({
            name: e.target.value
        })
    }
    handleNoteChange(e) {
        this.setState({
            note: e.target.value
        })
    }
    
    renderEditable() {
        
        return (
            <div className="card-container">
                <div className="card editable">
                    <div className="tag editable event" onClick={e => this.changeClass(e)}></div>
                    <div className="content">
                        <input className="input title" value={this.state.name} onChange={this.handleNameChange} />
                        <input className="input subtitle" value={this.state.note} onChange={this.handleNoteChange}/>
                    </div>
                </div>
                
                <button onClick={e => this.animateButton(e)}>
                    <img src={plus} alt="add"/>
                </button>
            </div>
        )
    }
    
    animateButton(e) {
        let element = e.target
        
        element.classList.add('animated', 'bounceIn')

        function handleAnimationEnd() {
            element.classList.remove('animated', 'bounceIn')
            element.removeEventListener('animationend', handleAnimationEnd)
        }
        element.addEventListener('animationend', handleAnimationEnd)

        if(this.state.prio!== '' && this.state.name!== '' && this.state.note!=='') {
            this.postNewTask()
        } else {
            alert("Preencha todos os campos")
        }
    }

    postNewTask() {
                
        axios.post('http://localhost:4000/tasks', {
            name: this.state.name,
            note: this.state.note,
            prio: this.state.prio
        }).then(resp => {
            this.props.onPostTask(resp.data)
        })
    }

    changeClass(e) {
        let element = e.target

        let className = element.className.split(' ')[2]
        let elementClass = ''

        
        switch(className) {
            case 'success':
                elementClass = 'warning'
                this.setState({
                    prio: 'm'
                })
                break
            case 'warning': 
                elementClass= 'failure'
                this.setState({
                    prio: 'h'
                })
                break
            case 'failure': 
                elementClass = 'success'
                this.setState({
                    prio: 'b'
                })
                break
            default:
                elementClass = 'success'
                this.setState({
                    prio: 'b'
                })
                break
        }
        element.className = 'tag editable ' + elementClass
    }

    renderStatic() {
        let status = ''

        if (this.props.status === 'h') {
            status = 'failure'
        } else if (this.props.status === 'm') {
            status = 'warning'
        } else {
            status = 'success'
        }

        return (
                <div className="card" >
                    <div className={'tag ' + status}></div>
                    <div className="content">
                        <p className="title">{this.props.name}</p>
                        <p className="subtitle">{this.props.note}</p>
                    </div>
                </div>
        )
    }
    render() {
        
        return(
            this.props.editable === true ? this.renderEditable() : this.renderStatic()
        )
    }
}

export default Card;
