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
