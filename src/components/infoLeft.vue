<script setup lang="ts">
</script>

<template>
    <div class="left">
        <div class="header">
            <slot name="heInfo"></slot>
        </div>
        <div class="info">
            <div class="search">
                <slot name="seInfo"></slot>
            </div>
            <div class="data">
                <slot name="daInfo"></slot>
            </div>
        </div>
        <slot name="drInfo"></slot>
    </div>
</template>
<style lang="less" scoped>
.left {
    background-color: white;
    border: 1px solid var(--underline-border-color);

    .header {
        display: flex;
        width: 100%;
        padding: 16px 24px;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        border-bottom: 1px solid var(--underline-border-color);
    }

    .info {
        display: flex;
        flex-direction: column;
        padding: 24px;

        .search {
            display: flex;

            .el-input {
                width: 200px;
            }
        }

        .data {
            width: 100%;
            margin: 16px 0;
        }
    }

}
</style>