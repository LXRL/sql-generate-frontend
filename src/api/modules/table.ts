import hyRequest from '../request/index'

export function getTabPage() {
    return hyRequest.get({
        url: 'table_info/list/page',
    })
}

export function getTabSql(params: any) {
    return hyRequest.post({
        url: 'table_info/generate/sql',
        data: params
    })
}

export function getMyTabPage() {
    return hyRequest.get({
        url: 'table_info/my/list/page',
    })
}

export function deleteMyTabPage(params: any) {
    return hyRequest.post({
        url: 'table_info/delete',
        data: { id: params }
    })
}

export function AddMyTabPage(params: any) {
    return hyRequest.post({
        url: 'table_info/add',
        data: { name: params.name, content: params.content }
    })
}