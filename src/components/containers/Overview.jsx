import React, {Component} from "react";
import ReactDOM from "react-dom";

class Overview extends Component {
    constructor() {
        super();
        this.state = {
            title: "Overview"
        };
    }
    render() {
        return (
           <div>Title: {this.state.title}</div>
        );
    }
}

export default Overview;

ReactDOM.render(<Overview />, document.getElementById("overview"));