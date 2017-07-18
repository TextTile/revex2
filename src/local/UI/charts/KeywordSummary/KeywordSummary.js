import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import _ from 'lodash';

import style from './KeywordSummary.css';

class KeywordSummary extends Component {
    getMetadata = _.memoize((data) => {
        let min = _.min(data.map(d => d.count));
        let max = _.max(data.map(d => d.count));
        let scale = scaleLinear().domain([0, max]).range([0, 100]);

        return { min, scale, max }
    })

    render() {
        const { data, changeTermsFilter, field } = this.props;
        let { scale } = this.getMetadata(data);
        
        return (
            <div className={style.keywordSummary}>
                 {data.map(d => <div className={style.word} key={d.label} onClick={(e) => changeTermsFilter(d.label, field.field,  true)}>
                    <div className={style.bar} onClick={(e) => changeTermsFilter(d.label, field.field,  true)} style={{width: `${scale(d.count)}%`}}></div>
                    {d.label}
                </div>)}
            </div>
        );
    }
}

export default KeywordSummary;


/*




*/

