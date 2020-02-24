import { put, takeLatest, all, takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions';

const API = '/v1/todos';
const headers = {
   'Accept': 'application/json',
   'Content-Type' :'application/json'
 };

function* fetchTodoList() {
   try{
      const json = yield fetch(API) 
         .then(response => response.json() );  
      yield put({ type: actionTypes.TODOLIST_RECEIVED, json: json.todos });
   } catch(error){
      console.log(`Error getting to do list ${error.message}`);
   }
}

function* addTodo(action){
   const newTodo = {todo:action.val, status:'incomplete'};
   try {
      const json = yield fetch(API, {
         method : 'POST',
         headers,
         body : JSON.stringify(newTodo)
       }).then(response => response.json());
      yield put({ type: actionTypes.TODO_ADDED, json });
   } catch(error){
      console.log(`Error adding a new todo ${error.message}`);
   }
}

function* deleteTodo(action){
   try {
      const json = yield fetch(`${API}/${action.val}`, {
         method : 'DELETE',
         headers,
       }).then(response => response.json());
      yield put({ type: actionTypes.TODO_DELETED, json });
   } catch(error){
      console.log(`Error adding a new todo ${error.message}`);
   }
}

function* updateTodo(action){
   try {
      const json = yield fetch(`${API}/${action.val.id}`, {
         method : 'PUT',
         headers,
         body : JSON.stringify({ status:action.val.status })
       }).then(response => response.json());
      if (json.type === 'error'){
         throw new Error('Could not update the todo item');
      } else {
         yield put({ type: actionTypes.TODO_UPDATED, json });
      }
   } catch(error){
      console.log(`Error adding a new todo ${error.message}`);
   }
}

function* getTodoListWatcher() {
   yield takeLatest(actionTypes.GET_TODOLIST, fetchTodoList)
}

function* addTodoWatcher(){
   yield takeEvery(actionTypes.ADD_TODO, addTodo);
}

function* deleteTodoWatcher(){
   yield takeEvery(actionTypes.DELETE_TODO, deleteTodo);
}

function* updateTodoWatcher(){
   yield takeEvery(actionTypes.UPDATE_TODO, updateTodo);
}

export default function* () {
   yield all([
   getTodoListWatcher(),
   addTodoWatcher(),
   deleteTodoWatcher(),
   updateTodoWatcher()
   ]);
}