import React, { useState } from "react"
import ReactDOM, { unstable_batchedUpdates } from "react-dom"

class App extends React.Component {
    constructor(props) {
        super(props)
        // 记录 render 的执行次数
        this.renderCount = 0
        this.fn1 = this.fn1.bind(this)
        this.fn2 = this.fn2.bind(this)
        this.fn3 = this.fn3.bind(this)
    }
    fn1(){
        this.setState({ a: Math.random() })
        this.setState({ b: Math.random() })
    }
    fn2(){
        // 模拟一个异步操作，（请求接口）
        setTimeout(() => {
            this.setState({ a: Math.random() })
            this.setState({ a: Math.random() })
        }, 0)
    }
    fn3(){
        // 模拟一个异步操作，（请求接口），使用unstable_batchedUpdates包一下
        setTimeout(
            unstable_batchedUpdates(() => {
                this.setState({ a: Math.random() })
                this.setState({ a: Math.random() })
            }),
            1000
        )
    }
    render() {
        ++this.renderCount
        return (
            <div>
                <h1>截止到目前 render 执行次数{this.renderCount}</h1>
                <button onClick={this.fn1}>同步的 setState 两次</button>
                <br />
                <button onClick={this.fn2}>在一个异步的事件循环里 setState 两次</button>
                <br />
                <button onClick={this.fn3}>
                    在一个异步的事件循环里 setState 两次, 但是使用
                    ReactDOM.unstable_batchedUpdates 强制 batch
                </button>
            </div>
        )
    }
}



// function App() {
//     let [count, setCount] = useState(0)
//     return (
//         <div onClick={() => setCount(count + 1)}>
//             Parent clicked {count} times
//             <Child />
//         </div>
//     )
// }
//
// function Child() {
//     let [count, setCount] = useState(0)
//     return (
//         <button onClick={() => setCount(count + 1)}>
//             Child clicked {count} times
//         </button>
//     )
// }


const rootElement = document.getElementById("app")
ReactDOM.render(<App />, rootElement)
