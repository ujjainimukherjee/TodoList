import * as actionTypes from '../actions';

const initialState = {todos: [{ todo: null, status: 'incomplete' }]};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.TODOLIST_RECEIVED:
            return { ...state, todos: action.json }    
        case actionTypes.TODO_ADDED:
            const todos = state.todos.concat(action.json);
            state = {...state, todos:todos};
            return state;  
        case actionTypes.TODO_DELETED:
            const newtodos = state.todos.filter(obj => {
                return obj._id !== action.json.id;
            });
            state = {...state, todos:newtodos};
            return state;
        case actionTypes.TODO_UPDATED:
            const updatedTodos = state.todos.map(obj => {
                if (obj._id === action.json.id) {
                    obj.status = action.json.status;
                    return obj;
              }
              return obj;
            })
            state = { ...state, todos:updatedTodos };
            return state; 
        default:
          return state;  
    };
};

export default reducer;


