import React from 'react';
import style from './Fields.css'


const Input = (props) => {
    const{value, onChange} = props;
    switch (props.type) {
        case "Text":
            return <input value={value} onChange={(e,c,v) => onChange(e.target.value)} />
    
        default:
            return <input value={value} onChange={(e,c,v) => onChange(e.target.value)} />
    }
}

const Field = (props) => {
    const {field, labelWidth, width, value, onChange} = props;
    
    return <div 
        style={{width: width}} 
        className={style.field}>
        <label 
            style={{width: labelWidth, fontWeight: props.bold ? "bold" : "normal"}}>
            {field.label}:
        </label>
        <Input 
            value={value} 
            onChange={onChange} 
            type={field.type} />
    </div>
}

export default Field