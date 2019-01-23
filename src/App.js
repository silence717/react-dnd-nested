import React, { Component } from "react";
import { HGroup, VGroup } from "v-block.lite/layout";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from "./Card";
import Box from "./Box";
const update = require("immutability-helper");

function CardList(props) {

    const { cards, onAdd } = props;
    
    const cardItems = cards.map(({type}) => {
        return <Card key={type} type={type} onAdd={onAdd} />
    })

    return <VGroup gap={10}>{cardItems}</VGroup>;
}

class App extends Component {
    
    state = {
        stencils: [
          {
            id: 1,
            text: "one"
          },
          {
            id: 2,
            text: "two"
          },
          {
            id: 3,
            text: "three"
          }
        ],
        cards: [
            {type: 'number'},
            {type: 'text'},
            {type: 'date'},
            {type: 'button'}
        ]
    };

    handleMove = (dragIndex, hoverIndex) => {
        const { stencils } = this.state;
        const dragStencil = stencils[dragIndex];
    
        this.setState(
          update(this.state, {
            stencils: {
              $splice: [[dragIndex, 1], [hoverIndex, 0, dragStencil]]
            }
          })
        );
    };

    addCard = (type) => {
        
        const { stencils } = this.state;
        const id = stencils.length + 1;

        this.setState(
            update(this.state, {
                stencils: {
                    $push: [{id, text: type}]
                }
            })
        )
    }


    render() {
        return (
            <HGroup gap={10}>
                <CardList cards={this.state.cards}  onAdd={this.addCard}/>
                <Box stencils={this.state.stencils}  onMove={this.handleMove} />
            </HGroup>
        );
    }
}

export default DragDropContext(HTML5Backend)(App);