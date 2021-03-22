import React from 'react';
import * as d3 from 'd3';
//import {getStudentsByFilter} from './fetch';

class Slice extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
      active: false,
    };
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    //this.onClick = this.onClick.bind(this);
  }

  onMouseOver() {
    this.setState({isHovered: true});
  }

  onMouseOut() {
    this.setState({isHovered: false});
  }

  /*
  onClick() {
    let self = this;
    //let filter = JSON.stringify(this.props.onClickFilter);
    let filter = this.props.onClickFilter;
    //console.log(filter);
    this.setState(prevState => ({
      active: !prevState.active,
    }));
    return getStudentsByFilter(filter)
      .then(response => {
        self.setState({
          students: response.data.studentsByFilter,
        });
      });
  }
  */

  render() {
    let {value, label, legend, fill, innerRadius = 0, outerRadius, cornerRadius, padAngle, showLegend, showLabelsOnSlices, kindOfLabelsOnSlices, ...props} = this.props;
    if (this.state.isHovered || this.state.active) {
      outerRadius *= 1.1;
    }
    let arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .cornerRadius(cornerRadius)
      .padAngle(padAngle);

    var hovered = false;
    if (this.state.isHovered) {
      hovered = true;
    }

    return (
      <g onMouseOver={this.onMouseOver}
         onMouseOut={this.onMouseOut}
         onClick={() => this.props.handleOnClick(this.props.onClickFilter)}
         {...props} >

        {this.state.active &&
          <foreignObject className="node" x="46" y="22" width="200" height="300">
            <div className="on-click-students-list">
              {this.state.students && this.state.students.map(s => (
                <p>{s.firstName}</p>
              ))}
            </div>
          </foreignObject>
        }

        <path d={arc(value)} fill={fill} />
        {showLabelsOnSlices && <text transform={`translate(${arc.centroid(value)})`}
              dy=".35em"
              textAnchor="middle"
              fill="white">
          {label === 0 ? "" : label}
        </text>}
        {showLegend && <text transform={"translate(" + 110 + ", " + ((value.index * 35) -80 ) + ")"} fill={fill}>◼</text>}
        {showLegend && <text fontWeight={hovered ? "bold" : "normal"} transform={"translate(" + 130 + ", " + ((value.index * 35) -80 ) + ")"} fill='#444'>{legend.split("$")[0]}</text>}
        {showLegend && <text fontWeight={hovered ? "bold" : "normal"} fontSize="12" transform={"translate(" + 130 + ", " + ((value.index * 35) -65 ) + ")"} fill='#777'>{legend.split("$")[1]}</text>}
      </g>
    );
  }
}

export default Slice;
