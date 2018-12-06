<template>
    <div class="top">
        <div class="name">
            <span class="line">-</span>
            <span>AlianPAY</span>
            <span class="line">-</span>
        </div>
        <div class="head-title">后台管理系统</div>
        <div class="userInfo">
            <div class="user-name">{{accound}}</div>
            <div class="user-code">商户号：<span>{{code}}</span> </div>
        </div>
        <div class="btn-wrapper">
               <span class="btn-out" @click="out">退出</span> 
        </div>
    </div>    
</template>

<script>
import { loginOut } from '../../config/api'
export default {
    name: 'top',
    data() {
        return{
            accound: localStorage.nickname,
            code: localStorage.id
        }
    },
    methods: {
        out() {
            loginOut().then((res) => {
                this.$message({
                    message: '登出成功',
                    type: 'success'
                });
                localStorage.clear()
                this.$router.push('/login')
            }, (err) => {
                localStorage.clear()
                this.$router.push('/login')
            })
        }
    },
    

}
</script>

<style lang="sass" scoped>
    .top
        display: flex
        .name
            width: 286px
            flex-shrink: 0
            text-align: center
            padding: 40px 0 
            background: #34395D
            color: #fff
            font-size: 24px
            .line
                color: #F64866
        .head-title
            flex: 1
            color: #7E8196
            height: 80px
            line-height: 80px
            padding: 0 30px
            border-bottom: 1px solid #EEE
        .userInfo
            font-size: 16px
            color: #B9BAC8
            height: 80px
            padding-right: 30px
            border-bottom: 1px solid #EEE
            .user-name
               margin-top: 16px
            .user-code
                margin-top: 5px
                font-size: 13px
                margin-left: 2px
        .btn-wrapper
            height: 80px
            border-bottom: 1px solid #EEE
            .btn-out
                display: inline-block
                width: 80px
                height: 30px
                line-height: 30px
                background: #00BFA6;
                border-radius: 5px;
                color: #fff
                font-weight: bold
                font-size: 13px
                text-align: center
                margin: 25px 30px 0 10px 


</style>
