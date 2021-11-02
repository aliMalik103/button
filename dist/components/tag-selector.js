"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.string.trim.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.string.search.js");

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _underscore = _interopRequireDefault(require("underscore"));

var _Checkbox = _interopRequireDefault(require("./Checkbox.js"));

var _tagContainer = _interopRequireDefault(require("./tag-container"));

require("./styles/tag-selector.css");

const _excluded = ["placeholder", "className"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

class TagSelector extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: props.data || [],
      selectedData: [],
      search: ""
    };
    this.onKeyDown = this.onKeyDown.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }

  componentWillReceiveProps(props) {
    if (!_underscore.default.isEqual(props.data, this.props.data)) {
      this.setState({
        options: props.data || [],
        search: ""
      });
    }

    if (!_underscore.default.isEqual(props.selectedData, this.props.selectedData)) {
      this.setState({
        options: props.data || [],
        search: "",
        selectedData: props.selectedData || []
      });
    }
  }

  updateSelectedData(selectedData) {
    var uniqueData = _underscore.default.uniq(selectedData);

    this.setState({
      selectedData: uniqueData
    });
  }

  componentDidMount() {
    window.addEventListener('click', this.handleDocumentClick);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleDocumentClick);
  }

  handleDocumentClick(event) {
    if (this.selector != null) {
      const area = _reactDom.default.findDOMNode(this.selector);

      if (!area.contains(event.target)) {
        this.changeDropDownState(false);
      }
    } //if click outside the select

  }

  isChecked(object) {
    return _underscore.default.some(this.state.selectedData, item => item.id == object.id);
  }

  toggleTag(item) {
    if (this.isChecked(item)) {
      this.deleteTag(item.id);
    } else {
      this.addTag(item);
    }
  }

  addTag(item) {
    var selectedData = this.state.selectedData.concat(item);
    this.updateSelectedData(selectedData);
    this.props.onChange && this.props.onChange(selectedData);
  }

  deleteTag(id) {
    var selectedData = _underscore.default.reject(this.state.selectedData, item => item.id == id);

    this.updateSelectedData(selectedData);
    this.props.onChange && this.props.onChange(selectedData);
  }

  onKeyDown(event) {
    const highlighted = this.state.highlighted;
    const options = this.state.options;

    switch (event.keyCode) {
      case 27:
        //esc
        event.preventDefault();
        this.changeDropDownState(false);
        break;

      case 13:
        //enter
        event.preventDefault();

        if (highlighted < options.length) {
          this.addTag(options[highlighted]);
          this.changeDropDownState(false);
        }

        break;

      case 38:
        //up
        event.preventDefault();
        this.highlight(Math.max(highlighted - 1, 0));
        break;

      case 40:
        //down
        event.preventDefault();
        let maxInd = Math.max(options.length - 1, 0);
        this.highlight(Math.min(highlighted + 1, maxInd));
        break;
    }
  }

  filterOptions(value) {
    var lowerSearch = value.toLowerCase().replace(/\s{2,}/g, ' ').trim();
    this.setState({
      search: value,
      highlighted: 0,
      options: lowerSearch ? _underscore.default.filter(this.props.data, item => item.text.toLowerCase().replace(/\s{2,}/g, ' ').trim().includes(lowerSearch)) : null
    });
  }

  changeDropDownState(value) {
    this.setState({
      dropDownIsOpened: value
    });
  }

  toggleDropDownState() {
    this.changeDropDownState(!this.state.dropDownIsOpened);
  }

  highlight(index) {
    this.setState({
      highlighted: index
    });
  }

  inputChangeHandler(event) {
    this.filterOptions(event.target.value);
    this.changeDropDownState(true);
  }

  renderOption(data) {
    var isChecked = this.isChecked(data);
    return /*#__PURE__*/_react.default.createElement("label", {
      "data-id": data.id
    }, /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
      checked: isChecked
    }), data.text);
  }

  renderOptions() {
    let options = this.state.options || this.props.data;
    let highlighted = this.state.highlighted;
    options.map((item, i) => {
      if (item.text == null || item.text == undefined) {
        options.splice(i, 1);
      }
    });
    if (!options || !options.length) return /*#__PURE__*/_react.default.createElement("li", {
      className: "no-results"
    }, "No results found");
    return options.map((item, i) => {
      return /*#__PURE__*/_react.default.createElement("li", {
        key: item.id,
        className: "selector-option" + (i === highlighted ? " highlighted" : ""),
        onClick: event => {
          event.preventDefault();
          this.toggleTag(item);
          this.changeDropDownState(false);
        },
        onMouseOver: () => this.highlight(i)
      }, this.renderOption(item));
    });
  }

  render() {
    const _this$props = this.props,
          {
      placeholder,
      className
    } = _this$props,
          other = _objectWithoutProperties(_this$props, _excluded);

    var tagSelectorClasses = ["tag-selector"];
    this.props.className && tagSelectorClasses.push(className);
    this.state.dropDownIsOpened && tagSelectorClasses.push("opened");
    return /*#__PURE__*/_react.default.createElement("div", {
      className: tagSelectorClasses.join(" "),
      ref: "tagselector"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "search-input",
      style: {
        border: "solid",
        borderColor: this.props.color ? this.props.color : "gainsboro"
      },
      ref: _ref => this.selector = _ref
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "input-container",
      onClick: () => this.toggleDropDownState()
    }, /*#__PURE__*/_react.default.createElement("input", {
      type: "text",
      disabled: this.props.disabled,
      className: "select-input",
      placeholder: placeholder,
      value: this.state.search,
      onChange: this.inputChangeHandler,
      onKeyDown: this.onKeyDown
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "selector-options",
      style: {
        display: this.state.dropDownIsOpened ? null : 'none'
      }
    }, /*#__PURE__*/_react.default.createElement("ul", null, this.renderOptions()))), /*#__PURE__*/_react.default.createElement(_tagContainer.default, {
      data: this.state.selectedData,
      onTagDelete: id => this.deleteTag(id)
    }));
  }

}

var _default = TagSelector;
exports.default = _default;