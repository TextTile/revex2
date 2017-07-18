import React, { Component } from 'react';
import {withRemote} from '../../Utils';
import _ from 'lodash';
import FieldDisplay from '../../primitives/FieldDisplay/FieldDisplay';
import style from './Document.css'
import MdExpandMore from 'react-icons/lib/md/expand-more';
import MdExpandLess from 'react-icons/lib/md/expand-less';

class Document extends Component {
    constructor() {
        super();
        this.state = {
            opened: false
        }
    }
    render() {
        let {remote, doc, show} = this.props;
        if(this.state.opened || (!show || show.length === 0)) {
            show = _.keys(doc);
        }
        
        return (
            <div className={style.document}>
                {show.filter(key => remote.mapping[key]).map(key => <FieldDisplay 
                    short={!this.state.opened} 
                    key={key} 
                    field={key} 
                    shortValue={_.get(doc, ["_highlights_", key])}
                    value={doc[key]}
                    meta={remote.mapping[key]} />)}
                <div style={{textAlign: "center", cursor: "pointer"}}>{!this.state.opened ? 
                    <MdExpandMore onClick={() => this.setState({opened: true})}/> :
                    <MdExpandLess onClick={() => this.setState({opened: false})}/> }</div>
            </div>
        );
    }
}

export default withRemote(Document);