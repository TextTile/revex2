import React, { PureComponent } from 'react';
import {withRemote} from '../../Utils';
import {selectors} from '../../../store/selectors'
import {connect} from 'react-redux';
import Facet from '../Facet/Facet'
import _ from 'lodash';
import style from './FieldList.css';

class FieldList extends PureComponent {
    render() {
        const {fields, hiddenFacets} = this.props;
        
        return (
            <div className={style.fieldList}>
                {_.take(fields.filter(f => !_.includes(hiddenFacets, f.field)) ,100).map(field => <Facet key={field.field} field={field} />)}
            </div>
        );
    }
}

const mapStateToProps = (state, {remote, type}) => {
    const {
        selectTextFields, 
        selectStructuredFields
    } = selectors(state, remote);
    
    return {
        fields: type === "Text" ? selectTextFields() : selectStructuredFields(),
        hiddenFacets: state.hiddenFacets
    }
}
export default withRemote(connect(mapStateToProps)(FieldList));