import React, {Component} from 'react';

export interface ButtonProperties {
    name: string;
}

export interface ButtonState {
    /**
     * The counter of the Button.
     */
    counter: number;
}

export class CounterButton extends Component<any, ButtonState> {
    constructor(props: any) {
        super(props);
        this.state = {
            counter: 0
        };
    }

    counter = () => {
        this.setState({
            counter: this.state.counter + 1
        });
    }

    render() {
        return <button className="btn btn-primary my-btn" onClick={this.counter}>{this.state.counter}</button>
    }
}