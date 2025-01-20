import hyRequest from '../request/index'

export function getUserLogin(params) {
    return hyRequest.post({
        url: 'user/login',
        data: params,
    })
}

export function getUserGetLogin() {
    return hyRequest.get({
        url: 'user/get/login',
    })
}

export function getUserSign(params) {
    return hyRequest.post({
        url: 'user/register',
        data: params,
    })
}

export function getUser() {
    return hyRequest.get({
        url: 'user/login/user',
    })
}





