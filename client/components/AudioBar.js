import React, { Component } from 'react';

export default class AudioViz extends Component {
  constructor() {
    super();
    this.state = {
      backgroundColor: 'black',
      height: '20px',
      position: 'relative',

      borderRadius: '5px',
    };
    this.barLength = 0;
    this.updateRate = 10;
  }

  componentDidMount() {
    // update bars based ont the update rate
    this.updateInterval = setInterval(this.setStyling, this.updateRate);
  }

  componentWillUnmount() {
    // remove interval
    clearInterval(this.updateInterval);
  }

  // convert color to CSS rgb value
  rgb = (r, g, b) => {
    r = Math.floor(r);
    g = Math.floor(g);
    b = Math.floor(b);
    return ['rgb(', r, ',', g, ',', b, ')'].join('');
  };

  setStyling = () => {
    // grab the length of the bar based on window width
    let baseBarLength = window.innerWidth / 5;
    const { pitch, idx } = this.props;
    let smoothing = (pitch * baseBarLength - this.barLength) / this.updateRate;
    this.barLength += smoothing;
    // pick the color based on the length of the bar
    let r = pitch >= 0.7 ? 255 : 200 + pitch * 100;
    let g = pitch <= 0 ? 255 : 255 - pitch * 60;
    let b =
      pitch >= 1
        ? 255
        : pitch >= 0.7
        ? 190 + (pitch - 0.5) * 120
        : 220 - pitch * 60;
    this.setState({
      top: 5 * idx + 'px',
      width: this.barLength + 'px',
      backgroundColor: this.rgb(r, g, b),
      left: -this.barLength / 2,
    });
  };

  render() {
    return <div style={this.state} />;
  }
}
