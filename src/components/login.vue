<template>
    <div class="login">
        <div class="img-wrapper">
            <img src="../assets/img/login.png" alt="">    
        </div>    
        <div class="wrapper" v-if="!show">
            <div class="title">Alian后台管理系统</div>
            <div><input type="text" placeholder="手机号" v-model="account"></div>
            <div><input type="password" placeholder="密码" v-model="pw"></div>
            <div class="btn-wrapper">
                <div class="btn" @click="login" >登 <span>入</span> </div>
            </div>
            <div  @click="out" class="sign">立即注册</div>
        </div>
        <div class="wrapper" v-if="show">
            <div class="title">Alian后台管理系统</div>
            <div><input type="text" placeholder="账号" v-model="account"></div>
            <div><input type="text" placeholder="密码" v-model="pw"></div>
            <div class="btn-wrapper">
                <div class="btn btn-zhuce" @click="sign">注册</div>
            </div>
        </div>
    </div>    
</template>

<script>
import {login} from '../config/api'
export default {
    data() {
        return{ 
            show: false,
            account: '',
            pw: ''
        }
    },
    methods: {
        login() {
            localStorage.clear()
            let data = {
                phone: this.account,
                password: this.pw
            }
            login(data).then((res) => {
                console.log(res)
                localStorage.id = res.data.id
                localStorage.nickname = res.data.nickname
                // localStorage.state = res.data.audit_state
                if(res.data.audit_state === 1) {
                    this.$router.push('/home')
                    localStorage.name = res.data.base.mch_name
                }else if( res.data.audit_state === 0 ){
                    this.$router.push({ path: '/merAudit', query: {list: res.data.base}})
                }else{
                    this.$router.push({ path: '/merAudit', query: {state: 2}})
                }
               
            })
        },
        out() {
            this.show = true
            
        },
        sign() {
            let data = {
                phone: this.account,
                password: this.pw
            }
            login(data).then((res) => {
                this.show = false
            })
        }
    }
}
</script>

<style lang="sass" scoped>
.login
    background: #00BFA6
    width: 100vw
    height: 100vh
    display: flex
    align-items: center
    .img-wrapper
        flex: 1
        text-align: center
    .wrapper
        width: 350px
        height: 38  0px
        background: #fff
        margin-right: 250px
        border-radius: 5px
        padding: 50px 30px
        text-align: center
        .title 
            font-size: 20px
            font-weight: bold
            padding-bottom: 20px
        input
            border: 1px solid #B1B3C1;
            border-radius: 2px;
            font-size: 16px
            width: 100%
            height: 40px
            line-height: 40px
            margin-top: 20px
            padding-left: 20px
        .btn-wrapper
            display: flex
            align-items: center
            justify-content: center
            .btn
                width: 100%
                margin-top: 50px
                background: #00BFA6
                border: 1px solid #B1B3C1;
                border-radius: 2px;
                color: #fff
                height: 40px
                font-size: 16px
                line-height: 40px
            span
                margin-left: 20px
            .btn-zhuce
                width: 300px
        .sign
            font-size: 13px
            color: #00BFA6
            margin-top: 5px
</style>
