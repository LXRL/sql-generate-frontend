import hyRequest from '../request/index'

export function getFiePage() {
    return hyRequest.get({
        url: 'field_info/list/page',
    })
}
export function getFieSql(params) {
    return hyRequest.post({
        url: 'field_info/generate/sql',
        data: params
    })
}