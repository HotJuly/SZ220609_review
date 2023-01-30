<template>
    <div>
        <img :src="$attrs.src" alt="" srcset="">
        <el-image v-bind="$attrs" v-show="false" ref="image" style="width: 100px; height: 100px" >
        </el-image>
        <!-- <el-button type="primary" @click="handler">放大</el-button> -->
        <slot name="content" :listeners="{
            click:handler
        }"></slot>
    </div>
</template>

<script>
export default {
    name: 'bigImage',
    methods:{
        handler(){
            this.$refs.image.clickHandler();
        }
    }
}
</script>

<style scoped>

</style>
