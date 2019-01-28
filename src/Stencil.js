import React from "react";
import { Button, DatePicker, Input } from 'antd';
import { findDOMNode } from "react-dom";
import { DropTarget, DragSource } from "react-dnd";
import ItemTypes from "./ItemTypes";

const style = {
  padding: "0.5rem 1rem",
  backgroundColor: "#e8e8e8",
  borderRadius: '5px',
  cursor: "move"
};

const stencilSource = {
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

const stencilTarget = {

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
  }
};

function targetCollect(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
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

function Stencil(props) {
  const { type, isDragging, connectDragSource, connectDropTarget } = props;
  const opacity = isDragging ? 0 : 1;
  const cursor = isDragging ? 'pointer' : 'move';

  return connectDragSource(
    connectDropTarget(<div style={{ ...style, opacity, cursor }}>{ getStencilByType(type) }</div>)
  );
}

export default DropTarget(ItemTypes.STENCIL, stencilTarget, targetCollect)(
  DragSource(ItemTypes.STENCIL, stencilSource, sourceCollect)(Stencil)
);
