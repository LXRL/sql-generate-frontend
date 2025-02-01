import { ElLoading } from "element-plus";

export const useLoading = () => {
    let loadingInstance: ReturnType<typeof ElLoading.service> | null = null;
    return {
        start(text: string = '加载中...') {
            // 如果已经存在实例，先关闭
            if (loadingInstance) {
                loadingInstance.close();
            }
            // 创建新的实例
            loadingInstance = ElLoading.service({
                lock: false, // 是否锁定页面滚动
                text: text, // 加载提示文本
            });
        },
        close() {
            if (loadingInstance) {
                loadingInstance.close();
                loadingInstance = null; // 清空实例
            }
        }
    };
};