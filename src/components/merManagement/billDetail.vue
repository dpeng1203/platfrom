<template>
    <div class="bill-detail">
        <div class="title">
            <span>交易明细</span>
        </div>
        <!-- <div class="num-wrapper">
            <div class="num">今日成交金额：<span>{{ total }}</span> 元</div>
            <div class="num">今日成交笔数：<span>{{ count }}</span> 笔</div>
        </div> -->
        <div class="search">
            <div class="search-ct">
                <div class="search-name">状态</div>
                <el-select v-model="data.status" placeholder="请选择">
                    <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <!-- <div class="search-ct">
                <div class="search-name">商户订单号</div>
                <el-input class="inline-input" v-model="data.mch_order_id" placeholder="请输入商户订单号"></el-input>
            </div> -->
             <div class="search-ct">
                <div class="search-name">系统订单号</div>
                <el-input class="inline-input" v-model="data.sys_order_id" placeholder="请输入系统订单号"></el-input>
            </div>
            <div class="search-ct">
                <div class="search-name">交易时间</div>
                <el-date-picker
                    v-model="date1"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </div>
        </div>
        <div class="search">
           
            <div class="search-ct">
                <div class="search-name">支付类型</div>
                <el-select v-model="data.pay_type" placeholder="请选择">
                    <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="search-ct">
                <div class="search-name">开始时间</div>
                <el-date-picker
                    v-model="date2"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
                <!-- <div class="search-btn">搜索</div> -->
            </div>
            <div class="search-ct">
                <div class="search-name">结束时间</div>
                <el-date-picker
                    v-model="date3"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
                <div class="search-btn" @click="searchBtn">搜索</div>
            </div>
        </div>
        <div class="table">
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                    type="index"
                    width="50">
                </el-table-column>
                <el-table-column
                    prop="mch_name"
                    label="商户名称"
                    width="180">
                </el-table-column>
                
                <el-table-column
                    prop="sys_order_id"
                    label="系统订单号"
                    width="220">
                </el-table-column>
                <el-table-column
                    prop="pay_type"
                    label="支付类型"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="money"
                    label="金额"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="mch_charge"
                    label="手续费"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="create_time"
                    label="创建时间"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="state"
                    label="状态"
                    width="100">
                </el-table-column>
                <el-table-column
                label="操作"
                >
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
                </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10,20,50,100, 200, 300, 400]"
                    :page-size="data.limit"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total_count">
                </el-pagination>
            </div>
        </div>
        
    </div>
</template>

<script>
import changeData from '../../config/formatData'
import { todayNum,billList } from '../../config/api'
export default {
    name: "billDetail",
    data() {
        return{
            total_count: 0,
            currentPage: 1,
            total: '',
            count: '',
            options1: [{
                value: '',
                label: '请选择'
                },{
                value: '1',
                label: '新订单'
                }, {
                value: '2',
                label: '进行中'
                }, {
                value: '3',
                label: '交易成功'
                }, {
                value: '4',
                label: '交易失败'
                }],
            options2: [{
                value: '',
                label: '请选择'
                },{
                value: 'alipay',
                label: '支付宝'
                }, {
                value: 'wx',
                label: '微信'
                }],
            date1: '',
            date2: '',
            date3: '',
            data: {
                status: null,
                mch_order_id: null,
                sys_order_id: null,
                pay_type: null,
                mch_id: localStorage.id,
                offset: 0,
                limit: 10
            },
            tableData: []
        }
    },
    methods: {
        getTodayNum() {
            let data = {
                mch_id: localStorage.id
            }
            todayNum(data).then((res) => {
                console.log(res)
                this.total = Number(res.data.total)/100
                this.count = res.data.count
            })
        },
        searchBtn() {
            if(this.date1 != '') {
                this.data.trade_time  = this.date1
            }
            if(this.date2 != '') {
                this.data.start_time = this.date2
            }
            if(this.date3 != '') {
                this.data.end_time = this.date3
            }
            this.getBillList()
        },
        getBillList() {
            billList(this.data).then((res) => {
                console.log(res)
                this.tableData = res.data.data_list
                this.tableData.forEach( ele => {
                    if(ele.money && ele.money != '') {
                        ele.money = ele.money/100
                    }
                    if(ele.mch_charge && ele.mch_charge != '') {
                        ele.mch_charge = ele.mch_charge/100
                    }
                    if( ele.create_time ) {
                        ele.create_time = changeData(ele.create_time)
                    }
                })
                this.total_count = res.data.total_count
            })
        },

        handleClick(row) {
            this.$router.push({path: '/home/oneBillDetail',query: {billInfo: row}})
        },
        
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.data.limit = val
            this.getBillList()
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.data.offset = (val -1) * this.data.limit
            this.getBillList()
        }
    },
    mounted() {
        console.log(this.currentPage)
        // this.getTodayNum()
        this.getBillList()
    }

}
</script>

<style lang='sass' scoped>
.bill-detail
    color: #3D4060;
    padding-left: 30px
    .title 
        font-size: 24px
        font-weight: bold
    .num-wrapper
        margin-top: 30px
        font-size: 18px
        .num
            margin-top: 15px
            font-size: 14px
            span
                color: red
    .search
        display: flex
        margin-top: 20px
        .search-ct
            margin-left: 60px
            .search-name
                font-size: 12px
                line-height: 18.2px
                padding-bottom: 10px
            input
                margin-top: 10px
                border: 1px solid #B1B3C1
                border-radius: 2px
                width: 200px
                height: 40px
                line-height: 40px
                padding: 20px
                font-size: 14px
                background: #fff
            .inline-input
                width: 220px

            .search-btn
                display: inline-block
                width: 100px
                height: 35px
                line-height: 35px
                text-align: center
                color: #fff
                background: #00BFA6;
                border-radius: 25px;
                font-size: 14px
                margin: 0 0 0 60px
        .search-ct:first-child
            margin-left: 0
           
    .table
        margin-top: 40px
        width: 1130px
        .block
            padding: 30px 0
            text-align: center 
</style>
