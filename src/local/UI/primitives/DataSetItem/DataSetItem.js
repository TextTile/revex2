import React, { Component } from 'react';
import styles from './DataSetItem.css';

class DataSetItem extends Component {
    render() {
        const {dataset, remove, open, readonly} = this.props;
        
        return (
            <div className={styles.dataSetItem} onClick={() => open(dataset)}>
                <div className={styles.title}>{dataset.config.name}</div>
                <div className={styles.type}>{dataset.type}</div>
                <div className={styles.info}>{dataset.config.info}</div>
                {!readonly && <div className={styles.removeButton} onClick={(e) => {
                    e.stopPropagation();
                    remove(dataset.type, dataset.id)
                }}>Remove</div>}
            </div>
        );
    }
}

export default DataSetItem;