"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

require("./styles/tag-container.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TagContainer = _ref => {
  let {
    data,
    onTagDelete
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "tag-container"
  }, data.map(item => {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "tag",
      key: item.id
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "tag--close",
      onClick: () => onTagDelete(item.id)
    }), item.text);
  }));
};

var _default = TagContainer;
exports.default = _default;