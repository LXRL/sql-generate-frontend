import hyRequest from '../request/index'

export function getGenSchema(){
    return hyRequest.post({
        url:'/generate/schema'
    })
}