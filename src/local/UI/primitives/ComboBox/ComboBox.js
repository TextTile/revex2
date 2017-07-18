import React, { Component } from 'react';
import style from './ComboBox.css'
import classNames from 'classnames/bind'
var cx = classNames.bind(style);

class ComboBox extends Component {
    render() {
        return (
            <div>
                <div className={style.placeHolder}>All</div>
                <div className={style.SelectedValues}></div>
                <div className={style.arrowIcon}>All</div>
                <div className={style.options}>
                    <div className={style.option}>Review</div>
                    <div className={style.option}>Nice</div>
                </div>
            </div>
        );
    }
}

export default ComboBox;