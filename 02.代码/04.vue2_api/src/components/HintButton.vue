<template>
    <!-- <el-popconfirm title="你确定要删除数据吗?">
        <el-button type="danger" size="small" slot="reference">删除</el-button>
    </el-popconfirm> -->

    <!-- <el-popconfirm :title="title">
        <el-button :type="type" :size="size" slot="reference">删除</el-button>
    </el-popconfirm> -->

    <!-- <el-popconfirm v-bind:title="title">
        <el-button v-bind="{
            type,
            size
        }" slot="reference">删除</el-button>
    </el-popconfirm> -->

    
    <!-- <el-popconfirm :title="title">
        <el-button 
        v-bind="$attrs" 
        slot="reference"
        v-on:click="click3"
        >删除</el-button>
    </el-popconfirm> -->
    
    <!-- <el-popconfirm :title="title">
        <el-button 
        v-bind="$attrs" 
        slot="reference"
        v-on="{
            click:click3
        }"
        >删除</el-button>
    </el-popconfirm> -->
    
    <el-popconfirm :title="title">
        <el-button 
        v-bind="$attrs" 
        slot="reference"
        v-on="$listeners"
        >删除</el-button>
        <!-- <el-button 
        v-bind="$attrs" 
        slot="reference"
        @click="click1"
        >删除</el-button> -->
    </el-popconfirm>
</template>

<script>
export default {
    name: 'HintButton',
    props:["title"],
    mounted() {
        console.log(this.$listeners)
    },
    methods:{
        click3(){
            console.log(333)
        }
    }
}
</script>

<style scoped>

</style>
