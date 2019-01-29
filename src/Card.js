import React from "react";
import { DragSource } from "react-dnd";
import ItemTypes from "./ItemTypes";

const cardSource = {

    beginDrag(props, monitor, component) {
        return {
            type: props.type
        };
    },

    endDrag(props, monitor) {
        
        const item = monitor.getItem();
        const result = monitor.getDropResult();

        if (result) {
            props.onEndDrag(item.type);
        }
    },

    canDrag(props, monitor) {
        const { canDrag } = props;
        return typeof canDrag === 'function' ? canDrag() : true;
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

function Card(props) {
    
    const { style, connectDragSource, isDragging, activeStyle } = props;
    const styles = isDragging ? {...style, ...activeStyle } : { ...style };

    return connectDragSource(<div style={styles}>{ props.children }</div>, { dropEffect: 'copy' });
}

export default DragSource(ItemTypes.CARD, cardSource, collect)(Card);
