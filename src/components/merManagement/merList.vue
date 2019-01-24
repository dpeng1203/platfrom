<template>
    <div class="add-peopel">
        <div class="title">
            <span>账户明细</span>
        </div>
        <div class="wrapper">
            <div class="item">
                <span class="name">交易金额（元）:</span>
                <span>{{list.recharge}}</span>
            </div>
            <div class="item">
                <span class="name">分润金额（元）:</span>
                <span>{{list.bonus}}</span>
            </div>
            <div class="item">
                <span class="name">在途金额（元）:</span>
                <span>{{list.pending}}</span>
            </div>
            <div class="item">
                <span class="name">账户余额（元）:</span>
                <span>{{list.total}}</span>
            </div>
            <div class="item">
                <span class="name">代付金额（元）:</span>
                <span>{{list.reservoir}}</span>
            </div>
            <div class="btn" @click="save">提现</div>
            <div class="btn" @click="sentPay" v-if="id == 1067 || id == 1091">发起代付</div>
        </div>

        <!-- <div class="wrapper">
            <div class="item">
                <span class="name">代付金额（元）:</span>
                <span>{{list.reservoir}}</span>
            </div>
            <div class="item">
                <span class="name"></span>
                <span></span>
            </div>
            <div class="item">
                <span class="name"></span>
                <span></span>
            </div>
            <div class="item">
                <span class="name"></span>
                <span></span>
            </div>
            <el-tooltip content="已接入系统代付，将账户余额转入代付池，不可回转" placement="top" effect="light">
                <div class="btn" @click="rollIn">转入</div>
            </el-tooltip>
            <el-tooltip content="适用于已接入系统代付的商户提现下发" placement="top" effect="light">
                <div class="btn" @click="sentPay" v-if="id == 1067">发起代付</div>
            </el-tooltip>
        </div> -->

        <div class="maks" v-if="showBox"></div>
        <div class="box">
            <div class="box-wrapper" v-if="showBox">

                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="到银行卡" name="first">
                        <el-select v-model="value6" placeholder="请选择" style="width: 100%" @change="changeBank">
                            <el-option
                                v-for="item in cities"
                                :key="item.value"
                                :label="item.label"
                                :value="item.bankcard_number">
                                <span style="float: left">{{ item.open_bank }}</span>
                                <span style="float: left;margin-left: 80px">{{ item.bankcard_number }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
                            </el-option>
                        </el-select>
                        <div><input type="text" placeholder="开户行（**银行）" v-model="data.open_bank" class="add_color"></div>
                        <div><input type="text" placeholder="开户支行（**省**市**支行）" v-model="data.sub_bank" class="add_color"></div>
                        <div><input type="text" placeholder="银行卡号" v-model="data.bankcard_number" class="add_color"></div>
                        <div><input type="text" placeholder="姓名" v-model="data.name" class="add_color"></div>
                        <div><input type="text" placeholder="提现金额（元）" v-model="money" class="add_color" ></div>
                        <div><input type="password" placeholder="账户密码" v-model="data.password" class="add_color"></div>
                        <!-- <div><input type="text" placeholder="身份证（选填）" v-model="data.identity_card"></div>
                        <div><input type="text" placeholder="预留手机（选填）" v-model="data.reserve_phone"></div> -->
                    </el-tab-pane>      
                    <el-tab-pane label="转入代付" name="second">
                        <div><input type="text" placeholder="提现金额（元）" v-model="rollMoney" class="add_color" ></div>
                        <div><input type="password" placeholder="账户密码" v-model="rollPw" class="add_color"></div>
                        <div><input type="text" value="先锋支付有限公司备付金"  disabled></div>
                        <div><input type="text" value="0000300000000236"  disabled></div>
                        <div><input type="text" value="中国银联股份有限公司"  disabled></div>
                        
                    </el-tab-pane>
                </el-tabs>
                <div class="btn-wrapper" >
                    <div class="box-btn" @click="sure" >确定</div>
                    <div class="box-btn" @click="out">取消</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { merInfo,deposit,converMoney,cashList } from '../../config/api'
export default {
    name: 'merList',
    data() {
        return{
            id: localStorage.id,
            activeName: 'first',
            list: {},
            money: '',
            rollMoney: '',      //转入金额
            rollPw: '',         //转入密码
            showBox: false,
            data: {
                password: '',
                open_bank: '',
                sub_bank: '',
                bankcard_number: '',
                name: '',
                identity_card: '',
                reserve_phone: ''
            },

            cities: [],
            value6: ''
        }
    },
    methods: {
        handleClick(tab, event) {
            // console.log(tab, event);
            // console.log(this.activeName)
        },
        getMerInfo() {
            let data = {
                mch_id: localStorage.id
            }
            merInfo(data).then((res) => {
                this.list = res.data
                this.list.recharge = this.list.recharge/100
                this.list.bonus = this.list.bonus/100
                this.list.total = this.list.total/100
                this.list.pending = this.list.pending/100
                this.list.reservoir = this.list.reservoir/100
            })
        },
        //转入代付
        rollIn() {
            if(this.rollMoney == '') {
                this.$message.error('请输入转入金额')
                return false
            }
            if(this.rollPw == '') {
                this.$message.error('请输入转入密码')
                return false
            }
            let data = {
                mch_id: localStorage.id,
                money: this.rollMoney * 100,
                password: this.rollPw,
                open_bank: '其他/中国银联股份有限公司',
                bankcard_number: '0000300000000236',
                name: '先锋支付有限公司备付金'
            }
            deposit(data).then((res) => {
                this.$message({
                    message: '请求成功，请等待审核',
                    type: 'success'
                });
                this.getMerInfo()
                this.showBox = false
            })
        },
        //发起代付
        sentPay() {
            this.$router.push('/home/sentPay')
        },
        save() {
            this.showBox = true
            cashList().then( res => {
                this.cities = res.data.list
            })
        },

        changeBank(item) {
            console.log(item)
            let bankItem = this.cities.filter(ele => {
                return ele.bankcard_number = item
            })
            this.data.open_bank = bankItem[0].open_bank
            this.data.bankcard_number = bankItem[0].bankcard_number
            this.data.name = bankItem[0].name
            this.data.sub_bank = bankItem[0].sub_bank

        },
        out() {
            this.showBox =false
        },
        //提现确认
        sure() {
            if(this.activeName == 'first') {
                this.getDeposit()
            }else if(this.activeName == 'second') {
                this.rollIn()
            }
        },
        //到银行卡
        getDeposit() {
            if(this.money == '') {
                this.$message.error('请输入提现金额')
                return false
            }
            if(this.data.password == '') {
                this.$message.error('请输入密码')
                return false
            }
            if(this.data.open_bank == '') {
                this.$message.error('请输入开户行')
                return false
            }
            if(this.data.sub_bank == '') {
                this.$message.error('请输入开户支行')
                return false
            }
            if(this.data.bankcard_number == '') {
                this.$message.error('请输入银行卡号')
                return false
            }
            if(this.data.name == '') {
                this.$message.error('请输入姓名')
                return false
            }
            this.data.money = this.money * 100
            this.data.mch_id = localStorage.id
            deposit(this.data).then((res) => {
                this.getMerInfo()
                this.$message({
                    message: '请求成功，请等待审核',
                    type: 'success'
                });
                this.showBox = false
            })
        },
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
        display: inline-block
        padding: 40px 0 0 30px
        width: 400px
        .item 
            margin-top: 30px
            font-size: 14px
            .name
                display: inline-block
                width: 120px
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
        margin-top: 80px
        margin-right: 30px
    .cancel
        background:  #B1B3C1
    .box-wrapper
        position: fixed
        top: 30%
        left: 50%
        margin-top: -175px
        margin-left: -150px
        z-index: 2
        width: 500px
        // height: 350px
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
            margin-top: 10px
            padding-left: 20px
        .add_color
            border: 1px solid #00BFA6;
            background: #fff
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