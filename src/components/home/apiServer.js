import { fetchData } from '../../common/index'

export function getstuList(action) {
  let a = fetchData('/studentsList', 'get', action)
  console.log(fetchData('/studentsList', 'get', action))
}