import {Layer, Path, Group} from 'react-konva';
import React from 'react';

export default (props) => {
    const {marginLeft} = props;
    return <Layer>
    <Group x={marginLeft}>
        <Path  data={props.path}
            x={0}
            y={0}
            stroke="#006CAB"
            strokeWidth={1}
        />
    </Group>
    </Layer>
}
