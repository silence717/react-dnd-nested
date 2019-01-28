import React from "react";
import { DropTarget } from "react-dnd";
import ItemTypes from "./ItemTypes";

const style = {
  width: 'inherit',
  padding: "1rem",
  border: "1px solid #e8e8e8"
};

const boxTarget = {
    
    canDrop(props, monitor) {
        return true;
    },

    drop(props, monitor) {
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

    const { connectDropTarget, isOver, canDrop } = props;

    const isActive = canDrop && isOver;
    let borderColor = "#e8e8e8";
    
    if (isActive) {
        borderColor = "red";
    } else if (canDrop) {
        borderColor = "#e8e8e8";
    }

    return connectDropTarget(
        <div style={{ ...style, borderColor }}>
            <h3>{ isActive ? "Release to drop" : "Drag a Card here" }</h3>
            { props.children }
        </div>
    );
}

export default DropTarget(ItemTypes.CARD, boxTarget, collect)(Box);
