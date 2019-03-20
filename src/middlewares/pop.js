import React from 'react';
import { render } from 'react-dom';

let changeStatus;
const defaultDuration = 2000;

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      types: 0,
      open: false,
      duration: defaultDuration,
    };
  }
  componentDidMount() {
    changeStatus = (message, types, duration) => {
      this.setState({
        message,
        types,
        duration,
        open: true,
      });
    };
  }
  render() {
    return <div> empty </div>;
  }
}

function initComponent() {
  const ele = document.createElement('div');
  document.body.appendChild(ele);
  render(<Component />, ele);
}
initComponent();

export default (title, types = 0, duration = 2000) => {
  changeStatus(title, types, duration);
};
