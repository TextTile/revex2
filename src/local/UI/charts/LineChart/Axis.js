import React from 'react';
import {Layer, Line, Text} from 'react-konva';

//yMax={max} x={20} height={HEIGHT} 
export default (props) => {
    const {x, height, yMax} = props;
    return <Layer>
        <Text x={10} y={0} text={yMax} fontFamily="Arial" fontSize="13px" fill="#cc" rotation={90} />
        <Line x={0} y={0} points={[x, 0, x,height+5]} stroke="#ccc"></Line>
        <Line x={0} y={0} points={[x-5, height, 400,height]} stroke="#ccc"></Line>
    </Layer>
}