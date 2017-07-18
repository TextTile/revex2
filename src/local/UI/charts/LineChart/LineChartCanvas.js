import React from 'react';
import {Stage} from 'react-konva';
export default (props) => {
    const {width, height} = props;
    return (
      <Stage width={width} height={height}>
            {props.children}
      </Stage>
    );
}