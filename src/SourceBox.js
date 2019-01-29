import React from "react";
import { DragSource } from "react-dnd";
import ItemTypes from "./ItemTypes";

const source = {

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
    
    const { connectDragSource, isDragging, className, activeClass } = props;

    return connectDragSource(
            <div className={`${className} ${isDragging ? activeClass : null}`}>
                { props.children }
            </div>, 
            { dropEffect: 'copy' }
        );
}

export default DragSource(ItemTypes.CARD, source, collect)(Card);
