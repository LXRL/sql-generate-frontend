import hyRequest from '../request/index'

export function getLexPage() {
    return hyRequest.get({
        url: 'dict/list/page',
    })
}

export function getLexSql(params) {
    return hyRequest.post({
        url: 'dict/generate/sql',
        data: params
    })
}

export function getMyLexPage() {
    return hyRequest.get({
        url: 'dict/my/list/page',
    })
}

export function deleteMyLexPage(params) {
    return hyRequest.post({
        url: 'dict/delete',
        data: { id: params }
    })
}

export function AddMyLexPage(params) {
    return hyRequest.post({
        url: 'dict/add',
        data: { name: params.name, content: params.content }
    })
}