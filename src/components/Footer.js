import React, { Component } from 'react';
import LinkConnect from './../containers/LinkConnect';
export default class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                显示
                {' '}
                <LinkConnect filter="SHOW_ALL">全部</LinkConnect>
                {' '}
                <LinkConnect filter="SHOW_ACTIVE">未完成</LinkConnect>
                {' '}
                <LinkConnect filter="SHOW_COMPLETED">已完成</LinkConnect>
            </div>
        )
    }
}