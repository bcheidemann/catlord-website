import React, { Component } from 'react';

export interface IOutsideClickAlerter {
    cb: (event: MouseEvent) => void;
}

export default class OutsideClickAlerter extends Component<IOutsideClickAlerter> {

    private wrapperRef: React.RefObject<any> = React.createRef();

    public componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    public componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event: MouseEvent) => {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.props.cb(event);
        }
    }

    render() {
        return <div ref={this.wrapperRef}>{this.props.children}</div>;
    }
}