import React, { Component } from "react";
import { HGroup, VGroup } from "v-block.lite/layout";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from "./Card";
import Box from "./Box";
import Stencil from './Stencil';
const update = require("immutability-helper");

function CardList(props) {

    const { cards, onAdd } = props;
    
    const cardItems = cards.map(({type}) => {
        return <Card key={type} type={type} onAdd={onAdd} />
    })
    return <VGroup width="120px" padding="1rem 0" horizontalAlign="center" gap={10}>{cardItems}</VGroup>;
}


function Stencils(props) {

    const { stencils, onMove } = props;
    
    return (
        <VGroup gap={10}>
            {stencils.map((stencil, i) => (
                <Stencil
                    key={stencil.id}
                    index={i}
                    id={stencil.id}
                    type={stencil.type}
                    moveStencil={onMove}
                />
            ))}
        </VGroup>
    );
}

class App extends Component {
    
    state = {
        stencils: [
          {
            id: 1,
            type: "date"
          },
          {
            id: 2,
            type: "input"
          },
          {
            id: 3,
            type: "button"
          }
        ],
        cards: [
            {type: 'input'},
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
                    $push: [{id, type}]
                }
            })
        )
    }


    render() {
        return (
            <HGroup gap={10} style={{ width: '100%'}} >
                <CardList cards={this.state.cards}  onAdd={this.addCard}/>
                <Box>
                    <Stencils stencils={this.state.stencils}  onMove={this.handleMove}  />
                </Box>
            </HGroup>
        );
    }
}

export default DragDropContext(HTML5Backend)(App);