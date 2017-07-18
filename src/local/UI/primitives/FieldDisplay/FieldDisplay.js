import React, { Component } from 'react';
import style from './FieldDisplay.css'
import _ from 'lodash';
class FieldDisplay extends Component {
    render() {
        let {field, value, meta, short, shortValue} = this.props;
        if(short) {
            value = shortValue || value;
        }
        try {
            return (
                <div className={style.fieldDisplay} style={{maxHeight: short ? "140px" : "900px" }}>
                    <span className={style.label}>{meta.title}</span>: <span className={style.value}  >{_.isArray(value) ? 
                        value.map((v,i) => <div key={i}  dangerouslySetInnerHTML={{__html: v}} ></div>)
                         : value}</span>
                </div>
            );    
        } catch (error) {
            console.log(field, meta, error);
        }
        
    }
}

export default FieldDisplay;