import React, { Component } from 'react';
import {connect} from 'react-redux'
import {withData} from '../../Utils';
import Document from '../Document/Document';
import style from './DocumentList.css'
import _ from 'lodash'
class DocumentList extends Component {
    render() {
        const {loading, data = [], snippetsFields} = this.props;
        
        if(loading) return <div>Loading...</div>
        
        
        return (
            <div className={style.documentList}>
                {data.map(d =>  <Document key={d._id} doc={d} show={snippetsFields} />)}
            </div>
        );
    }
}



const mapStateToProps = (state, ownProps) => {
    return {
       filters: state.filters,
       search: state.search,
       snippetsFields: state.snippetsFields
    }
}

export default connect(mapStateToProps)(
    withData(DocumentList, 
        (props, remote, params) => {
            let config = { size: 200 }
            const {search, filters} = props;

            return remote.getDocuments(filters, search, config);
        }))
