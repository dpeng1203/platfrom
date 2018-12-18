<template>
    <div class="account-manage">
        <div class="title">
            <span>提现列表</span>
        </div>  
        <!-- <div class="search">
            <div class="search-ct">
                <div class="search-name">手机号</div>
                <el-input class="inline-input" v-model="data.phone" placeholder="请输入内容"></el-input>
            </div>
             <div class="search-ct">
                <div class="search-name">商户号</div>
                <el-input class="inline-input" v-model="data.mch_id" placeholder="请输入内容"></el-input>
                <div class="search-btn" @click="searchBtn">搜索</div>
            </div>
        </div> -->


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
                    prop="create_time"
                    label="创建时间"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="open_bank"
                    label="开户行"
                    width="130">
                </el-table-column>
                <el-table-column
                    prop="sub_bank"
                    label="开户支行"
                    width="220">
                </el-table-column>
                <el-table-column
                    prop="bankcard_number"
                    label="银行卡号"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="money"
                    label="金额(元)"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="state"
                    label="是否到账"
                   >
                </el-table-column>
                <!-- <el-table-column
                label="操作"
                >
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">到账</el-button>
                </template>
                </el-table-column> -->
            </el-table>
            <div class="block">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10,20,50,100, 200, 300, 400]"
                    :page-size="data.limit"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
import changeData from '../../config/formatData'
import { auditList,auditOk } from '../../config/api'
export default {
    name: 'cashList',
    data() {
        return{
            tableData: [],
            currentPage: 1,
            total: 0,
            data: {
                mch_id: localStorage.id,
                offset: 0,
                limit: 10
            }
        }
    },
    methods: {
        getList() {
            auditList(this.data).then((res) => {
                this.total = res.data.total_count
                this.tableData = res.data.data_list
                this.tableData.forEach( ele => {
                    if(ele.money && ele.money != '') {
                        ele.money = ele.money/100
                    }
                    if(ele.state == 1) {
                        ele.state = '提现成功'
                    }else if(ele.state == 2){
                        ele.state = '提现失败'
                    }else {
                        ele.state = '提现中'
                    }
                    if( ele.create_time ) {
                        ele.create_time = changeData(ele.create_time)
                    }
                })
            })
        },
        

        // searchBtn() {
        //     this.getList()
        // },

        // handleClick(row) {
        //     console.log(row);
        //     let data = {
        //         cash_log_id: row.id
        //     }
        //     auditOk(data).then(res => {
        //         this.getList()
        //     })
        // },

        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.data.limit = val
            this.getList()
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.data.offset = (val - 1) * this.data.limit
            this.getList()
        }

    },
    mounted() {
        this.getList()
    }
}
</script>

<style lang='sass' scoped>
.account-manage
    color: #3D4060;
    padding-left: 30px
    .title 
        font-size: 24px
        font-weight: bold
    .search
        display: flex
        margin-top: 20px
        .search-ct
            margin-left: 60px
            .search-name
                font-size: 14px
                line-height: 18.2px
                padding-bottom: 10px
            .inline-input
                width: 200px
            .search-btn
                display: inline-block
                width: 100px
                height: 35px
                margin-top: 60px
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
        width: 1100px
        .block
            padding: 30px 0
            text-align: center 
</style>
