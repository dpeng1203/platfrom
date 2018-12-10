<template>
        <el-row class="tac">
            <el-col >
                <el-menu
                    :default-active="$route.path"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#34395D"
                    text-color="#fff"
                    unique-opened
                    router
                    active-text-color="#00B7AD">
                    <el-menu-item index="/home">
                        <i class="el-icon-menu"></i>
                        <span slot="title">主页</span>
                    </el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>账户管理</span>
                        </template>
                        <el-menu-item index="/home/merList">账户查询</el-menu-item>
                        <el-menu-item index="/home/merInfo">基本信息</el-menu-item>
                        <el-menu-item index="/home/merCloseInfo">基础信息</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="/home/billDetail">
                        <i class="el-icon-document"></i>
                        <span slot="title">交易明细</span>
                    </el-menu-item>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span>密码管理</span>
                        </template>
                        <el-menu-item index="/home/keyManage">密钥管理</el-menu-item>
                        <el-menu-item index="/home/resetKey">登录密码</el-menu-item>
                        <!-- <el-menu-item index="4-3">交易密码</el-menu-item> -->
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>
</template>

<script>
export default {
    name: 'tabs',
    data() {
        return{
            
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath)
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath)
        }
    },
    mounted() {
    }
}
</script>

<style lang="sass" scoped>
    .tac 
        width: 287px
        flex-shrink: 0
        .el-menu-vertical-demo
            height: 100vh
</style>
