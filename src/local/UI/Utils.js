import React, {PureComponent} from 'react';
import _ from 'lodash';

export function withRemote(Component) {
    const Remote = (props, context) => <Component {...props} remote={context.remote} />
    Remote.contextTypes = {
        remote: React.PropTypes.object
    };

    return Remote;
}

export function withData(Component, query, should = () => true) {
    class DataComponent extends PureComponent {
        constructor() {
            super();
            this.state = {
                params: {}
            }
        }
        
        componentWillMount() {
            this.updateData(this.props);
        }

        componentDidMount() {
            this._isMounted = true;
        }

        componentWillUnmount() {
            this._isMounted = false;
        }


        componentWillReceiveProps(nextProps) {
            this.updateData(nextProps);
        }

        setParams = (params) => {
            let currentParams = this.state.params;
            params = {...currentParams, ...params }
            if(this._isMounted)
                this.setState({
                    params: params
                }, () => {
                    this.updateData(this.props);
                })
        }

        removeParams = (params) => {
            params = _.omit(this.state.params, _.keys(params));
            if(this._isMounted)
                this.setState({
                    params: params
                })
        }

        resetParams = () => {
            if(this._isMounted)
                this.setState({
                    params: {}
                })
        }

        updateData(props) {
            if(should(this.props, props)) {
                if(this._isMounted)
                    this.setState({loading: true});
                    let promise = query(props, props.remote, this.state.params);
                    if(promise) {
                        promise.then(result => {
                            if(this._isMounted)
                                this.setState({
                                    data: result,
                                    loading: false
                                })
                        })
                    } else {
                        if(this._isMounted)
                            this.setState({
                                data: [],
                                loading: false
                            })
                    }
            }
        }
        
        render() {
            const props = this.props;
            return <Component {...props} 
                data={this.state.data} 
                setParams={this.setParams} 
                removeParams={this.removeParams}
                resetParams={this.resetParams}
                params={this.state.params}
                loading={this.state.loading} />;
        }
    }
    
    return withRemote(DataComponent);
}