import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {addTodo, completeTodo, setVisibilityFilter, VisibilityFilters} from '../actions/index';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import Footer from '../components/Footer';

class App extends React.Component {
    render() {
        const {dispatch, visibleTodos, visibilityFilter} = this.props;
        return (
            <div>
                <AddTodo
                    onAddClick={text =>
                        dispatch(addTodo(text))
                    }/>
                <TodoList
                    todos={visibleTodos}
                    onTodoClick={index =>
                        dispatch(completeTodo(index))
                    }/>
                <Footer
                    filter={visibilityFilter}
                    onFilterChange={nextFilter =>
                        dispatch(setVisibilityFilter(nextFilter))
                    }/>
            </div>
        );
    }
}


App.propTypes = {
    visibleTodos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    })),
    visibilityFilter: PropTypes.oneOf([
        'SHOW_ALL',
        'SHOW_COMPLETED',
        'SHOW_ACTIVE'
    ]).isRequired
};


//export function setVisibilityFilter(filter) {
//    return {
//        type: SET_VISIBILITY_FILTER,
//        filter
//    }
//}

function selectTodos(todos, filter) {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos;
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(todo => todo.completed);
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(todo => !todo.completed);
    }
}

// 基于全局state,哪些是我们想注入的props?
// 注意:使用 https://github.com/reactjs/reselect效果更佳。
function select(state) {
    return {
        visibleTodos: selectTodos(state.todos, state.visibilityFilter),
        visibilityFilter: state.visibilityFilter
    };
}

// 包装 component, 注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(App);