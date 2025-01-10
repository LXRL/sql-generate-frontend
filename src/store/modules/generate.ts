import { defineStore } from 'pinia';
import { reactive } from 'vue';

type FormFieldList = {
    fieldName: string;         // 字段名称
    fieldType: string;         // 字段类型
    defaultValue: string;      // 默认值
    notNull: boolean;          // 是否不能为空
    comment: string;           // 注释
    primaryKey: boolean;       // 是否为主键
    autoIncrement: boolean;    // 是否自增
    mockType: string;          // 模拟类型
    mockParams: string;        // 模拟参数
    onUpdate: string;          // 更新时的操作
};

type FormType = {
    dbName: string;            // 数据库名称
    tableName: string;         // 表名称
    tableComment: string;      // 表注释
    mockNum: number;           // 模拟数量
    fieldList: FormFieldList[];// 字段列表，包含多个 FormFieldList 对象
};

const form: FormType = reactive({
    dbName: '',
    tableName: '',
    tableComment: '',
    mockNum: 10,
    fieldList: [] as FormFieldList[] // 初始化为一个空数组
})

const useGenFormStore = defineStore('generate', {
    state: () => ({ form }),
    actions: {
        addField(field: FormFieldList) {
            this.form.fieldList.push(field);
        },
        deleteField(index: number) {
            this.form.fieldList.splice(index, 1);
        },
    }
})

export default useGenFormStore