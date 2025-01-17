import hyRequest from '../request/index'

export function getLexPage() {
    return hyRequest.get({
        url: 'dict/list/page',
    })
}