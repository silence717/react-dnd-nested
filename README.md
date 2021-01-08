## read-dnd 嵌套使用

不做具体react-dnd的api讲解，如有需要请查看官网文档，描述很清晰。  
[react-dnd-官网](https://react-dnd.github.io/react-dnd/docs/tutorial)

### 需求背景

- 左侧是物料区，各个可以拖拽的小组件
- 右侧为编辑区，可以将组件拖进去组成页面
- 右侧编辑区内已拖拽的小组件可以在内部继续拖拽进行排序

### 技术栈  
react、react-dom、mobx、mobx-react、react-dnd

### 实现逻辑
#### 数据结构设计

| 属性        | 类型     | 说明             |
| --------- | ------ | -------------- |
| id        | Number | 组件id（根据规则自动生成） |
| type      | String | 组件类型           |
| childrens | Array  | 组件下面包含的子组件     |
|           |        |                |

```javascript
// 数据示例如下：
[
    {
        id: 1,
        type: 'View',
        childrens: [
            {
                id: 345,
                type: 'Button'
            },
            ...
        ]
    }
]
```

#### 应用主入口代码

![app.png](https://github.com/silence717/react-dnd-drag-demo/blob/master/docs/app.png)
#### 左侧组件使用 SourceBox 包裹

基础使用，不做清晰说明，需要查看官网文章，代码如下：

![left.png](https://github.com/silence717/react-dnd-drag-demo/blob/master/docs/left.png)

新增组件的方法

![add.png](https://github.com/silence717/react-dnd-drag-demo/blob/master/docs/add.png)

在这里我们需要一个递归查找当前数据的工具方法`findItem`

![findItem.png](https://github.com/silence717/react-dnd-drag-demo/blob/master/docs/findItem.png)

#### 编辑器区域实现

由于数据是循环嵌套的，因此我们分为2个组件来实现，分别为list和item，再包含一个入口的文件。

##### index.js

![right.png](https://github.com/silence717/react-dnd-drag-demo/blob/master/docs/right.png)

##### list组件包含里面我们对当前数据进行循环，设置每一个的item

![list.png](https://github.com/silence717/react-dnd-drag-demo/blob/master/docs/list.png)

##### item组件为核心组件，既要作为target接收组件，又需要作为source支持拖拽排序

![item.png](https://github.com/silence717/react-dnd-drag-demo/blob/master/docs/item.png)

处理move的动作：

![move.png](https://github.com/silence717/react-dnd-drag-demo/blob/master/docs/move.png)

##### 动态效果
![move.png](https://github.com/silence717/react-dnd-drag-demo/blob/master/docs/move.png)
## 项目使用
```bash
yarn install
yarn start
```
打开浏览器，访问：[http://localhost:3000/](http://localhost:3000/)

### 本文demo展示地址  
待完成。。。
如果对你有帮助的话，欢迎star✨

