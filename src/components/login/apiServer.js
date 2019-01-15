import { fetchData } from '../../common/index'

export function login(option) {
    return fetchData('/login',option)
}