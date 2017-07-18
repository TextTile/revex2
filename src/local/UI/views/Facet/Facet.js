import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import {withData} from '../../Utils';
import Visualization from '../Visualization/Visualization';
import {bindActionCreators} from 'redux';
import {changeTermsFilter, toggleFacedVisibility, changeDateFieldFilter} from '../../../store/actions'
import MdExpandLess from 'react-icons/lib/md/expand-less'
import MdExpandMore from 'react-icons/lib/md/expand-more'
import _ from 'lodash';
import {Icon} from 'semantic-ui-react'
import styles from './Facet.css'


const NUM_ROWS = 5;

class Facet extends PureComponent {
    toggleColapse() {
        const {setParams, params} = this.props;
        setParams({colapsed: !params.colapsed})
    }
    render() {
        let {data = [], field, actions, setParams, params, selected} = this.props;
        const {changeTermsFilter, changeDateFieldFilter} = actions;
        
        return (
            <div className={styles.facet}>
                <div className={styles.header}>
                    <h3 onClick={() => this.toggleColapse()} style={{color: params.colapsed ? "#ccc" : "#000" }}>{field.title}</h3>
                    <div className={styles.buttons}>
                        <Icon name="hide" style={{fontSize: "10px"}} onClick={() => actions.toggleFacedVisibility(field.field)} />
                        {params.colapsed ? <MdExpandMore onClick={() => this.toggleColapse()} /> : <MdExpandLess onClick={() => this.toggleColapse()} />}
                    </div> 
                </div>
                <Visualization 
                    data={data} 
                    field={field} 
                    changeDateFieldFilter={changeDateFieldFilter}
                    changeTermsFilter={changeTermsFilter} 
                    dataParams={params} 
                    setParams={setParams} 
                    selected={selected}  />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
       filters: state.filters,
       selected: state.filters[ownProps.field.field],
       search: state.search
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators({changeTermsFilter, toggleFacedVisibility, changeDateFieldFilter},dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    withData(Facet, 
        (props, remote, params) => {
            if(params.colapsed) return false;
            let config = {
                ignoreField: true
            };

            switch (props.field.type) {
                case "Text":
                    config.size = 26;
                    break;
            
                default:
                     if(params.showMore) {
                        config.size = 1000;
                    } else {
                        config.size = NUM_ROWS + 20;
                    }
                    break;
            }

           
            return remote.getDistribution(props.field, props.filters, props.search, config);
        }))