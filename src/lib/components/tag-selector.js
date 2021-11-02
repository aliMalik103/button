import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';
import Checkbox from './Checkbox.js';
import TagContainer from './tag-container';
import  "./styles/tag-selector.css";
class TagSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: props.data || [],
      selectedData: [],
      search: "",
    };
    this.onKeyDown = this.onKeyDown.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }
  componentWillReceiveProps(props) {
    if (!_.isEqual(props.data, this.props.data)) {
      this.setState({
        options: props.data || [],
        search: ""
      });
    }
    if (!_.isEqual(props.selectedData, this.props.selectedData)) {
      this.setState({
        options: props.data || [],
        search: "",
        selectedData: props.selectedData || []
      });
    }
  }
  updateSelectedData(selectedData) {
    var uniqueData = _.uniq(selectedData);
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
      const area = ReactDOM.findDOMNode(this.selector);
      if (!area.contains(event.target)) {
        this.changeDropDownState(false)
      }
    }
    //if click outside the select
  };
  isChecked(object) {
    return _.some(this.state.selectedData, item => item.id == object.id);
  }
  toggleTag(item) {
    if (this.isChecked(item)) {
      this.deleteTag(item.id)
    } else {
      this.addTag(item)
    }
  }
  addTag(item) {
    var selectedData = this.state.selectedData.concat(item);
    this.updateSelectedData(selectedData);
    this.props.onChange && this.props.onChange(selectedData);
  }
  deleteTag(id) {
    var selectedData = _.reject(this.state.selectedData, (item) => item.id == id);
    this.updateSelectedData(selectedData);
    this.props.onChange && this.props.onChange(selectedData);
  }
  onKeyDown(event) {
    const highlighted = this.state.highlighted;
    const options = this.state.options;
    switch (event.keyCode) {
      case 27: //esc
        event.preventDefault();
        this.changeDropDownState(false);
        break;
      case 13: //enter
        event.preventDefault();
        if (highlighted < options.length) {
          this.addTag(options[highlighted]);
          this.changeDropDownState(false);
        }
        break;
      case 38: //up
        event.preventDefault();
        this.highlight(Math.max(highlighted - 1, 0));
        break;
      case 40: //down
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
      options: lowerSearch
        ? _.filter(this.props.data, (item) => item.text.toLowerCase().replace(/\s{2,}/g, ' ').trim().includes(lowerSearch))
        : null
    })
  }
  changeDropDownState(value) {
    this.setState({
      dropDownIsOpened: value
    })
  }
  toggleDropDownState() {
    this.changeDropDownState(!this.state.dropDownIsOpened)
  }
  highlight(index) {
    this.setState({
      highlighted: index
    })
  }
  inputChangeHandler(event) {
    this.filterOptions(event.target.value);
    this.changeDropDownState(true);
  }
  renderOption(data) {
    var isChecked = this.isChecked(data);
    return (
      <label data-id={data.id}>
        <Checkbox checked={isChecked} />
        {data.text}
      </label>
    );
  }
  renderOptions() {
    let options = this.state.options || this.props.data;
    let highlighted = this.state.highlighted;
    options.map((item, i) => {
      if (item.text == null || item.text == undefined) {
        options.splice(i, 1);
      }
    });
    if (!options || !options.length)
      return (<li className="no-results">No results found</li>);
    return options.map((item, i) => {
      return (
        <li key={item.id}
          className={"selector-option" + (i === highlighted ? " highlighted" : "")}
          onClick={event => {
            event.preventDefault();
            this.toggleTag(item);
            this.changeDropDownState(false);
          }}
          onMouseOver={() => this.highlight(i)}>
          {this.renderOption(item)}
        </li>
      )
    })
  }
  render() {
    const { placeholder, className, ...other } = this.props;
    var tagSelectorClasses = ["tag-selector"];
    this.props.className && tagSelectorClasses.push(className);
    this.state.dropDownIsOpened && tagSelectorClasses.push("opened");
    
    return (
      <div className={tagSelectorClasses.join(" ")} ref="tagselector">
        <div className={"search-input"} style={{border:"solid",borderColor:this.props.borderColor?this.props.borderColor
        :"gainsboro"}} ref={ref => this.selector = ref}>
          <div className="input-container" onClick={() => this.toggleDropDownState()}>
            <input type="text"
              disabled={this.props.disabled}
              className="select-input"
              placeholder={placeholder}
              value={this.state.search}
              onChange={this.inputChangeHandler}
              onKeyDown={this.onKeyDown}
            />
            
          </div>
          <div className="selector-options" style={{ display: this.state.dropDownIsOpened ? null : 'none' }}>
            <ul>{this.renderOptions()}</ul>
          </div>
        </div>
        <TagContainer
          data={this.state.selectedData}
          onTagDelete={id => this.deleteTag(id)} />
      </div>
    );
  }
}
export default TagSelector;
