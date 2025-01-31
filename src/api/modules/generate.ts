import hyRequest from '../request/index'

export function getGenSchema(params: any) {
    return hyRequest.post({
        url: 'sql/generate/schema',
        data: params
    })
}
export function getGenAuto(params: string) {
    return hyRequest.post({
        url: 'sql/get/schema/auto',
        data: { content: params }
    })
}
export function getUploadExcelFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return hyRequest.post({
        url: 'sql/get/schema/excel',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export function getGenSchemaBySQL(params: any) {
    return hyRequest.post({
        url: 'sql/get/schema/sql',
        data: { sql: params }
    })
}