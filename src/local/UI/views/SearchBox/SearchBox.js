import React, { PureComponent } from 'react';
import style from './SearchBox.css'
import MdSearch from 'react-icons/lib/md/search';
//import { Dropdown } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {doSearch} from '../../../store/actions';
class SearchBox extends PureComponent {
    constructor() {
        super();
        this.state = {
            query: ""
        }
    }
    doSearch = (value) => {
        const {doSearch} = this.props;
        doSearch(value);
        console.log("User typed", value);
    }

    componentDidMount() {
        this.componentWillReceiveProps(this.props);
    }
    

    componentWillReceiveProps(nextProps) {
        this.setState({
            query: nextProps.search.query
        })
    }
    
    render() {
        const {query} = this.state;

        return (
            <div className={style.searchBox}>
                <MdSearch size="15px" />
                <input 
                    style={{marginLeft: '-13px', width: '400px', paddingLeft: '15px'}} 
                    placeholder="Search" 
                    value={query} 
                    onChange={(e) => this.setState({query: e.target.value})}
                    onKeyPress={(e) => e.key === "Enter" && this.doSearch(query)} />
                {/*<div style={{maxWidth:"200px", overflowX: "visible"}}><Dropdown options={options} className={style.dropdown}   basic placeholder="All Fields" floating={false} /></div>*/}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { search: state.search }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({doSearch}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox)


/*
const options = [
  { key: 'angular', text: 'Angular', value: 'angular' },
  { key: 'css', text: 'CSS', value: 'css' },
  { key: 'design', text: 'Graphic Design', value: 'design' },
  { key: 'ember', text: 'Ember', value: 'ember' },
  { key: 'html', text: 'HTML', value: 'html' },
  { key: 'ia', text: 'Information Architecture', value: 'ia' },
  { key: 'javascript', text: 'Javascript', value: 'javascript' },
  { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
  { key: 'meteor', text: 'Meteor', value: 'meteor' },
  { key: 'node', text: 'NodeJS', value: 'node' },
  { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
  { key: 'python', text: 'Python', value: 'python' },
  { key: 'rails', text: 'Rails', value: 'rails' },
  { key: 'react', text: 'React', value: 'react' },
  { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
  { key: 'ruby', text: 'Ruby', value: 'ruby' },
  { key: 'ui', text: 'UI Design', value: 'ui' },
  { key: 'ux', text: 'User Experience', value: 'ux' },
]*/

