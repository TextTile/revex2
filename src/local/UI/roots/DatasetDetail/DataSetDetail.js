import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import DatasetTypeSelector from '../../views/DatasetTypeSelector/DatasetTypeSelector'
import DatasetEdit from '../../views/DatasetEdit/DatasetEdit'
import style from './DataSetDetail.css';

class DataSetDetail extends Component {
    render() {
        const {match} = this.props;
       
        return (
            <div className={style.dataSetDetail}>
                <Route exact path={match.url} component={DatasetTypeSelector}/>
                <Route path={`${match.url}/:id`} component={DatasetEdit}/>
            </div>
        );
    }
}

export default DataSetDetail;