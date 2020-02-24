import todoListReducer from './todoListReducer';


describe('Game Reducer', () => {
    let initialState;

    it('should handle initial state', () => {
        initialState = {todos: [{ todo: null, status: 'incomplete' }]};
        expect(todoListReducer(undefined, {})).toEqual(initialState);
    });

    it('should return new data when "TODOLIST_RECEIVED" is received', () => {
        initialState = {todos: [{ todo: null, status: 'incomplete' }]};
        const action = {type:'TODOLIST_RECEIVED', json: [{todo:'meditate', status:'incomplete', _id:1}]};
        const state = todoListReducer(initialState, action);
        const newstate = { ...state, todos: action.json } ;
        expect(state).toEqual(newstate);
    });

    it('should add data when "TODO_ADDED" is received', () => {
        initialState = { todos: [ { todo: 'meditate', status: 'incomplete', _id: 1 }, { todo: 'nap', status: 'incomplete', _id: 2 } ] };
        const action = { type:'TODO_ADDED', json: {todo: 'walk', status: 'incomplete', _id:3 }};
        const state = todoListReducer(initialState, action);
        const updatedState = {
            todos: [
              { todo: 'meditate', status: 'incomplete', _id: 1 },
              { todo: 'nap', status: 'incomplete', _id: 2 },
              { todo: 'walk', status: 'incomplete', _id: 3 }
            ]
          };
        expect(state).toEqual(updatedState);
    });

    it('should remove data when "TODO_DELETED" is received', () => {
        initialState = { todos: [ { todo: 'meditate', status: 'incomplete', _id: 1 }, { todo: 'nap', status: 'incomplete', _id: 2 } ] };
        const action = {type:'TODO_DELETED', json: {id:1}};
        const state = todoListReducer(initialState, action);
        expect(state).toEqual({ todos: [ { todo: 'nap', status: 'incomplete', _id: 2 } ] });
    });

    it('should return the updated state when "TODO_UPDATED" is received', () => {
        initialState = { todos: [ { todo: 'meditate', status: 'incomplete', _id: 1 }, { todo: 'nap', status: 'incomplete', _id: 2 } ] };
        const action = {type:'TODO_UPDATED', json: { id:1, status: 'complete' }};
        const state = todoListReducer(initialState, action); 
        const updatedState = {
            todos: [
              { todo: 'meditate', status: 'complete', _id: 1 },
              { todo: 'nap', status: 'incomplete', _id: 2 }
            ]
          };
        expect(state).toEqual(updatedState);
    });

});