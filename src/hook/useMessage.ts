import { ElMessage } from 'element-plus';
// 消息提示
export const useMessage = {
    success(msg: string = 'ok') {
        ElMessage({
            message: msg,
            type: 'success'
        })
    },
    failed(msg: string = '请求失败') {
        ElMessage({
            message: msg,
            type: 'error'
        })
    }
};