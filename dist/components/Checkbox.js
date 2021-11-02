"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _underscore = _interopRequireDefault(require("underscore"));

require("./styles/Checkbox.css");

var _jquery = _interopRequireDefault(require("jquery"));

const _excluded = ["className", "onChange", "disabled"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

class Checkbox extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      isControlled: _underscore.default.has(props, 'checked'),
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
    (0, _jquery.default)(this.refs.input).prop("checked", isChecked);
    this.setState({
      checked: isChecked
    });
  }

  getChecked() {
    return this.state.checked || false;
  }

  render() {
    const _this$props = this.props,
          {
      className,
      onChange,
      disabled
    } = _this$props,
          props = _objectWithoutProperties(_this$props, _excluded);

    return /*#__PURE__*/_react.default.createElement("div", {
      ref: "cbx",
      className: "cbx " + (this.state.checked ? "checked " : "") + (disabled ? "disabled " : "") + (className || "")
    }, /*#__PURE__*/_react.default.createElement("input", _extends({
      type: "checkbox",
      ref: "input",
      onClick: this.clickHandler,
      onChange: this.onChangeHandler,
      disabled: disabled
    }, props)));
  }

}

var _default = Checkbox;
exports.default = _default;