<template>
    <div class="data-detail">
        <div class="stat-wrapper">
            <div class="data-wrapper">
                <div class="title">
                    <span>最新数据</span>
                </div>
                <div class="box-wrapper">
                    <div class="box">
                        <div class="box-title">今日成功收款（元）</div>
                        <ul class="scss"><li>{{sum.smoney}}</li></ul>
                    </div>
                    <div class="box">
                        <div class="box-title">今日成功订单量</div>
                        <ul class="scss"><li>{{sum.scount}}</li></ul>
                    </div>
                </div>
                <div class="box-wrapper">
                    <div class="box">
                        <div class="box-title">今日未成功收款（元）</div>
                        <ul class="fail"><li>{{sum.fmoney}}</li></ul>
                    </div>
                    <div class="box">
                        <div class="box-title">今日未成功订单量</div>
                        <ul class="fail"><li>{{sum.fcount}}</li></ul>
                    </div>
                </div>
                <div class="box-wrapper small-box-wrapper">
                    <div class="box small-box">
                        <div class="box-title">总收款（元）</div>
                        <ul class="money"><li>{{sum.tmoney}}</li></ul>
                    </div>
                    <div class="box small-box">
                        <div class="box-title">已出款（元）</div>
                        <ul class="money"><li>{{sum.cmoney}}</li></ul>
                    </div>
                    <div class="box small-box">
                        <div class="box-title">未出款（元）</div>
                        <ul class="money"><li>{{sum.rmoney}}</li></ul>
                    </div>
                </div>
            </div>
            <div class="data-wrapper">
                <div class="title">
                    <span>分润统计： </span>
                    <el-select v-model="value" placeholder="请选择" class="select" @change="bonusDate">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </div>
                <div class="box-wrapper">
                    <div class="box bonus-box" v-if="zhifuBonus.length!==0">
                        <div class="box-title">支付子账号：</div>
                        <ul>
                            <li class="child" v-for="item in zhifuBonus" :key="item.sub_id">
                                <span>{{item.sub_id}}</span>
                                <span class="money">分润金额：{{item.money}} 元</span>
                            </li>
                        </ul>
                        
                        <div class="total">总分润金额： <span class="money">{{zhifuTotal}}</span> 元</div>
                    </div>
                    <div class="box bonus-box" v-if="daifuBonus.length!==0">
                        <div class="box-title">代付子账号：</div>
                        <ul>
                            <li class="child" v-for="item in daifuBonus" :key="item.sub_id">
                                <span>{{item.sub_id}}</span>
                                <span class="money">分润金额：{{item.money}} 元</span>
                            </li>
                        </ul>
                        <div class="total">总分润金额：<span class="money">{{daifuTotal}}</span> 元 </div>
                    </div>
                </div>
                
            </div>
        </div>
        <div>
            <div class="chart-wrapper" >
                <div class="chart-title">每小时交易金额</div>
                <div class="chart-ct">
                    <div id="c1"></div>
                </div>
            </div>
        </div>
        <div>
            <div class="chart-wrapper" >
                <div class="chart-title">每小时交易数量</div>
                <div class="chart-ct">
                    <div id="c2"></div>
                </div>
            </div>
        </div>
        
        
    </div>
       
</template>

<script>
import { chartData,statsTotal,bonusStat } from '../../config/api'
import G2 from '@antv/g2';
export default {
    data() {
        return{
            serverData: [],
            sum: {},
            options: [
                {value: '0d',label: '今天'},{value: '1d',label: '昨天'},{value: '3d',label: '最近3天'},{value: '7d',label: '最近一周'},
                {value: '1m',label: '最近一月'},{value: '3m',label: '最近三月'},{value: '1y',label: '最近一年'}
            ],
            value: '0d',
            zhifuBonus: [],
            zhifuTotal: '',
            daifuBonus: [],
            daifuTotal: '',
        }
    },
    methods:{
        getMoneyChart() {
            var chart = new G2.Chart({
                container: 'c1',
                forceFit: true,
                height: 300,
                padding: [ 20, 20, 95, 80 ]
            });
            chart.source(this.serverData, {
                hour: {
                    range: [0, 1]
                }                
            });
            chart.tooltip({
                crosshairs: {
                    type: 'line'
                }
            });
            chart.axis('sum', {
                label: {
                    formatter: function formatter(val) {
                        return val + '万元';
                    }
                }
            });
            chart.axis('hour', {
                label: {
                    formatter: function formatter(val) {
                        return val + '时';
                    }
                }
            });
            chart.line().position('hour*sum').color('status');
            chart.point().position('hour*sum').color('status').size(4).shape('circle').style({
                stroke: '#fff',
                lineWidth: 1
            });
            chart.render();
        },
        getOrderChart() {
            var chart = new G2.Chart({
                container: 'c2',
                forceFit: true,
                height: 300,
                padding: [ 20, 20, 95, 80 ]
            });
            chart.source(this.serverData, {
                hour: {
                    range: [0, 1]
                }                
            });
            chart.tooltip({
                crosshairs: {
                    type: 'line'
                }
            });
            chart.axis('count', {
                label: {
                    formatter: function formatter(val) {
                        return val + '笔';
                    }
                }
            });
            chart.axis('hour', {
                label: {
                    formatter: function formatter(val) {
                        return val + '时';
                    }
                }
            });
            chart.line().position('hour*count').color('status');
            chart.point().position('hour*count').color('status').size(4).shape('circle').style({
                stroke: '#fff',
                lineWidth: 1
            });
            chart.render();
        },

        //精确js加法运算
        add(num1, num2) {
            const num1Digits = (num1.toString().split('.')[1] || '').length;
            const num2Digits = (num2.toString().split('.')[1] || '').length;
            const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
            return (num1 * baseNum + num2 * baseNum) / baseNum;
        },

        //分润统计
        bonusDate() {
            let data = {
                mch_id: localStorage.id
            }
            bonusStat(this.value,data).then(res => {
                this.zhifuBonus = []
                this.zhifuTotal= 0
                this.daifuBonus = []
                this.daifuTotal = 0
                let bonusDate = res.data
                bonusDate.forEach(ele => {
                    if(ele.zhifu.length!==0) {
                        ele.zhifu[0].money = ele.zhifu[0].money/100
                        this.zhifuBonus.push(ele.zhifu[0])
                        this.zhifuTotal = this.add(this.zhifuTotal,ele.zhifu[0].money) 
                    }
                    if(ele.daifu.length!==0) {
                        ele.daifu[0].money = ele.daifu[0].money/100
                        this.daifuBonus.push(ele.daifu[0])
                        this.daifuTotal = this.add(this.daifuTotal,ele.daifu[0].money) 
                    }
                })
            })
        },
        //最新统计
        getData() {
            
            let data = {
                mch_id: localStorage.id
            }
            statsTotal(data).then( res => {
                this.sum = res.data
                this.sum.smoney = this.sum.smoney/100
                this.sum.fmoney = this.sum.fmoney/100
                this.sum.tmoney = this.sum.tmoney/100
                this.sum.cmoney = this.sum.cmoney/100
                this.sum.rmoney = this.sum.rmoney/100
            })
            chartData(data).then( res => {
                this.serverData = res.data
                this.serverData.forEach( ele => {
                    ele.sum = ele.sum/100/10000
                    if(ele.status == 3) {
                        ele.status = '交易成功'
                    }else if(ele.status == 1) {
                        ele.status = '待支付'
                    }else {
                        ele.status = '交易失败'
                    }
                })
                this.getMoneyChart()
                this.getOrderChart()
            })
        }
    },
    mounted() {
        this.getData()
        this.bonusDate()
    }
}
</script>

<style lang='sass' scoped>
.data-detail
    color: #3D4060;
    padding-left: 30px
    .stat-wrapper
        display: flex
        align-items: first
        margin-left: -10px
        .data-wrapper
            padding: 30px
            margin-left: 10px
            display: inline-block
            background: #eee
            box-shadow: 0 1px 2px 0 rgba(0,0,0,.05)
            border-radius: 10px
            .title 
                font-size: 15px
                // font-weight: bold
                .select
                    width: 180px
            .box-wrapper
                padding-top: 10px
                display: flex
                margin-left: -20px
                .box
                    width: 225px
                    background: #fff
                    margin-left: 20px
                    border-radius: 10px
                    padding: 15px 15px
                    .box-title
                        font-size: 13px
                        color: #999
                    .child
                        font-size: 14px
                        // color: #999
                        .money
                            margin-left: 5px
                    .total
                        font-size: 16px
                        margin-top: 10px
                    ul
                        font-size: 24px
                        line-height: 24px
                        color: #ff5722
                        margin-top: 10px
                        list-style: disc
                        margin-left: 25px
                    .scss
                        color: #3ccd3f
                    .money 
                        color: #1E90FF
                .bonus-box
                    width: 250px
                    height: 240px
                    overflow: auto
            .small-box-wrapper
                margin-left: -10px
                .small-box
                    width: 150px
                    margin-left: 10px

    .chart-wrapper
        padding: 30px   
        margin-top: 10px
        display: inline-block
        background: #eee
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.05)
        border-radius: 10px
        .chart-title
            font-size: 15px
            // font-weight: bold
            padding: 0 0 10px 0
        .chart-ct
            background: #fff
            border-radius: 10px
            width: 800px
            padding-top: 30px
            padding-right: 35px
            
</style>
