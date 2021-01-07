import React from 'react';
import { Menu } from 'cloud-react';
import SourceBox from './SourceBox';

const { MenuItem } = Menu;

const types = ['View', 'Text', 'Button', 'Icon'];

export default function Left({ onEndDrag }) {
    return (
        <Menu>
            {
                types.map((type, index) => {
                    return (
                        <SourceBox name={type} key={index} onEndDrag={onEndDrag}>
                            <MenuItem>{type}</MenuItem>
                        </SourceBox>
                    )
                })
            }
        </Menu>
    )
}