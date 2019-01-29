import React, { Component } from "react";
import { HGroup, VGroup } from "v-block.lite/layout";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Button, DatePicker, Input } from 'antd';
import SourceBox from "./SourceBox";
import TargetBox from "./TargetBox";
import SortableBox from './SortableBox';
const update = require("immutability-helper");


function CardList(props) {

    const { cards, onAdd } = props;
    
    const cardItems = cards.map(({type}) => {
        return <SourceBox className="card" activeClass="card-active" key={type} type={type} onEndDrag={onAdd}>{type}</SourceBox>
    })
    return <VGroup width="120px" padding="1rem 0" horizontalAlign="center" gap={10}>{cardItems}</VGroup>;
}

function getStencilByType(type) {

    if (type === 'button') {
        return <Button type="primary">我是一个按钮</Button>;
    }

    if (type === 'input') {
        return <Input placeholder="请输入内容..."/>;
    }

    if (type === 'date') {
        return <DatePicker />
    }
}

function Stencils(props) {

    const { stencils, onMove } = props;
    
    return (
        <VGroup gap={10}>
            {stencils.map((stencil, i) => (
                <SortableBox
                    className="sort-item"
                    activeClass="sort-item-active"
                    key={stencil.id}
                    index={i}
                    id={stencil.id}
                    moveStencil={onMove}
                >
                { getStencilByType(stencil.type) }
                </SortableBox>
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
                <TargetBox className="box" activeClass="box-active">
                    <Stencils stencils={this.state.stencils}  onMove={this.handleMove} />
                </TargetBox>
            </HGroup>
        );
    }
}

export default DragDropContext(HTML5Backend)(App);