<template>
    <div class="add-peopel">
        <div class="title">
            <!-- <img src="../../assets/img/ic_back.png" alt=""> -->
            <span>账户明细</span>
        </div>
        <div class="wrapper">
            <div class="item">
                <span class="name">交易金额（元）</span>
                <input type="text"  v-model="list.recharge" disabled>
            </div>
            <div class="item">
                <span class="name">分润金额（元）</span>
                <input type="text"  v-model="list.bonus" disabled>
            </div>
            <div class="item">
                <span class="name">账户余额（元）</span>
                <input type="text" v-model="list.total" disabled>
            </div>
        </div>

        <div class="btn" @click="save">提现</div>
        <div class="maks" v-if="showBox"></div>
        <div class="box">
            <div class="box-wrapper" v-if="showBox">
                <div class="box-title">提现金额（元）</div>
                <div><input type="text" placeholder="提现金额（元）" v-model="money"></div>
                <div><input type="text" placeholder="账号密码" v-model="pw"></div>
                <div class="btn-wrapper" >
                    <div class="box-btn" @click="getDeposit" >确定</div>
                    <div class="box-btn" @click="out">取消</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { merInfo,deposit } from '../../config/api'
export default {
    name: 'merList',
    data() {
        return{
            rePw: '',
            list: {},
            money: '',
            pw: '',
            showBox: false
        }
    },
    methods: {
        getMerInfo() {
            let data = {
                user_id: localStorage.id
            }
            merInfo(data).then((res) => {
                console.log(res)
                this.list = res.data
                this.list.recharge = this.list.recharge/100
                this.list.bonus = this.list.bonus/100
                this.list.total = this.list.total/100
            })
        },
        save() {
            this.showBox = true
        },
        out() {
            this.showBox =false
        },
        getDeposit() {
            let data = {
                "user_id": localStorage.id,
                "money": this.money * 100,
                "password": this.pw
            }
            deposit(data).then((res) => {
                this.$message({
                    message: '请求成功，请等待审核',
                    type: 'success'
                });
                this.showBox = false
                console.log(res)
            })
        }
    },
    mounted() {
        this.getMerInfo()
    }
}
</script>

<style lang='sass' scoped>
.add-peopel
    color: #3D4060;
    .maks
        position: fixed
        left: 0
        top: 0
        background: rgba(0, 0, 0, .3)
        width: 100%
        z-index: 1
        height: 100%
    .title 
        font-size: 24px
        font-weight: bold
        padding-left: 30px
        img
            width: 35px
            height: 35px
    .wrapper
        padding: 40px 0 0 30px
        .item 
            margin-top: 30px
            font-size: 14px
            .name
                display: inline-block
                width: 180px
                font-size: 14px
                font-weight: bold
            input
                border: 1px solid #B1B3C1;
                border-radius: 2px;
                width: 240px    
                height: 40px
                line-height: 40px
                padding-left: 20px 
    .btn
        display: inline-block
        width: 150px
        height: 40px
        line-height: 40px
        background: #00BFA6;
        border-radius: 25px;
        color: #fff
        font-weight: bold
        font-size: 16px
        text-align: center
        margin-top: 100px
        margin-left: 30px
    .cancel
        background:  #B1B3C1
    .box-wrapper
        position: fixed
        top: 50%
        left: 50%
        margin-top: -175px
        margin-left: -150px
        z-index: 2
        width: 350px
        height: 350px
        background: #fff
        // margin-right: 250px
        border-radius: 5px
        padding: 50px 30px
        text-align: center
        .box-title 
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
            .box-btn
                width: 100px
                margin: 50px 20px 0 20px
                background: #00BFA6
                border: 1px solid #B1B3C1;
                border-radius: 2px;
                color: #fff
                height: 40px
                font-size: 16px
                line-height: 40px
</style>