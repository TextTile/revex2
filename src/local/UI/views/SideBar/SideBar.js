import React, { Component } from 'react';
import style from './SideBar.css';

class SideBar extends Component {
    render() {
        return (
            <div className={style.sideBar} style={this.props.style}>
                
                <div className={style.content}>
                    {this.props.children}
                </div>
                
            </div>
        );
    }
}

export default SideBar;
//<div className={style.title} style={{paddingLeft: "80px"}}></div>