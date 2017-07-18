import React, { Component } from 'react';
import style from './DatasetEdit.css';
import Field from '../../primitives/Field/Field'
import remote from '../../../../remote'

class DatasetEdit extends Component {
    constructor() {
        super();
        this.state = {
            showAdvanced: false,
            config:{}
        };
    }
    componentDidMount() {
        this.componentWillReceiveProps(this.props);
    }
    
    componentWillReceiveProps(nextProps) {
        if(!nextProps.location.state) {
            nextProps.push("/")
        }
    }

    getField = (field, addProps) => {
        return <Field 
            key={field.field} 
            labelWidth="100px" 
            width="400px" 
            value={this.state.config[field.field] || ""}
            onChange={(value) => this.changeValue(field.field, value)}
            field={field}
            {...addProps} />
    }

    save = () => {
        let {config} = this.state;
        config.useAdvanced = this.state.showAdvanced;
        const type = this.props.location.state.type;
        remote.saveDataset({id: this.props.match.params.id, type:type.name, config: this.state.config}).then(result => {
            this.props.push("/");
        });
    }

    test = () => {
        const type = this.props.location.state.type;
        remote.test({type:type.name, config: this.state.config});
    }

    changeValue = (field, value) =>  {
        let config = this.state.config;
        config = {...config, [field]: value};
        this.setState({config});
    }

    render() {
        if(!this.props.location.state) {
            return <div className={style.datasetEdit}></div>
        }
        const type = this.props.location.state.type;
        const {push} = this.props
        
        return (
            <div className={style.datasetEdit}>
                <h1>Dataset Configuration</h1>
                <div style={{marginBottom: "15px"}}>
                    {this.getField({"label": "Name", field: "name", type: "Text"}, {bold: true})}
                </div>
                <div>
                    {type.fields.filter(f => !f.advanced).map(this.getField)}
                </div>
                <h3 style={{ cursor: "pointer", color: "#006CAB", textDecoration: "underline" }} 
                    onClick={() => this.setState({showAdvanced: !this.state.showAdvanced})}>
                    Advanced {this.state.showAdvanced ? "<" : ">"}
                </h3>
                <div className={style.advanced} style={{display: this.state.showAdvanced ? "block" : "none"}}>
                    {type.fields.filter(f => f.advanced).map(this.getField)}
                </div>
                <div className={style.controls}>
                    {type.testable && <button className="neutral" onClick={() => this.test()}>Test</button>}
                    <button className="secondary button" onClick={() => push("/")}>Cancel</button>
                    <button className="button" onClick={() => this.save()}>Save</button>
                </div>
            </div>
        );
    }
}

export default DatasetEdit;