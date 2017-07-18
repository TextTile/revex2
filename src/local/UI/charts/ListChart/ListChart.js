import React, { Component } from "react";
import { scaleSqrt } from "d3-scale";
import _ from "lodash";
import { colors } from "../../Theme";
import style from "./ListChart.css";
import classNames from "classnames/bind";

var cx = classNames.bind(style);
const NUM_ROWS = 5;

class ListChart extends Component {
    getMetadata = _.memoize(data => {
        let min = _.min(data.map(d => d.count));
        let max = _.max(data.map(d => d.count));
        let scale = scaleSqrt().domain([0, max]).range([0, 20]);

        return { min, scale, max };
    });

    render() {
        let { data, field, selected = [], dataParams, changeTermsFilter, setParams } = this.props;
        let { scale } = this.getMetadata(data);

        const hasMore = data.length - NUM_ROWS > 0;
        if (!dataParams.showMore) {
            data = _.take(data, 5);
        }

        const hasScroll = data.length > 10;

        return (
            <div>
                <div className={cx("listChart", { hasScroll })}>
                    <table>
                        <tbody>
                            {data.map(d =>
                                <tr key={d.label}>
                                    <td style={{ width: "20px" }}>
                                        <input
                                            type="checkbox"
                                            checked={selected.indexOf(d.label) > -1}
                                            onChange={e => changeTermsFilter(d.label, field.field, e.target.checked)}
                                        />
                                    </td>
                                    <td>
                                        {d.label}
                                    </td>
                                    <td style={{ width: "20px" }} title={d.count}>
                                        <svg width="20px" height="20px">
                                            <rect width="20px" height="20px" fill="#ccc" />
                                            <rect
                                                x={(20 - scale(d.count)) / 2}
                                                y={(20 - scale(d.count)) / 2}
                                                width={`${scale(d.count)}px`}
                                                height={`${scale(d.count)}px`}
                                                fill={colors.main}
                                            />
                                        </svg>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {hasMore &&
                    <div className={style.more}>
                        {!dataParams.showMore &&
                            <a
                                onClick={e => {
                                    e.preventDefault();
                                    setParams({ showMore: true });
                                }}
                                href="#">
                                More
                            </a>}
                        {dataParams.showMore &&
                            <a
                                onClick={e => {
                                    e.preventDefault();
                                    setParams({ showMore: false });
                                }}
                                href="#">
                                Less
                            </a>}
                    </div>}
            </div>
        );
    }
}

export default ListChart;

/*




*/
