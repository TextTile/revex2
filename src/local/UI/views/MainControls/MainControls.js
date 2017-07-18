import React, { Component } from 'react';
import _ from 'lodash'
import { Dropdown } from 'semantic-ui-react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router'

import {resetFilters, toggleFacedVisibility} from '../../../store/actions'
import {withRemote} from '../../Utils'

import MdReplay from 'react-icons/lib/md/replay';
import MdArrowBack from 'react-icons/lib/md/arrow-back';
import MdMenu from 'react-icons/lib/md/menu';

import style from './MainControls.css'

class MainControls extends Component {
    render() {
        const {resetFilters, hiddenFacets = [], toggleFacedVisibility} = this.props;
        const fields = _.keys(this.props.remote.mapping).map(key => this.props.remote.mapping[key]);
        return (
            <div className={style.main} style={this.props.style} >
                 <Dropdown pointing='top left' icon={null} trigger={<MdMenu size="20px" className={style.button} />}>
                    <Dropdown.Menu>
                        <Dropdown item text='Show/Hide Facets' pointing="left" scrolling>
                            <Dropdown.Menu>
                                {fields.map(field => <Dropdown.Item 
                                    onClick={() => toggleFacedVisibility(field.field)} 
                                    key={field.field} 
                                    style={{color: hiddenFacets.indexOf(field.field) > -1 ? "#ccc" : "#000"}}
                                    icon={hiddenFacets.indexOf(field.field) > -1 ? "hide" : "unhide"}  
                                    text={field.title} /> )}
                                
                            </Dropdown.Menu>
                        </Dropdown>
                    </Dropdown.Menu>
                    
                </Dropdown>
                <MdArrowBack size="20px" className={style.button} onClick={() => this.props.push("/")} />
                <MdReplay size="20px" className={style.button} onClick={() => resetFilters()} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({resetFilters, toggleFacedVisibility}, dispatch),
});

const mapStateToProps = (state, ownProps) => ({
    hiddenFacets: state.hiddenFacets
})

export default withRemote(withRouter(connect(mapStateToProps, mapDispatchToProps)(MainControls)))
