import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select, Input } from 'antd';

class SelectInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: `${this.props.value.is_show || 0}`,
      value: this.props.value.show_value,
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleinput = this.handleinput.bind(this);
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        selected: `${nextProps.value.is_show || 0}`,
        value: nextProps.value.show_value,
      });
    }
    return true;
  }
  handleSelect(v) {
    this.setState({
      selected: v,
      value: v === '0' ? this.state.value : '',
    });
    this.props.onChange({
      is_show: v,
      show_value: this.state.value,
    });
  }
  handleinput(e) {
    this.setState({ value: e.target.value });
    this.props.onChange({
      is_show: this.state.selected,
      show_value: e.target.value,
    });
  }
  render() {
    return (
      <Input
        {...this.props}
        addonBefore={
          <Select
            value={this.state.selected}
            onChange={this.handleSelect}
          >
            <Select.Option key={1}>是</Select.Option>
            <Select.Option key={0}>否</Select.Option>
          </Select>
        }
        disabled={this.state.selected === '0'}
        value={this.state.value}
        onChange={this.handleinput}
      />
    );
  }
}
SelectInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.shape().isRequired,
};

export default SelectInput;
