import React, { Component, PropTypes } from 'react';
import './Todo.scss';
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class Todo extends Component {
  render() {
    const todoClass = this.props.item.status === 'complete' ? 'checked': 'unchecked';
    let checkFont;
    if (this.props.item.status === 'complete'){
      checkFont = <FontAwesomeIcon color="green" icon={faCheck} />
    } else {
      checkFont = <FontAwesomeIcon color="gray" icon={faCheck} />
    }
    return (
      <li className={`list-group-item todoItem ${todoClass}`}  onClick={this.props.onClick}>
        <div className="row form-group">
          <div className="col-1">
           {checkFont}
          </div>
          <div className="col-10">
              {this.props.item.todo}
          </div>
          <div className="col-1">
            <FontAwesomeIcon icon={faTrash} className="delete" color="gray" onClick={this.props.onDeleteTodo}/>
          </div>
        </div>
    </li>
    );
  }
}
