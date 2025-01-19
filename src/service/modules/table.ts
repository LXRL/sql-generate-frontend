import hyRequest from '../request/index'

export function getTabPage() {
    return hyRequest.get({
        url: 'table_info/list/page',
    })
}

export function getTabSql(params) {
    return hyRequest.post({
        url: 'table_info/generate/sql',
        data: params
    })
}
