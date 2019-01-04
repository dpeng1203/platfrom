<template>
  <div class="login">
    <div class="wrapper">
      
      <div v-show="check">
        <div class="title">Alian支付</div>
        <div><input type="number" placeholder="金额" v-model="money"></div>
        <el-checkbox v-model="form.discount" @change='form.discount2 = !form.discount'>
          <img src="../assets/img/zfb.jpg" alt="" class="img-logo"> 支付宝
        </el-checkbox>
        <el-checkbox v-model="form.discount2" @change='form.discount = !form.discount2'>
          <img src="../assets/img/wx.jpg" alt=""  class="wx-logo"> 微信
        </el-checkbox>
        <div class="btn" @click="pay">支付</div>
      </div>

      <div v-show="!check">
        <div class="title">
          <img src="../assets/img/zfb.jpg" alt="" class="z-logo" v-if="pType == '支付宝'"> 
          <img src="../assets/img/wx.jpg" alt="" class="w-logo" v-if="pType == '微信'">
          {{`${pType}支付: ${money}元`}}
        </div>
        <div id="qrcode" ref="qrcode"></div>
        <div class="btn2" @click="confirm">确认付款</div>
        <div class="btn2" @click="back">返回</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {hex_md5} from '../assets/js/md5.js'
  import {myPost, myGet, myDelete, myPut} from '../config/axioxLoading'
  import  Qrcode from 'qrcodejs2'
  export default {
    name: 'cnt',
    data() {
      return {
        check: true,
        money: '',
        form: {
          discount: true,
          discount2: "",
          token: ""
        },
        orderId:'',
        submit: false,
        pType:''
      }
    },
    components: {
      Qrcode
    },
    methods: {
      back(){
        this.check=true;
        document.getElementById('qrcode').innerHTML = '';
      },
      confirm(){
        let mch_id = 1024;
        let key = "97c8890018a34498bc3ab87484d9778e";
        let sginStr = "mch_id=1024&mch_order_id=" + this.orderId + "&key=" + key;
        let hexMd5 = hex_md5(sginStr);
        let param={
          "mch_id":mch_id,
          "sign":hexMd5,
          "mch_order_id": this.orderId,
        }

        myPost("/pay/confirm", param).then(res => {
          console.info(res);
          if (res.code == 'A000') {
            alert(res.message);
            this.check=true;
          } else {
            alert(res.message)
          }
          document.getElementById('qrcode').innerHTML = ''
        })
        // mch_id=1024&mch_order_id=201901041424211546583061908&
      },
      qrcode (url) {
        let qrcode = new Qrcode('qrcode',{
          width: 280, // 设置宽度，单位像素
          height: 250, // 设置高度，单位像素
          text: url  // 设置二维码内容或跳转地址
        })
      },
      pay() {
        if (this.money == '') {
          this.$message.error('请输入金额')
          return;
        }
        let pay_type = this.form.discount2 ? 'wx' : 'alipay';
        this.pType = pay_type == 'wx' ? '微信': '支付宝'
        console.info(pay_type)
        let money = this.money * 100;
        let mch_id = 1024;
        let mch_order_id = new Date().getTime();
        this.orderId=mch_order_id;
        let key = "97c8890018a34498bc3ab87484d9778e";
        let trade_type = "native";
        let version = "1.1";
        let sginStr = "mch_id=1024&mch_order_id=" + mch_order_id + "&money=" + money + "&pay_type=" + pay_type + "&trade_type=native&version=1.1&key=" + key;
        console.info(sginStr)
        let hexMd5 = hex_md5(sginStr);
        let param = {
          "mch_id": mch_id,
          "mch_order_id": mch_order_id,
          "trade_type": trade_type,
          "pay_type": pay_type,
          "sign": hexMd5,
          "version": version,
          "money": money
        }
        myPost("/pay/order", param).then(res => {
          console.info(res);
          if (res.data.code == 'A000') {
            console.info(res.data);
            this.check = false;
            this.$nextTick(() => {
              this.qrcode(res.data);
            })
          } else {
            alert(res.message)
          }
        })
      }
    }
  }
</script>

<style lang="sass" scoped>
  .login
    background: #00BFA6
    min-width: 100%
    height: 100vh
    display: flex
    align-items: center

    .img-wrapper
      flex: 1
      text-align: center

    .wrapper
      width: 350px
      min-height: 380px
      background: #fff
      margin: auto
      border-radius: 5px
      padding: 30px 30px
      text-align: center

      .title
        margin-top: 10px
        font-size: 20px
        font-weight: bold
        padding-bottom: 15px
      .img-logo
        width: 15px
      .wx-logo
        width: 20px
      .z-logo
        width: 30px
      .w-logo
        width: 40px
      input
        border: 1px solid #B1B3C1;
        border-radius: 2px;
        font-size: 16px
        width: 100%
        height: 40px
        line-height: 40px
        margin-top: 20px
        padding-left: 20px

      .verify
        margin-top: 20px

      .btn
        margin-top: 10px
        background: #00BFA6
        border: 1px solid #B1B3C1
        border-radius: 2px
        color: #fff
        height: 40px
        font-size: 16px
        line-height: 40px
        margin-top: 100px
      .btn2
        margin-top: 30px
        background: #00BFA6
        border: 1px solid #B1B3C1
        border-radius: 2px
        color: #fff
        height: 40px
        font-size: 16px
        line-height: 40px
        display: inline-block
        width: 100px
</style>
