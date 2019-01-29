import React from "react";
import { DropTarget } from "react-dnd";
import ItemTypes from "./ItemTypes";

const boxTarget = {
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

    const { connectDropTarget, isOver, canDrop, style, activeStyle } = props;
    const isActive = canDrop && isOver;
    const styles = isActive ? {...style, ...activeStyle } : {...style};

    return connectDropTarget(
        <div style={styles}>
            { props.children }
        </div>
    );
}

export default DropTarget(ItemTypes.CARD, boxTarget, collect)(Box);
