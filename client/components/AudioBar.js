import React, {Component} from "react"

export default class AudioViz extends Component {
    constructor(props) {
        super()
        this.state = {
            backgroundColor: "black",
            height: "30px",
            position: "relative",
            left: "-5px",
            borderRadius: "5px",
            smoothing: (props.pitch*100)/10,
        }
    }

    componentDidMount() {
        this.updateInterval = setInterval(this.setStyling,15)
    }

    componentWillUnmount() {
        clearInterval(this.updateInterval)
    }

    rgb = (r, g, b) => {
        r = Math.floor(r);
        g = Math.floor(g);
        b = Math.floor(b);
        return ["rgb(",r,",",g,",",b,")"].join("");
    }
    
    setStyling = () => {
        const {pitch,idx} = this.props
        let barLength = pitch*100+5 - this.state.smoothing
        // let r = pitch >= 0.5 ? 255 : 200+pitch*100
        // let g = pitch <= 0 ? 255 : 255 - pitch*60
        // let b = pitch >= 1 ? 255 : pitch >= 0.5 ? 190 + (pitch-0.5)*120 : 220 - pitch*60
        let shade = 200 - pitch*30
        this.setState({
            top: 3*idx + "px",
            width: barLength + "px",
            backgroundColor: this.rgb(shade,shade,shade)
        })
    }

    render() {
        return(
            <div style={this.state}></div>
        )
    }
}