import React, { PureComponent } from 'react';
import ListChart from '../../charts/ListChart/ListChart';
import KeywordSummary from '../../charts/KeywordSummary/KeywordSummary'
import LineChart from '../../charts/LineChart/LineChart'
import style from './Visualization.css'
import _ from 'lodash';


class Visualization extends PureComponent {
    renderChart() {
        const {data, field} = this.props;
        
        if(!data) return <div>Loading</div>
        switch (field.type) {
            case "Text":
                return <KeywordSummary {...this.props} />
            
            case "Date":
                return <LineChart {...this.props} />
        
            default:
                return <ListChart {...this.props} />
        }
        
    }
    render() {
        return (
            <div className={style.visualization}>
                {this.renderChart()}
            </div>
        );
    }
}

export default Visualization;