import hyRequest from '../request/index'

export function getFiePage() {
    return hyRequest.get({
        url: 'field_info/list/page',
    })
}
export function getFieSql(params: any) {
    return hyRequest.post({
        url: 'field_info/generate/sql',
        data: params
    })
}

export function getMyFiePage() {
    return hyRequest.get({
        url: 'field_info/my/list/page',
    })
}

export function deleteMyFiePage(params: any) {
    return hyRequest.post({
        url: 'field_info/delete',
        data: { id: params }
    })
}
export function AddMyFiePage(params: any) {
    return hyRequest.post({
        url: 'field_info/add',
        data: { name: params.name, content: params.content }
    })
}