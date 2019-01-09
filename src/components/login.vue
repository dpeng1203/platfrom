<template>
    <div class="login">
        <div class="img-wrapper">
            <img src="../assets/img/login.png" alt="">    
        </div>    
        <div class="wrapper" v-if="!show">
            <div class="title">Alian后台管理系统</div>
            <div><input type="text" placeholder="手机号" v-model="account"></div>
            <div class="input-wrap" v-if="eyeOpen">
                <input type="password" placeholder="密码" v-model="pw">
                <img src="../assets/img/eye_close.png" alt=""  @click="showPw"> 
            </div>
            <div class="input-wrap" v-if="!eyeOpen">
                <input type="text" placeholder="密码" v-model="pw">
                <img src="../assets/img/eye_open.png" alt="" @click="showPw"> 
            </div>

            <div class="slide" >
                <slide-verify 
                    :l="42"
                    :r="10"
                    :w="310"
                    :h="155"
                    @success="onSuccess"
                    @fail="onFail"
                    @refresh="onRefresh"
                >
                </slide-verify>
            </div>
            

            <!-- <div class="btn-wrapper" v-if="!slideShow">
                <div class="btn" @click="loginBtn" >登 <span>入</span> </div>
            </div> -->
            <div  @click="out" class="sign">立即注册</div>
        </div>
        <div class="wrapper" v-if="show">
            <div class="title">Alian后台管理系统</div>
            <div><input type="text" placeholder="账号" v-model="account"></div>
            <div class="input-wrap" v-if="eyeOpen">
                <input type="password" placeholder="密码" v-model="pw">
                <img src="../assets/img/eye_close.png" alt=""  @click="showPw"> 
            </div>
            <div class="input-wrap" v-if="!eyeOpen">
                <input type="text" placeholder="密码" v-model="pw">
                <img src="../assets/img/eye_open.png" alt="" @click="showPw"> 
            </div>
            <div class="input-wrap" v-if="eyeOpen1">
                <input type="password" placeholder="再次输入密码" v-model="pwAgain">
                <img src="../assets/img/eye_close.png" alt=""  @click="showPw1"> 
            </div>
            <div class="input-wrap" v-if="!eyeOpen1">
                <input type="text" placeholder="再次输入密码" v-model="pwAgain">
                <img src="../assets/img/eye_open.png" alt="" @click="showPw1"> 
            </div>
            <div class="btn-wrapper">
                <div class="btn btn-zhuce" @click="sign">注册</div>
                <div  @click="show = false" class="sign">返回</div>
            </div>
        </div>
    </div>    
</template>

<script>
import SlideVerify from 'vue-monoplasty-slide-verify';
import {login} from '../config/api'
export default {
    data() {
        return{ 
            eyeOpen: true,
            eyeOpen1: true,
            show: false,
            account: '',
            pw: '',
            pwAgain: ''
        }
    },
    components: {
        SlideVerify
    },
    methods: {
        showPw() {
            this.eyeOpen = !this.eyeOpen
        },
        showPw1() {
            this.eyeOpen1 = !this.eyeOpen1
        },
        onSuccess(){
            if(this.account == '') {
                this.$message.error('请输入账号')
                return false
            }
            if(this.pw == '') {
                this.$message.error('请输入密码')
                return false
            }
            this.login()
        },
        onFail(){

        },
        onRefresh(){

        },
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
            if(this.pw != this.pwAgain) {
                this.$message.error('两次密码不一致，请重新输入')
                this.pwAgain = ''
                return false
            }
            this.login()
        }
    }
}
</script>

<style lang="sass" scoped>
.login
    background: #00BFA6
    min-width: 1500px
    height: 100vh
    display: flex
    align-items: center
    .img-wrapper
        flex: 1
        text-align: center
    .wrapper
        width: 370px
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
        .input-wrap
            position: relative
            img
                position: absolute
                right: 10px
                top: 32px
                width: 20px
                height: 20px
        .slide
            margin-top: 10px
        .btn-wrapper
            // display: flex
            // align-items: center
            // justify-content: center
            .btn
                width: 100%
                margin: 0 auto  
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
            margin-top: 10px
</style>
