import React from 'react';
import { DragSource } from 'react-dnd';

const source = {

    beginDrag(props, monitor, component) {
        return {
            type: props.name
        };
    },

    endDrag(props, monitor) {
        const item = monitor.getItem();
		const result = monitor.getDropResult();

		if (monitor.didDrop() && result) {
			props.onEndDrag(result.id, item.type);
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

function SourceBox(props) {

    const { connectDragSource, isDragging, children, name } = props;
    const classes = isDragging ? 'active' : '';

    return connectDragSource(
            <div className={classes} name={name}>
                { children }
            </div>,
            { dropEffect: 'copy' }
        );
}

export default DragSource('ITEM', source, collect)(SourceBox);
