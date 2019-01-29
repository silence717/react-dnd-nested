import React from "react";
import { DropTarget } from "react-dnd";
import ItemTypes from "./ItemTypes";

const target = {
    canDrop(props) {
        const { canDrop } = props;
        return typeof canDrop === 'function' ? canDrop() : true;
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

    const { connectDropTarget, isOver, canDrop, className, activeClass } = props;
    const isActive = canDrop && isOver;

    return connectDropTarget(
                <div className={`${className} ${isActive ? activeClass : null}`}>
                    { props.children }
                </div>
            );
}

export default DropTarget(ItemTypes.CARD, target, collect)(Box);
