import React from "react";
import { DropTarget } from "react-dnd";
import ItemTypes from "./ItemTypes";
import Stencil from './Stencil';

const style = {
  width: "50rem",
  height: "30rem",
  padding: "1rem",
  border: "1px solid #666"
};

const boxTarget = {
    
    canDrop(props, monitor) {
        return true;
    },

    drop(props, monitor) {
        console.log(monitor.getItem());
        return { name: "Template" };
    }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

function Box(props){

    const { stencils, onMove, connectDropTarget, isOver, canDrop } = props;

    const isActive = canDrop && isOver;
    let borderColor = "#666";
    
    if (isActive) {
        borderColor = "red";
    } else if (canDrop) {
        borderColor = "#666";
    }


    return connectDropTarget(
        <div style={{ ...style, borderColor }}>
            <h3>{ isActive ? "Release to drop" : "Drag a Card here" }</h3>
            <div style={{ width: '400px' }}>
                {stencils.map((stencil, i) => (
                    <Stencil
                        key={stencil.id}
                        index={i}
                        id={stencil.id}
                        text={stencil.text}
                        moveStencil={onMove}
                    />
                ))}
            </div>
        </div>
    );

}

export default DropTarget(ItemTypes.CARD, boxTarget, collect)(Box);
