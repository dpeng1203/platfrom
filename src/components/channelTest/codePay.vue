<template>
    <div class="code-pay">
        <div class="title">
            <span>个码支付</span>
        </div>   
        <p>商品信息</p>
        <div>
            <img src="../../assets/img/timg.jpg" alt=""> 
        </div>
        <el-input v-model="input" placeholder="请输入金额" class="el-input"></el-input>
        <div class="btn" @click="toPay">支付</div>
        <div ref="formJump"></div>
        <div>
            <!-- <iframe v-for="item in result1" :id='"if"+item' src="../../../static/test.html"  height="300" width="30%" scrolling="auto"></iframe> -->
        </div>
    </div>    
</template>

<script>
import hostName from '../../config/hostName'
import {hex_md5} from '../../assets/js/md5.js'
import { payOrder } from '../../config/api'
export default {
    data() {
        return{
            input: '',
            result: [],
            result1: [1],
            html: ''
        }
    },
    methods: {
        //生成订单号
        randomString() {  
		　　var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		　　var maxPos = $chars.length;  
		　　var pwd = '';  
		　　for (var i = 0; i < 30; i++) {  
		        //0~32的整数  
		　　　　pwd += $chars.charAt(Math.floor(Math.random() * (maxPos+1)));  
        　　}  
        　　return pwd; 
		},

        //  ASCII字典序排序
        sort_ASCII(obj){
            var arr = new Array();
            var num = 0;
            for (var i in obj) {
                arr[num] = i;
                num++;
            }
            var sortArr = arr.sort();
            var sortObj = {};
            for (var i in sortArr) {
                sortObj[sortArr[i]] = obj[sortArr[i]];
            }
            return sortObj;
        },

        toPay() {
            // if(this.input < 100 || this.input > 10000) {
            //     this.$message.error('交易金额限制：支付宝 100 -9999 元');
            //     return false
            // }
            let num = this.randomString()
            let money = this.input*100
            let data = {
                mch_id: localStorage.id,
                mch_order_id: num,
                money: money,
                pay_type: 'alipay',
                trade_type: 'wap',
                notify_url: `${hostName}/pay/notify/test`,
            }
            let sortData = this.sort_ASCII(data)
            let dataStr = ''
            Object.keys(sortData).map((key)=>{
                dataStr += key + '=' + sortData[key] +'&';    
            })
            dataStr += 'key=97c8890018a34498bc3ab87484d9778e'
            data.sign=hex_md5(dataStr).toUpperCase()
            payOrder(data).then( res => {
                if(res.data.code == 'A000' && res.data.type == 'form') {
                    this.$refs.formJump.innerHTML = res.data.data
                    var _form = document.forms['payform']
                    _form.submit()
                } else if( res.data.code == 'A000' && res.data.type == 'url' ){
                    window.location.href = res.data.data
                } else{
                    this.$message.error(res.data.message)
                }
            })
        },

    }

}
</script>

<style lang='sass' scoped>
.code-pay
    padding-left: 30px
    .title 
        font-size: 24px
        font-weight: bold
        
    p
        margin-top: 20px
        font-size: 14px
    img
        width: 450px
        height: 350px
        margin-top: 10px
    .el-input
        width: 220px
        margin-top: 30px
    .btn
        display: block
        padding: 0 40px
        width: 160px
        height: 45px
        line-height: 45px
        background: #00BFA6;
        border-radius: 25px;
        color: #fff
        font-weight: bold
        font-size: 16px
        text-align: center
        margin: 50px 0  
    .show
        border: 1px solid red
        margin-top: 20px
        margin-right: 20px
        display: inline-block
        padding: 0 30px
</style>
