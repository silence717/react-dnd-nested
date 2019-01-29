import React from 'react';
import { findDOMNode } from 'react-dom';
import { DropTarget, DragSource } from 'react-dnd';
import ItemTypes from './ItemTypes';

const source = {
    beginDrag(props) {
        return {
        id: props.id,
        index: props.index
        };
    }
};

function sourceCollect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

const target = {
    
    hover(props, monitor, component) {
        
        if (!component) {
            return null;
        }

        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
        const { bottom, top } = hoverBoundingRect;

        const hoverMiddleY = (bottom - top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverCilentY = clientOffset.y - top;

        if (dragIndex < hoverIndex && hoverCilentY < hoverMiddleY) {
            return;
        }

        if (dragIndex > hoverIndex && hoverCilentY > hoverMiddleY) {
            return;
        }

        props.moveStencil(dragIndex, hoverIndex);

        monitor.getItem().index = hoverIndex;
    },

    canDrop(props) {
        const { canDrop } = props;
        return typeof canDrop === 'function' ? canDrop() : true;
    }
};

function targetCollect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        canDrop: monitor.canDrop()
    };
}

function Stencil(props) {
    
    const { className, activeClass, isDragging, connectDragSource, connectDropTarget } = props;

    return connectDragSource(
        connectDropTarget(<div className={`${className} ${isDragging ? activeClass : null}`}>{props.children}</div>)
    );
}

export default DropTarget(ItemTypes.STENCIL, target, targetCollect)(
    DragSource(ItemTypes.STENCIL, source, sourceCollect)(Stencil)
);
