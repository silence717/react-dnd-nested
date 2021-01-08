import React from 'react';
import { DragSource } from 'react-dnd';

const source = {
    // 开始拖拽钱组织数据结构
    beginDrag(props, monitor, component) {
        return {
            type: props.name
        };
    },

    endDrag(props, monitor) {
        const item = monitor.getItem();
		const result = monitor.getDropResult();
        // 确定组件已经放置到右侧区域，有结果返回的时候，调用新增组件的方法
		if (monitor.didDrop() && result) {
			props.onEndDrag(result.id, item.type);
		}
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
