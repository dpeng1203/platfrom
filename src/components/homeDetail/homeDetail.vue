<template>
    <div class="data-detail">
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
import { chartData,statsTotal } from '../../config/api'
import G2 from '@antv/g2';
export default {
    data() {
        return{
            serverData: [],
            sum: {}
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
    }
}
</script>

<style lang='sass' scoped>
.data-detail
    color: #3D4060;
    padding-left: 30px
    .data-wrapper
        padding: 30px
        display: inline-block
        background: #eee
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.05)
        border-radius: 10px
        .title 
            font-size: 15px
            // font-weight: bold
        .box-wrapper
            padding-top: 10px
            display: flex
            margin-left: -20px
            .box
                width: 300px
                background: #fff
                margin-left: 20px
                border-radius: 10px
                padding: 15px 30px
                .box-title
                    font-size: 13px
                    color: #999
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
        .small-box-wrapper
            margin-left: -10px
            .small-box
                width: 200px
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
