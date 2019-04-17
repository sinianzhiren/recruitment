/**
 * 该方法返回跳转的地址
 * @param type
 * @param avatar
 * @return url
 */

export function getRedirectPath({ type, avatar }) {
    // 注册后如果 type == 'boss' 跳转 /boss， 否则跳转到 /genuis
    // 对于信息不全的就跳到补全页面 /bossinfo  /genuisinfo
    let url = type === 'boss'? '/boss' : '/genius'
    if (!avatar){
        url += 'info'
    }
    return url
}

export function getChatId(currentId, targetId) {
    return [currentId, targetId].sort().join('_')
}