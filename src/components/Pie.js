import React from 'react';
import * as d3 from 'd3';
import Slice from './Slice';

class Pie extends React.Component {

  constructor(props) {
    super(props);
    this.colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    this.renderSlice = this.renderSlice.bind(this);
  }

  render() {
    let {x, y, data} = this.props;
    let pie = d3.pie().sort(null);

    var total = 0;
    data && data.map(item => total+=item);
    let showTotal = this.props.showTotal;

    return (

      <g transform={`translate(${x}, ${y})`}>
        {showTotal && total > 0 && <text textAnchor="middle" transform="translate(0, 0)" fill="gray" fontWeight="bold" fontSize="24">{total}</text>}
        {showTotal && total > 0 && <text textAnchor="middle" transform="translate(0, 17)" fill="#bebebe">total</text>}
        {/* Render a slice for each data point */}
        {data && pie(data).map(this.renderSlice)}
      </g>
    );
  }

  renderSlice(value, i) {
    //let colors = this.colorScale(i);
    //let colors = d3.scaleQuantize().domain([0,5]).range(["#ea347c", "#f390b8"]);
    //let colors = d3.scaleLinear().domain(d3.ticks(0, 50, 11)).range([this.props.fill]);
    let colors = this.props.fillType === 'range' ? d3.scaleLinear().domain(d3.ticks(0, this.props.data.length, 2)).range(this.props.fill) : this.props.fill;
    let {innerRadius, outerRadius, cornerRadius, padAngle, showLegend, kindOfLabelsOnSlices, showLabelsOnSlices} = this.props;
    return (
      <Slice key={i}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        cornerRadius={cornerRadius}
        padAngle={padAngle}
        value={value}
        label={kindOfLabelsOnSlices === 'labels' ? this.props.labels[i] : value.data}
        legend={this.props.labels[i]}
        fill={this.props.fillType === 'range' ? colors(i) : colors[i]}
        showLegend={showLegend}
        kindOfLabelsOnSlices={kindOfLabelsOnSlices}
        showLabelsOnSlices={showLabelsOnSlices}
        onClickFilter={this.props.onClickFilter && this.props.onClickFilter[i]}
        handleOnClick={this.props.handleOnClick}
        className={this.props.handleOnClick ? "clickable" : ""}
      />
    );
  }
}

export default Pie;
