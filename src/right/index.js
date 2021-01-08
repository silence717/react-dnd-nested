import React, { Component } from 'react';
import { observer } from 'mobx-react';
import List from './list';
const RightComponent = observer(class Right extends Component {

    render() {

        const { data, moveItem } = this.props;
        return (
            <div className="right" >
                <List parentId={null} items={data} move={moveItem} />
            </div>
        )
    }
});

export default RightComponent;
