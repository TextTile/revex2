import React, {Component} from 'react';
import DocumentsPanel from '../penels/DocumentsPanel';
import SearchPanel from '../penels/SearchPanel';
import VisualizationsPanel from '../penels/VisualizationsPanel';
import {connect} from 'react-redux'
import styles from './Home.css'
import {Loader} from 'semantic-ui-react';
import {textFieldsSelector, structuredFieldsSelector} from '../../store/selectors'

class Home extends Component {
    render() {
        const {dataSource, textFields, structuredFields} = this.props;
        if(!dataSource) {
            return <Loader active size='medium'>Loading</Loader>
        }
        
        return (
            <div className={styles.main}>
               
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        dataSource: state.dataSource,
        textFields: textFieldsSelector(state),
        structuredFields: structuredFieldsSelector(state)
    }
}

export default connect(mapStateToProps)(Home);
