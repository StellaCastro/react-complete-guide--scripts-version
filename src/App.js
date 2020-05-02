import React, {Component} from 'react';
import './App.css';
import styled from 'styled-components';
import Person from './Person/Person.js';


const StyledButton = styled.button `
  background-color: ${props => props.alt ? 'red' : 'green'};
  color: white;
  font: inherit;
  border: 1px solid black;
  padding: 8px;
  cursor: pointer;
    
  &:hover {
    background-color: ${props => props.alt ? 'salmon' : 'lightblue'};
    color: black;
    }
  `;

class App extends Component {
  state={
    persons: [
      {id: 'unic1', name:'Max', age:28},
      {id: 'unic2', name:'Manu', age:29},
      {id: 'unic3', name:'Stephanie', age:28}
    ],
    otherState: 'other new state',
    showPersons: false
  }

  nameChangedHandler = ( event, id ) => { 
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    
    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;
    
    this.setState( {persons: persons} );
  }

  deletePersonHandler = (personIndex) => { 
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandle = () => { 
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

   render () {
     const style = {
       backgroundColor: 'green',
       color: 'white',
       font: 'inherit',
       border: '1px solid black',
       padding: '8px',
       cursor: 'pointer',
       ':hover':{
         backgroundColor: 'lightblue',
         color: 'black'
       }
     };

      let persons = null;

      if (this.state.showPersons) {
        persons = (
          <div>
            {this.state.persons.map((person, index)=> {
              return <Person
              click = {() => this.deletePersonHandler(index)}
              name = {person.name}
              age = {person.age}
              key = {person.id}
              changed = {(event) => this.nameChangedHandler(event, person.id)}/>
            })}
        </div>
        );

        /* style.backgroundColor = 'red';
        style[':hover']= {
          backgroundColor: 'salmon',
          color: 'black'
        } */
        
      }

      const classes = [];
      if(this.state.persons.length <= 2){
        classes.push('red');
      }
      if(this.state.persons.length <= 1){
        classes.push('bold');
      }

    return (
    <div className="App">
      <h1>Hi, I'm a React App</h1>
        <p className = {classes.join(' ')}>This is really working!</p>
      <StyledButton alt={this.state.showPersons} 
      onClick={this.togglePersonsHandle}>
        Toggle Persons
      </StyledButton>
      {persons}
    </div>
    );
 // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this works now?'));
  }
}

export default App;
