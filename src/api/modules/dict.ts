import hyRequest from '../request/index'

export function getDictPage() {
    return hyRequest.get({
        url: 'dict/list/page',
    })
}

export function getDictSql(params: any) {
    return hyRequest.post({
        url: 'dict/generate/sql',
        data: params
    })
}

export function getMyDictPage() {
    return hyRequest.get({
        url: 'dict/my/list/page',
    })
}

export function deleteMyDictPage(params: any) {
    return hyRequest.post({
        url: 'dict/delete',
        data: { id: params }
    })
}

export function AddMyDictPage(params: any) {
    return hyRequest.post({
        url: 'dict/add',
        data: { name: params.name, content: params.content }
    })
}