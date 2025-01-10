import hyRequest from '../request/index'

export function getGenSchema(params: any) {
    return hyRequest.post({
        url: 'sql/generate/schema',
        data: params
    })
}
export function getGenAuto(params: any) {
    return hyRequest.post({
        url: 'sql/get/schema/auto',
        data: params
    })
}