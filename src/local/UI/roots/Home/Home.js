import React, { Component } from "react";
import remote from "../../../../remote";
import _ from "lodash";
import style from "./Home.css";
import SideBar from "../../views/SideBar/SideBar";
import MainView from "../../views/MainView/MainView";
import FieldList from "../../views/FieldList/FieldList";
import TopBar from "../../views/TopBar/TopBar";
import { Loader } from "semantic-ui-react";
import { setSnippetVisibility, setFacedVisibility } from "../../../store/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Home extends Component {
    constructor() {
        super();
        this.state = {};
    }
    getChildContext() {
        return { remote: this.state.remote };
    }

    componentDidMount() {
        this.componentWillReceiveProps(this.props);
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.location || !nextProps.location.state) {
            this.props.push("/");
        } else if (this.config !== nextProps.location.state) {
            this.config = nextProps.location.state;
            remote.newInstance(this.config).then(instance => {
                if (this._isMounted) {
                    this.setState({ remote: instance });

                    //Get Snippet fields
                    let textFields;
                    if (!this.config.snippetsFields) {
                        textFields = _.values(instance.mapping).filter(value => value.type === "Text" && value.avg > 0);
                        textFields = _.take(_.orderBy(textFields, d => d.avg, "desc"), 2);
                        textFields = _.sortBy(textFields, d => d.avg);
                        nextProps.setSnippetVisibility(textFields.map(d => d.field));
                    } else {
                        nextProps.setSnippetVisibility(this.config.snippetsFields);
                    }

                    nextProps.setFacedVisibility(this.config.hiddenFacets);
                }
            });
        }
    }

    render() {
        if (!this.state.remote) return <Loader active />;
        return (
            <div className={style.main}>
                <TopBar />
                <div className={style.content}>
                    <SideBar>
                        <FieldList />
                    </SideBar>
                    <MainView />
                    <SideBar style={{ minWidth: "300px" }}>
                        <FieldList type="Text" />
                    </SideBar>
                </div>
            </div>
        );
    }
}

Home.childContextTypes = {
    remote: React.PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({ setSnippetVisibility, setFacedVisibility }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
