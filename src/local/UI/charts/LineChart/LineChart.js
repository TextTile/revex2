import React, { Component } from 'react';
import _ from 'lodash'
import {scaleLinear} from 'd3-scale'
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment';
import style from './LineChart.css';
import {line} from 'd3-shape';
import {scaleTime} from 'd3-scale';
import LineChartCanvas from './LineChartCanvas';
import ChartLine from './ChartLine';
import Brush from './Brush';
import Axis from './Axis';

const WIDTH = 200;
const HEIGHT = 80

class LineChart extends Component {
     getMetadata = _.memoize((data, selected) => {
         
        let min = _.min(data.map(d => d.count));
        let max = _.max(data.map(d => d.count));
        
        let start =  _.head(data).label;
        let end = _.last(data).label;
        start = moment(start).toDate()
        end = moment(end).toDate()

        let scaleX = scaleTime().domain([start, end]).range([0,WIDTH]);
        let scaleY = scaleLinear().domain([0, max]).range([HEIGHT, 0]);
        

        return { min, scaleX, max, scaleY, maxDate: end, minDate: start }
    })

    render() {
        const {data, selected = {}, field, changeDateFieldFilter} = this.props;
        if(!data || data.length === 0) return <div>No Data</div>
        const {scaleX, scaleY, max, minDate, maxDate} = this.getMetadata(data);


        let start = selected.start || _.head(data).label;
        let end = selected.end || _.last(data).label;
        start = moment(start).toDate()
        end = moment(end).toDate()

        const lineBuilder = line()
            .x((d) => scaleX(moment(d.label).toDate()))
            .y((d) => scaleY(moment(d.count).toDate()))

        return (
            <div>
                <div className={style.selectors}> 
                      <DatePicker 
                            className={style.datePicker}
                            label="Date"
                            value={start}
                            maxDate={end}
                            minDate={minDate}
                            textFieldStyle={{
                                width: '100px',
                                fontSize: '1em'
                            }}
                            onChange={(e,value) => changeDateFieldFilter("start", value, field.field)}
                            hintText="Start Date" />
                        <DatePicker 
                            className={style.datePicker}
                            label="Date"
                            minDate={start}
                            value={end}
                            maxDate={maxDate}
                            textFieldStyle={{
                                width: '100px',
                                fontSize: '1em'
                            }}
                            onChange={(e,value) => changeDateFieldFilter("end", value, field.field)}
                            hintText="End Date" />
                </div>
                <LineChartCanvas width={WIDTH+20} height={HEIGHT+10}>
                    <ChartLine path={lineBuilder(data)} marginLeft={20} />
                    <Brush start={scaleX(start)} end={scaleX(end)} height={HEIGHT} marginLeft={20} />
                    <Axis yMax={max} x={20} height={HEIGHT} width={WIDTH} />
                </LineChartCanvas>
            </div>
        );
    }
}




export default LineChart;