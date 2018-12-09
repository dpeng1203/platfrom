<template>
    <div class="mer-audit">
        <div class="mer-ct">
            <div class="title">
                <span>商户信息</span>
            </div>
            <div class="basic-wrapper">
                <div class="basic-info">
                    <h2>基本信息</h2>
                    <div class="item">
                        <span class="name">商户名称：</span>
                        <el-input placeholder="请输入内容" v-model="input10" clearable> </el-input>
                    </div>
                    <div class="item">
                        <span class="name">商户简称：</span>
                        <el-input placeholder="请输入内容" v-model="input10" clearable> </el-input>
                    </div>
                    <div class="item">
                        <span class="name">商户地址：</span>
                        <el-input placeholder="请输入内容" v-model="input10" clearable> </el-input>
                    </div>
                    <div class="item">
                        <span class="name">联系人姓名：</span>
                        <el-input placeholder="请输入内容" v-model="input10" clearable> </el-input>
                    </div>
                    <div class="item">
                        <span class="name">联系人手机号：</span>
                        <el-input placeholder="请输入内容" v-model="input10" clearable> </el-input>
                    </div>
                    <div class="item">
                        <span class="name">联系人证件号：</span>
                        <el-input placeholder="请输入内容" v-model="input10" clearable> </el-input>
                    </div>
                    <div class="item">
                        <span class="name">联系人邮箱：</span>
                        <el-input placeholder="请输入内容" v-model="input10" clearable> </el-input>
                    </div>
                    <div class="item">
                        <span class="name">商户描述：</span>
                        <div class="textarea-wrapper">
                            <el-input
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 4}"
                                placeholder="请输入内容"
                                v-model="textarea3">
                            </el-input>
                        </div>
                        
                    </div>
                </div>
                <div>
                    <div class="basic-info">
                        <h2>法人信息</h2>
                        <div class="item">
                            <span class="name">法人姓名：</span>
                            <el-input placeholder="请输入内容" v-model="list.name" clearable> </el-input>
                        </div>
                        <div class="item">
                            <span class="name">法人手机号：</span>
                            <el-input placeholder="请输入内容" v-model="list.phone" clearable> </el-input>
                        </div>
                        <div class="item">
                            <span class="name">法人证件号：</span>
                            <el-input placeholder="请输入内容" v-model="list.id" clearable> </el-input>
                        </div>
                        <div class="item">
                            <span class="name">法人邮箱：</span>
                            <el-input placeholder="请输入内容" v-model="list.email" clearable> </el-input>
                        </div>
                    </div>
                    <div class="basic-info">
                        <h2>其他信息</h2>
                        <div class="item">
                            <span class="name">纳税人识别号：</span>
                            <el-input placeholder="请输入内容" v-model="list.code" clearable> </el-input>
                        </div>
                        <div class="item">
                            <span class="name">组织机构代码：</span>
                            <el-input placeholder="请输入内容" v-model="list.id_code" clearable> </el-input>
                        </div>
                        <div class="item">
                            <span class="name">营业执照编码：</span>
                            <el-input placeholder="请输入内容" v-model="list.cd" clearable> </el-input>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="mer-info">
                <h2>商户资质</h2>
                <div class="photo-wrapper">
                    <div class="item">
                        <span class="name">营业执照</span>
                        <div class="wrapper">
                            <el-upload
                                class="avatar-uploader"
                                action="http://47.99.180.135:8088/files"
                                :show-file-list="false"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                    <div class="item">
                        <span class="name">开户许可证</span>
                        <div class="wrapper">
                            <el-upload
                                class="avatar-uploader"
                                action="http://47.99.180.135:8088/files"
                                :show-file-list="false"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                    <div class="item">
                        <span class="name">手持营业执照</span>
                        <div class="wrapper">
                            <el-upload
                                class="avatar-uploader"
                                action="http://47.99.180.135:8088/files"
                                :show-file-list="false"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                </div>
                

                <div class="photo-wrapper">
                    <div class="item">
                        <span class="name">身份证（正面）</span>
                        <div class="wrapper">
                            <el-upload
                                class="avatar-uploader"
                                action="http://47.99.180.135:8088/files"
                                :show-file-list="false"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                    <div class="item">
                        <span class="name">身份证（反面）</span>
                        <div class="wrapper">
                            <el-upload
                                class="avatar-uploader"
                                action="http://47.99.180.135:8088/files"
                                :show-file-list="false"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                    <div class="item">
                        <span class="name">手持身份证（正面）</span>
                        <div class="wrapper">
                            <el-upload
                                class="avatar-uploader"
                                action="http://47.99.180.135:8088/files"
                                :show-file-list="false"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                </div>
                <div class="photo-wrapper">
                    <div class="item">
                        <span class="name">其他资质照片</span>
                        <div class="wrapper">
                            <el-upload
                                class="avatar-uploader"
                                action="http://47.99.180.135:8088/files"
                                multiple
                                :show-file-list="false"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="btn" @click="save">提交</div>
        </div>
    </div>
</template>

<script>
import { imgUp } from '../../config/api'
export default {
    data() {
        return{
            list: {},
            input10: '',
            textarea3: '',
            imageUrl: '',
        }
    },
    methods: {
        save() {
            
        },
        beforeAvatarUpload(file) {
            let fd = new FormData();//通过form数据格式来传
            fd.append("upload_file", file); //上传文件
            imgUp(fd).then((res) => {
                this.$message({
                    message: '上传成功！',
                    type: 'success'
                });

            })
            return false
        }
    },
    mounted() {

    }
}
</script>

<style lang="sass" scoped>
.mer-audit
    color: #3D4060
    padding-top: 50px
    background: #eee
    .mer-ct 
        width: 850px
        margin: 0 auto
        .title 
            text-align: left
            font-size: 24px
            font-weight: bold
            margin-left: 30px
            padding-bottom: 30px
            border-bottom: 1px solid #ccc
        .basic-wrapper
            display: flex
            margin: 0 70px 0 30px
            padding-bottom: 30px
            width: 850px
            border-bottom: 1px solid #ccc
            .basic-info
                margin-right: 70px
                margin-top: 30px
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
                        width: 120px
                    .el-input
                        width: 220px
                    .textarea-wrapper
                        margin-top: 10px
        
        .mer-info
            margin: 30px 0 0 30px
            h2
                font-size: 18px
                font-weight: bold
                margin-bottom: 10px
            .photo-wrapper
                display: flex
                .item 
                    margin-top: 20px
                    font-size: 16px
                    .name
                        color: #7E8196
                        display: inline-block
                    .avatar-uploader, .el-upload 
                        border: 1px dashed #d9d9d9;
                        margin: 20px 30px 0 0
                        border-radius: 6px;
                        cursor: pointer;
                        position: relative;
                        overflow: hidden;
                    
                    .avatar-uploader, .el-upload:hover 
                        border-color: #409EFF;
                        display: inline-block
                    
                    .avatar-uploader-icon 
                        font-size: 28px;
                        color: #8c939d;
                        width: 186px
                        height: 120px
                        line-height: 120px;
                        text-align: center;
                        
                    .avatar 
                        width: 186px
                        height: 120px
                
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
