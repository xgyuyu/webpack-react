import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.less'
import './css/index.css'
import { observable, action, computed } from 'mobx'
import { observer, PropTypes as ObservablePropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import { Divider } from 'antd';

class Todo {
  id = Math.random()
  @observable title = ''
  @observable finfshed = false

  constructor(title) {
    this.title = title
  }

}

class Store {
  @observable todos = []
}

var Store = new Store()

@observable
class ToodList extends component{
  static propTypes = {
    store: PropTypes.shape({
      todos: ObservablePropTypes.observableArrayOf(ObservablePropTypes.observableObject).isRequired
    }).isRequired
  }
  render() {
    return (
      <div></div>
    )
  }
}

ReactDOM.render(
  <ToodList store = {store}></ToodList>, document.getElementById('app')
)
