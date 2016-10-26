import {VisibilityFilters, ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER} from '../actions/index';
import {combineReducers} from 'redux';

//{
//    visibilityFilter: 'SHOW_ALL',
//        todos: [
//          {
//              text: 'Consider using Redux',
//              completed: true,
//          },
//          {
//              text: 'Keep all state in a single tree',
//              completed: false
//          }
//        ]
//}
function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ];
        case COMPLETE_TODO:
            // return state.map((todo, index) => {
            //     if (index === action.index) {
            //         return Object.assign({}, todo, {
            //             completed: !todo.completed
            //         })
            //     }
            // });
            return [
                ...state.slice(0, action.index),
                Object.assign({}, state[action.index], {completed: true}),
                ...state.slice(action.index + 1)
            ];
        default:
            return state;
    }
}


function visibilityFilter(state = VisibilityFilters.SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}

const todoApp = combineReducers({
    visibilityFilter,
    todos
});

export default todoApp;
// const initialState = {
//     visibilityFilter: VisibilityFilters.SHOW_ALL,
//     todos: []
// }

// function todoApp(state=initialState , action) {
//     switch (action.type) {
//         case SET_VISIBILITY_FILTER:
//             return Object.assign({}, state, {
//                 visibilityFilter: action.filter
//             })

//         case ADD_TODO:
//             return Object.assign({}, state, {
//                 todos: [...state.todos,{
//                     text: action.text,
//                     completed: false
//                 }]
//             })
//         case TOGGLE_TODO:
//             return Object.assign({}, state, {
//                 todos: state.todos.map((todo, index) => {
//                     if (index === action.index) {
//                         return Object.assign({}, todo, {
//                             completed: !todo.completed
//                         })
//                     }
//                 })
//             })
//         default:
//             return state
//     }
// }




