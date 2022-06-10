<template>
    <!-- 分数题组件 -->
    <div class="score-question">
        <el-icon>
            <StarFilled />
        </el-icon>
        <el-icon>
            <StarFilled />
        </el-icon>
        <el-icon>
            <StarFilled />
        </el-icon>
        <el-icon>
            <StarFilled />
        </el-icon>
        <el-icon>
            <StarFilled />
        </el-icon>
    </div>
</template>

<script setup lang="ts">

</script>
<style lang="css" scoped>
.score-question {
    display: flex;
    align-items: center;
    margin-top: 8px;
}
.el-icon{
    margin-right: 2px;
    font-size: 20px;
}
.score-question:deep(.el-icon svg) {
    color: #c2c2c2;
    
}
</style>
