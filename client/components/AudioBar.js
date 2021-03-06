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
    this.updateInterval = setInterval(this.setStylingWithColorScheme, this.updateRate);
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

  parseRgbString = (str) => {
    if (!str || str === 'black') {
      return [0,0,0]
    }
    let [r,g,b] = str.split(',')
    r = r.slice(4)
    b = b.slice(0,b.length-1)
    return [r,g,b]
  }

  setStylingWithColorScheme = () => {
        // grab the length of the bar based on window width
    let baseBarLength = window.innerWidth / 5;
    const { pitch, idx } = this.props;
    let smoothing = (pitch * baseBarLength - this.barLength) / this.updateRate;
    this.barLength += smoothing;
    // get RGB values from the passed string
    let firstColor, secondColor
    if (this.props.audioVizColors) {
      firstColor = this.parseRgbString(this.props.audioVizColors[0])
      secondColor = this.parseRgbString(this.props.audioVizColors[1])
    }

    // calculate deltas
    let deltas = []
    for (let i=0; i<3; i++) {
      firstColor[i] = Number(firstColor[i])
      secondColor[i] = Number(secondColor[i])
      deltas.push(firstColor[i] - secondColor[i])
    }

    // make new RGB values
    let barColor = []
    for (let i=0; i<3; i++) {
      barColor.push(secondColor[i] + (deltas[i]*pitch))
    }
    this.setState({
      top: 5 * idx + 'px',
      width: this.barLength + 'px',
      backgroundColor: this.rgb(...barColor),
      left: -this.barLength / 2,
    });
  }

  render() {
    return <div style={this.state} />;
  }
}
