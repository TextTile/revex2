import React, { Component } from 'react';
import DocumentList from '../DocumentList/DocumentList'
import {Dropdown} from 'semantic-ui-react'
import style from './MainView.css'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withRemote} from '../../Utils'
import {toggleSnippetVisibility} from '../../../store/actions'
import _ from 'lodash';

class MainView extends Component {
    render() {
        const {snippetsFields, toggleSnippetVisibility} = this.props;
        const fields = _.values(this.props.remote.mapping);
        return (
            <div className={style.mainView}>
                <div className={style.header}>
                    <h3>Documents</h3>
                    <div>

                        <Dropdown pointing='top right' scrolling text="Show/Hide Fields" className={style.dropDown}>
                            <Dropdown.Menu>
                                {fields.map(field => <Dropdown.Item 
                                    onClick={() => toggleSnippetVisibility(field.field)} 
                                    key={field.field} 
                                    style={{color: snippetsFields.indexOf(field.field) === -1 ? "#ccc" : "#000"}}
                                    icon={snippetsFields.indexOf(field.field) === -1 ? "hide" : "unhide"}  
                                    text={field.title} /> )}
                                
                            </Dropdown.Menu>
                        </Dropdown>




                    </div>
                </div>
                <div className={style.content}>
                    <DocumentList />
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        snippetsFields: state.snippetsFields,

    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({toggleSnippetVisibility}, dispatch),
});

export default withRemote(connect(mapStateToProps, mapDispatchToProps)(MainView))
