import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { observer } from 'mobx-react';
import { DragSource, DropTarget } from 'react-dnd';

import List from './list';
import Components from './components';

const source = {
	/**
	 * 拖拽前为组件增加一些属性
	 * @param {*} props
	 */
	beginDrag(props) {
		const { parentId, item } = props;
		const { id, type, childrens } = item;
		return {
			id,
			parentId,
			type,
			items: childrens
		};
	},

	/**
	 * 限制组件是否可拖拽
	 * @param {*} props
	 */
	canDrag(props) {
		if (props.item.id === 1) return false;
		return true;
	},

	/**
	 * 当前组件是否处于拖拽中
	 * @param {*} props
	 * @param {*} monitor
	 */
	isDragging(props, monitor) {
		return props.item.id === monitor.getItem().id;
	},

	/**
	 * 我们认为当一个组件停止拖拽时移动中的位置都是在查找合适的的位置，只有在停止的时候才是它真正想要放置的位置
	 * @param {*} props
	 * @param {*} monitor
	 */
	endDrag(props, monitor) {
		const result = monitor.getDropResult();
		if (result.dragItem) {
			const { dragItem, overItem } = result;
			props.move(dragItem, overItem);
		}
	}
};

function sourceCollect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging()
	};
}

const target = {
	/**
	 * 是否可以将拖拽的元素放置
	 * @param {*} props
	 * @param {*} monitor
	 */
	canDrop(props, monitor) {
		// 在此处可以获取到拖拽的组件类型，从而增加一些是否可以放置的条件
		// const dragType = monitor.getItem().type;
		// // 放置的组件类型
		// const dropType = props.item.type;
		return true;
	},

	/**
	 * 使用drop而未使用hover是不想一直更改数据结构
	 * @param {*} props
	 * @param {*} monitor
	 */
	drop(props, monitor) {
		const didDrop = monitor.didDrop();

		if (didDrop) {
			return undefined;
		}

		const { id: draggedId, parentId: dragParentId } = monitor.getItem();
		const { parentId: overParentId } = props;
		const { id: overId } = props.item;

		if (draggedId) {
			if (draggedId === overId || draggedId === overParentId || dragParentId === overId || overParentId === null) return undefined;
			return {
				dragItem: { draggedId, dragParentId },
				overItem: { overId, overParentId }
			};
		}
		return { id: overId };
	}
};

function targetCollect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver({ shallow: true }),
		canDrop: monitor.canDrop()
	};
}
const ItemComponent = observer(class Item extends Component {
	render() {
		const { connectDropTarget, connectDragSource, canDrop, isOver, item, move } = this.props;

		const { id, type, childrens } = item;
		const CurrentComponet = Components[type];

		const classes = (canDrop && isOver) ?  'activeHover' : '';

		return (
			<CurrentComponet
				id={id}
				type={type}
				className={`item ${classes}`}
				ref={instance => {
					// eslint-disable-next-line
					const node = findDOMNode(instance);
					connectDragSource(node);
					connectDropTarget(node);
				}}>
				<List parentId={id} items={childrens} move={move} />
			</CurrentComponet>
		);
	}
});

export default DropTarget('ITEM', target, targetCollect)(DragSource('ITEM', source, sourceCollect)(ItemComponent));
