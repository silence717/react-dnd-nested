import React, { Component } from 'react';
import List from './list';

export default class Right extends Component {

    render() {

        const { data, moveItem } = this.props;
        return (
            <div className="right" >
                <List parentId={null} items={data} move={moveItem} />
            </div>
        )
    }
}