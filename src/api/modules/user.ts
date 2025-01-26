import hyRequest from '../request/index'

export function postUserLogin(params: any) {
    return hyRequest.post({
        url: 'user/login',
        data: params,
    })
}

export function getUserInfo() {
    return hyRequest.get({
        url: 'user/get/login',
    })
}

export function postUserRegister(params: any) {
    return hyRequest.post({
        url: 'user/register',
        data: params,
    })
}

export function postUserLogout() {
    return hyRequest.post({
        url: 'user/logout',
    })
}




