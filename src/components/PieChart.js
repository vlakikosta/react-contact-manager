import React from 'react';
import Pie from './Pie';

class PieChart extends React.Component {

  render() {
    //let width = window.innerWidth;
    let width = this.props.width;
    //let height = window.innerHeight;
    let height = this.props.height;
    let minViewportSize = Math.min(width, height);
    let radius = this.props.radius || (minViewportSize * 0.9) / 2;
    //let x = width / 2;
    let x = this.props.x || height / 2;
    let y = this.props.y || height / 2;
    let innerRadius = this.props.innerRadius || radius * 0.5;
    let showLegend = this.props.showLegend != undefined ? this.props.showLegend : true;
    let kindOfLabelsOnSlices = this.props.kindOfLabelsOnSlices || "data"; // Kind can be "data" or "labels"
    let showLabelsOnSlices = this.props.showLabelsOnSlices != undefined ? this.props.showLabelsOnSlices : true;
    let showTotal = this.props.showTotal != undefined ? this.props.showTotal : true;
    let fill = this.props.fill || ["#f390b8", "#ea347c"];
    let fillType = this.props.fillType || 'specific'; // Type can be 'range' or 'specific'
    let onClickFilter = this.props.onClickFilter || null;

    return (
      <svg width={width} height={height}>
        <Pie
          x={x}
          y={y}
          innerRadius={innerRadius}
          outerRadius={radius}
          cornerRadius={0}
          padAngle={0.02}
          data={this.props.data}
          labels={this.props.labels}
          showLegend={showLegend}
          kindOfLabelsOnSlices={kindOfLabelsOnSlices}
          showLabelsOnSlices={showLabelsOnSlices}
          showTotal={showTotal}
          fill = {fill}
          fillType = {fillType}
          onClickFilter = {onClickFilter}
          handleOnClick={this.props.handleOnClick}
        />
      </svg>
    );
  }
}

export default PieChart;
