import React, { Component } from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { observable, makeObservable, action } from 'mobx';
import Left from './left';
import Right from './right';

// 递归查找当前 id 的数据
function findItem(dataList, id) {
	let result = null;
	dataList.forEach(item => {
		const loop = data => {
			if (data.id === id) {
				result = data;
				return result;
			}

			const childs = data.childrens;

			if (childs) {
				for (let i = 0; i < childs.length; i += 1) {
					loop(childs[i]);
				}
			}
		};

		loop(item);
	});

	return result;
}

class App extends Component {

    data = [];

    constructor(props) {
        super(props);
        makeObservable(this, {
            data: observable,
            handleAddCard: action,
            handleMove: action
        });

        this.data = [
            {
                id: 1,
                type: 'View',
                childrens: []
            }
        ];
    }

    /**
     * 拖拽增加新组件
     * @param {*} targetId 目标组件id
     * @param {*} type 新增的节点类型
     */
    handleAddCard = (targetId, type) => {
		const item = findItem(this.data, targetId);
		const obj = {
			id: Math.ceil(Math.random() * 10000),
			type
		};

		if (item.childrens) {
			item.childrens.push(obj);
		} else {
			item.childrens = [obj];
        }
    };

    /**
	 * 删除节点
	 * @param {*} removeId 被删除组件 id
	 * @param {*} parentId 被删除节点的父组件 id
	 */
	removeNode = (removeId, parentId) => {
		const item = findItem(this.data, parentId);
		const index = item.childrens.findIndex(child => child.id === removeId);
		item.childrens.splice(index, 1);
	}

    /**
     * 移动组件
     * @param {*} dragItem 被拖动的组件信息
     * @param {*} overItem hover上去的组件信息
     */
    handleMove = (dragItem, overItem) => {
        const { draggedId, dragParentId } = dragItem;
        const { overId, overParentId } = overItem;

        const item = { ...findItem(this.data, draggedId) };
        const target = findItem(this.data, overParentId);

        const index = target.childrens.findIndex(v => v.id === overId);

        this.removeNode(draggedId, dragParentId);
        target.childrens.splice(index, 0, item);
    };

    render() {
        return (
            <div className="main">
                <DndProvider backend={HTML5Backend}>
                    <Left onEndDrag={this.handleAddCard}/>
                    <Right data={this.data} moveItem={this.handleMove} />
                </DndProvider>
            </div>
        );
    }
};

export default App;