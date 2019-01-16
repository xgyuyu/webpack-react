import { fetchData } from '../../common/index'

export function loginsend(action) {
  fetchData('/login', 'post', action)
}