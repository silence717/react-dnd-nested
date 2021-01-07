import React, { Component } from "react";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Left from './left';
import Right from './right';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    type: 'View',
                    childrens: []
                }
            ]
        };
    }

    handleAddCard = (id, type) => {
        console.log(id, type);
    };

    render() {
        return (
            <div className="main">
                <Left onEndDrag={this.handleAddCard}/>
                <Right data={this.state.data} />
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(App);