/**
 * Created by xuliuzhu on 2016/10/11.
 */
const defaultPermission = 0;
let permission = defaultPermission;

export const getPermission = () => permission;

export function setPermission(per = defaultPermission) {
  permission = per;
}
