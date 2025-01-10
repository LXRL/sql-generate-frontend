import hyRequest from '../request/index'

export function getGenSchema(params: any) {
    return hyRequest.post({
        url: '/generate/schema',
        params: params
    })
}