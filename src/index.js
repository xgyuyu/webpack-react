import React, { Fragment } from "react"
import ReactDOM  from "react-dom"
import './css/index.less'
import {Popover} from 'antd'
const data = [
    {
        id: 1, time: [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 16, 17, 18, 19, 22, 23], num: 11, type: 1,
    },
    {
        id: 1, time: [3, 4, 5, 8, 9, 10, 11, 16, 17, 18, 19], num: 5, type: 2,
    },
    {
        id: 2, time: [3, 4, 5, 8, 9, 10, 11, 16, 17, 18, 19], num: 10, type: 1,
    },
    {
        id: 3, time: [3, 4, 5, 8, 9, 10, 11, 16, 17, 18, 19], num: 9, type: 2,
    },
]

function sum(arr) {
    return arr.reduce(function(prev, curr, idx, arr){
        return prev + curr
    }, 0)
}

const App = () => {
    const time = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]
    const time2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    const weekTitle = [
        {name: '周一', id: 1},
        {name: '周二', id: 2},
        {name: '周三', id: 3},
        {name: '周四', id: 4},
        {name: '周五', id: 5},
        {name: '周六', id: 6},
        {name: '周日', id: 7},
    ]
    const weekData = weekTitle.map(v => {
        let obj = {id: v.id, arr: []}
        if (data.map(r => r.id).includes(v.id)) {
            const arr = data.filter(l => l.id ===v.id)
            obj = {
                id: v.id,
                arr
            }
        }
        return obj
    })

    console.log(weekData)

    return (
        <div>
            <table border="0" cellSpacing="0" cellPadding="0"  style={{borderCollapse: 'collapse', borderSpacing: 0}}>
                <thead>
                    <tr>
                        <th />
                        {
                            weekTitle.map((v) => (
                                <th key={v.name}>
                                    {v.name}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                {
                    time2.map(v => (
                        <tr style={{height: 24}} key={v}>
                            <td>
                                {time.includes(v) ? v : ''}
                            </td>
                            {
                                weekData.map((r) => (
                                    <td key={r.id}>
                                        <Popover>
                                            <div>
                                                {sum((r.arr || []).map(v => v.num) || [])}
                                            </div>
                                        </Popover>

                                        {
                                            (r.arr || []).map((o) => (
                                                <Fragment key={o.type}>
                                                    {
                                                        (o.type===1 && ((r.arr[0] || {}).time || []).includes(v)) && <div style={{width: 32, height: '100%', background: 'aqua', display: 'inline-block'}} />
                                                    }
                                                    {
                                                        (o.type===2 && ((r.arr[1] || {}).time || []).includes(v)) && <div style={{width: 32, height: '100%', background: 'red', display: 'inline-block'}} />
                                                    }
                                                </Fragment>
                                            ))
                                        }
                                    </td>

                                ))
                            }
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}





const rootElement = document.getElementById("app")
ReactDOM.render(<App />, rootElement)
