import React from 'react';
import _ from 'underscore';
import  "./styles/Checkbox.css";
import $ from 'jquery';
class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isControlled: _.has(props, 'checked'),
      checked: this.props.checked || this.props.defaultChecked
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.setChecked = this.setChecked.bind(this);
    this.getChecked = this.getChecked.bind(this);
  }
  componentWillReceiveProps(props) {
    this.state.isControlled && this.setChecked(props.checked);
  }
  onChangeHandler(event) {
    if (!this.state.isControlled) {
      this.setChecked(event.target.checked);
    }
    this.props.onChange && this.props.onChange(event);
  }
  setChecked(isChecked) {
    $(this.refs.input).prop("checked", isChecked);
    this.setState({
      checked: isChecked
    });
  }
  getChecked() {
    return this.state.checked || false;
  }
  render() {
    const { className, onChange, disabled, ...props } = this.props;
    return (
      <div ref="cbx" className={"cbx " + (this.state.checked ? "checked " : "") + (disabled ? "disabled " : "") + (className || "")}>
        <input type="checkbox"
          ref="input"
          onClick={this.clickHandler}
          onChange={this.onChangeHandler}
          disabled={disabled}
          {...props} />
      </div>
    )
  }
}
export default Checkbox;
