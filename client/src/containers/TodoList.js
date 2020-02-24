import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../actions';
import Todo from './Todo';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './TodoList.scss';

/**
 * Todo list component which contains all the todo items
 */
class TodoList extends Component {

  componentDidMount() {
    this.props.onGetTodoList()
  }

  render() {
    const todoTable = this.props.todos.length === 0 ? 'hideTable' : '';
    return (
      <Container className="todoList-container">
        <Form>
          <Row>
            <Col sm={4}>
              <input type="text" className="form-control" placeholder="Add Item" aria-label="Add To do Item" aria-describedby="basic-addon" ref = {(ref) => this.textInput = ref}/>
            </Col>
            <Col sm={4}>
              <Button variant="secondary" type="submit" onClick={ (e) => this.props.onAddTodo(this.textInput.value)}>Add Todo</Button>
            </Col>
          </Row>
          <Row className={todoTable}>
            <Col sm={8}>
            <ul>
              {this.props.todos.map((todo, index) =>
                  <Todo 
                        key={index} item={todo}  onClick={() => this.props.onTodoClick(todo)} 
                        onDeleteTodo={() => this.props.onTodoDeleteClick(todo)}
                        />
                )}
              </ul>
            </Col>
        </Row>
      </Form>
    </Container>
    );
  }
}

const mapStateToProps = state => {
    return {
        todos: state.todos
    }
};

const mapDispatchToProps = dispatch => {
  return {
    onGetTodoList: () => {
      dispatch({
        type: actionTypes.GET_TODOLIST
      })
    },
    onTodoClick: (todo) => {
      const toggleStatus = todo.status === 'complete' ? 'incomplete' : 'complete';
        dispatch({
          type: actionTypes.UPDATE_TODO,
          val: { id: todo._id, status: toggleStatus }
        })
      },
      onAddTodo: (inputVal) => {
        // only allow non empty strings
        if (inputVal && inputVal.length > 0){
          dispatch({
            type: actionTypes.ADD_TODO,
            val: inputVal
          })
        }
      },
      onTodoDeleteClick: (todo) => {
        dispatch({
          type: actionTypes.DELETE_TODO,
          val: todo._id
        })
      }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

