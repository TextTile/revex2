import React from 'react';
import {Layer, Rect} from 'react-konva';
export default (props) => {
    const {start, end, height, marginLeft} = props
    return <Layer>
        <Rect x={start+marginLeft} y={0} height={height} width={end-start+marginLeft} fill="#ccc" opacity="0.2" />    
    </Layer>
}
//Brush