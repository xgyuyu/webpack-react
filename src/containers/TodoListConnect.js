import { connect } from 'react-redux'
import TodoList from '../components/TodoList'
import { toggleTodo } from '../actions/index'

const mapStateToProps = (state) => ({
  todos: state.todos
})



export default connect(mapStateToProps, {toggleTodo})(TodoList)