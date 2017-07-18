import React, { Component } from 'react';
import style from './DatasetTypeSelector.css'
import uuid from 'node-uuid';

const DatasetTypes = [
    {
        logo: require('../../../assets/elastic-logo.png'),
        name: "Elasticsearch",
        fields: [
            { "label": "Host", field: "host", type: "URL" },
            { "label": "Port", field: "port", type: "Number" },
            { "label": "Index", field: "index", type: "Text" },
            { "label": "Type", field: "type", type: "Text" },
            { "label": "User", field: "user", type: "Text", advanced: true },
            { "label": "Password", field: "password", type: "Password", advanced: true },
            { "label": "Path", field: "path", type: "Path", advanced: true }
        ]
    },
    {
        logo: require('../../../assets/csv-logo.png'),
        name: "CSV File",
        fields: [
            { "label": "File", key: "server", type: "Text" }
        ]
    }
]

class DatasetTypeSelector extends Component {
    createDataSet = (d) => {
        const { push, match } = this.props;
        const id = uuid.v4();
        push(`${match.url}/${id}`, { type: d })
        console.log("to", `${match.url}/${id}`);
    }

    render() {
        const { goBack } = this.props;
        const { createDataSet } = this;
        return (
            <div>
                <h1>Dataset Type</h1>
                <div className={style.datasetTypeList}>
                    {DatasetTypes.map(d => <div key={d.name} onClick={() => createDataSet(d)} className={style.datasetType}>
                        <img src={d.logo} role="presentation" />
                        <h2>{d.name}</h2>
                    </div>)}
                </div>
                <div className={style.controls}>
                    <button className="secondary" onClick={() => goBack()}>Cancel</button>
                </div>
            </div>
        );
    }
}

export default DatasetTypeSelector;