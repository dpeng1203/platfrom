<template>
    <div class="data-detail">
        <div class="title">
            <span>最新数据</span>
        </div>
        <div class="box-wrapper">
            <div class="box">
                <div class="box-title">今日成功收款（元）</div>
                <ul class="scss"><li>1234</li></ul>
            </div>
            <div class="box">
                <div class="box-title">今日成功订单量</div>
                <ul class="scss"><li>1234</li></ul>
            </div>
        </div>
        <div class="box-wrapper">
            <div class="box">
                <div class="box-title">今日未成功收款（元）</div>
                <ul class="fail"><li>1234</li></ul>
            </div>
            <div class="box">
                <div class="box-title">今日未成功订单量</div>
                <ul class="fail"><li>1234</li></ul>
            </div>
        </div>
        <div class="box-wrapper small-box-wrapper">
            <div class="box small-box">
                <div class="box-title">总收款（元）</div>
                <ul class="money"><li>1234</li></ul>
            </div>
            <div class="box small-box">
                <div class="box-title">已出款（元）</div>
                <ul class="money"><li>1234</li></ul>
            </div>
            <div class="box small-box">
                <div class="box-title">未出款（元）</div>
                <ul class="money"><li>1234</li></ul>
            </div>
        </div>
        <div class="chart-title">每小时交易数</div>
        <div class="chart-ct">
            
            <div id="c2"></div>
        </div>
        
    </div>
       
</template>

<script>
import G2 from '@antv/g2';
export default {
    data() {
        return{
            serverData: [{
                "month": "Jan",
                "city": "Tokyo",
                "temperature": 7
                }, {
                "month": "Jan",
                "city": "London",
                "temperature": 3.9
                }, {
                "month": "Feb",
                "city": "Tokyo",
                "temperature": 6.9
                }, {
                "month": "Feb",
                "city": "London",
                "temperature": 4.2
                }, {
                "month": "Mar",
                "city": "Tokyo",
                "temperature": 9.5
                }, {
                "month": "Mar",
                "city": "London",
                "temperature": 5.7
                }, {
                "month": "Apr",
                "city": "Tokyo",
                "temperature": 14.5
                }, {
                "month": "Apr",
                "city": "London",
                "temperature": 8.5
                }, {
                "month": "May",
                "city": "Tokyo",
                "temperature": 18.4
                }, {
                "month": "May",
                "city": "London",
                "temperature": 11.9
                }, {
                "month": "Jun",
                "city": "Tokyo",
                "temperature": 21.5
                }, {
                "month": "Jun",
                "city": "London",
                "temperature": 15.2
                }, {
                "month": "Jul",
                "city": "Tokyo",
                "temperature": 25.2
                }, {
                "month": "Jul",
                "city": "London",
                "temperature": 17
                }, {
                "month": "Aug",
                "city": "Tokyo",
                "temperature": 26.5
                }, {
                "month": "Aug",
                "city": "London",
                "temperature": 16.6
                }, {
                "month": "Sep",
                "city": "Tokyo",
                "temperature": 23.3
                }, {
                "month": "Sep",
                "city": "London",
                "temperature": 14.2
                }, {
                "month": "Oct",
                "city": "Tokyo",
                "temperature": 18.3
                }, {
                "month": "Oct",
                "city": "London",
                "temperature": 10.3
                }, {
                "month": "Nov",
                "city": "Tokyo",
                "temperature": 13.9
                }, {
                "month": "Nov",
                "city": "London",
                "temperature": 6.6
                }, {
                "month": "Dec",
                "city": "Tokyo",
                "temperature": 9.6
                }, {
                "month": "Dec",
                "city": "London",
                "temperature": 4.8
                }],
        }
    },
    methods:{
        getChart() {
            var chart = new G2.Chart({
                container: 'c2',
                forceFit: true,
                height: 300,
                padding: [ 20, 20, 95, 80 ]
            });
            chart.source(this.serverData, {
                month: {
                    range: [0, 1]
                }
            });
            chart.tooltip({
                crosshairs: {
                    type: 'line'
                }
            });
            chart.axis('temperature', {
                label: {
                    formatter: function formatter(val) {
                        return val + '°C';
                    }
                }
            });
            chart.line().position('month*temperature').color('city');
            chart.point().position('month*temperature').color('city').size(4).shape('circle').style({
                stroke: '#fff',
                lineWidth: 1
            });
            chart.render();
        }
    },
    mounted() {
        this.getChart()
    }
}
</script>

<style lang='sass' scoped>
.data-detail
    color: #3D4060;
    padding-left: 30px
    .title 
        font-size: 24px
        font-weight: bold
    .box-wrapper
        padding-top: 10px
        display: flex
        margin-left: -20px
        .box
            width: 300px
            background: #eee
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
    .chart-title
        font-size: 24px
        font-weight: bold
        padding: 30px 0 10px 0
    .chart-ct
        background: #eee
        border-radius: 10px
        width: 800px
        padding-top: 30px
        padding-right: 35px
        margin-bottom: 100px
</style>
