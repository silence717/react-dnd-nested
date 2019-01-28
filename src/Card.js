import React from "react";
import { DragSource } from "react-dnd";
import ItemTypes from "./ItemTypes";

const cardSource = {

  beginDrag(props) {
    return {
      type: props.type
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const result = monitor.getDropResult();

    if (result) {
      props.onAdd(item.type);
    }
  },

  canDrag(props, monitor) {
      return true;
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

function Card(props) {
  const { type, style, connectDragSource, isDragging } = props;
  const opacity = isDragging ? 0.4 : 1;
  const cursor = isDragging ? 'copy' : 'move';

  return connectDragSource(<div style={{ ...style, opacity, cursor }}>{type}</div>);
}

export default DragSource(ItemTypes.CARD, cardSource, collect)(Card);
