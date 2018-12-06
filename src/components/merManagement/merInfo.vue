<template>
    <div class="mer-audit">
        <div class="title">
            <span>商家审核</span>
        </div>
        <div class="basic-info">
            <h2>基本信息</h2>
            <div class="item">
                <span class="name">商家ID：</span>
                <span class="val">{{list.merCode}}</span>
            </div>
            <div class="item">
                <span class="name">商户名称：</span>
                <span class="val">{{content.merName}}</span>
            </div>
            <div class="item">
                <span class="name">注册手机号：</span>
                <span class="val">{{content.merPhone}}</span>
            </div>
        </div>
        <div class="basic-info">
            <h2>合作费率</h2>
            <div class="item">
                <span class="name">平台总扣点比例：</span>
                <span class="val">{{content.commisionRate}}%</span>
            </div>
        </div>
        <div class="basic-info">
            <h2>商家资质</h2>
            <div class="item">
                <span class="name">营业执照</span>
                <div class="wrapper">
                    <img src="../../assets/img/img_my_idcard.png" alt="">
                </div>
            </div>
            <div class="item">
                <span class="name">负责人身份证</span>
                <div class="wrapper">
                    <img src="../../assets/img/img_my_idcard.png" alt="">
                    <img src="../../assets/img/img_my_idcard.png" alt="">
                </div>
            </div>
            <div class="item">
                <span class="name">其他资质照片</span>
                <div class="wrapper">
                    <img src="../../assets/img/img_my_idcard.png" alt="">
                    <img src="../../assets/img/img_my_idcard.png" alt="">
                    <img src="../../assets/img/img_my_idcard.png" alt="">
                    <img src="../../assets/img/img_my_idcard.png" alt="">
                </div>
            </div>
        </div>
        <div class="btn" @click="save">提交</div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            sex: '',
            id: '',
            textarea: '',
            list: {},
            content: {},
            licenseImg: '',
            otherLicenseImg: '',
            merDetail: {},
            shopInfo: ''
        }
    },
    methods: {
        save() {
            
        }
    },
    mounted() {

    }
}
</script>

<style lang="sass" scoped>
.mer-audit
    color: #3D4060
    .title 
        font-size: 24px
        font-weight: bold
        margin-left: 30px
    .basic-info
        margin: 70px 0 0 30px
        h2
            font-size: 18px
            font-weight: bold
            margin-bottom: 10px
        .item 
            margin-top: 20px
            font-size: 16px
            .name
                color: #7E8196
                display: inline-block
                width: 150px
            .val
                font-weight: bold
            img 
                width: 186px
                height: 120px
                margin: 20px 30px 0 0 
    .btn 
        display: inline-block
        font-size: 14px
        background: #00BFA6
        border-radius: 20px
        color: #fff
        width: 150px    
        height: 40px 
        line-height: 40px
        margin-left: 30px 
        margin: 50px 0 100px 30px
        text-align: center
</style>
