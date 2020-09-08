<template>
    <div class="release">

        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><a href="/home" @click="toHome">首页</a></el-breadcrumb-item>
            <el-breadcrumb-item>发布博客</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡牌视图区域 -->
        <el-card>
            <el-button type="primary" @click="clickToBtn" v-show="showTo">下一步</el-button>
            <el-button type="primary" @click="clickBackBtn" v-show="showBack">上一步</el-button>
            <el-button type="primary" @click="addBlog" v-show="showBack">上传</el-button>
            <el-row :gutter="2" v-show="showTo">
                <el-col :span="12"><el-input type="textarea" v-model="blogForm.content" class="textarea"></el-input></el-col>
                <el-col :span="12"><div v-html="html" v-highlight class="markdown-body md" :style="{'height':htmlHeight + 'px'}" v-show="showMd"></div></el-col>
            </el-row>
            <div class="addblog" v-show="showBack">
                <el-form :model="blogForm" ref="blogFormRef" label-width="80px">
                    <el-form-item label="标题">
                        <el-input v-model="blogForm.title" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="简介">
                        <el-input type="textarea" v-model="blogForm.introduce"></el-input>
                    </el-form-item>
                    <el-form-item label="时间">
                        <el-date-picker v-model="blogForm.date" type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="分类">
                        <el-select v-model="blogForm.sortname" filterable allow-create placeholder="请选择分类">
                            <el-option v-for="item in sortList" :key="item.id" :label="item.sort_name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item label="文件名">
                        <el-input v-model="blogForm.mdname" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="技术">
                        <el-select v-model="blogForm.technologyname" filterable allow-create placeholder="请选择技术">
                            <el-option v-for="item in technologyList" :key="item.id" :label="item.technology_name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>

    </div>
</template>

<script>
import showdown from 'showdown'
export default {
    data(){
        return {
            html:'',
            htmlHeight:'',
            showMd:false,
            showTo:true,
            showBack:false,
            sortList:[],//分类数据
            technologyList:[],//标签数据
            blogForm:{//添加博客表单数据
                title:'',
                introduce:'',
                date:'',
                sortname:'',
                mdname:'',
                technologyname:'',
                content:''
            },
        }
    },
    created() {
        this.getSTData()//调用获取分类与标签数据函数
    },
    mounted() {
        var textarea = document.querySelector(".textarea")
        this.htmlHeight = textarea.offsetHeight
    },
    watch:{
        'blogForm.content'(value){
            if(value == '') return this.showMd = false
            this.showMd = true
            let converter = new showdown.Converter()
            this.html = converter.makeHtml(value)
        }
    },
    methods: {
        //获取分类与标签数据
        async getSTData(){
            const {data:res} = await this.$http.get("blogdatadetail")
            if(res.code != 200) return this.$message({message: `${res.tips}`,type: 'error',duration:1000})
            this.sortList = res.data.data1
            this.technologyList = res.data.data2
        },
        //点击首页 移除sessionStorage中的id
        toHome(){
            window.sessionStorage.removeItem("id");
        },
        clickToBtn(){
            if(this.blogForm.content == '') return this.$message({message: '请填写内容',type: 'error',duration:1000})
            this.showTo = false
            this.showBack = true
        },
        clickBackBtn(){
            this.showTo = true
            this.showBack = false
        },
        async addBlog(){
            const {data:res} = await this.$http.post('addblog',this.blogForm)
            if(res.code != 200) this.$message({message: `${res.tips}`,type: 'error',duration:1000})
            this.$message({message: `${res.tips}`,type: 'success',duration:1000})
            this.blogForm = {
                title:'',introduce:'',date:'',sortname:'',
                mdname:'',technologyname:'',content:''
            }
            this.showTo = true
            this.showBack = false
        }
    }
}
</script>

<style lang="less" scoped>
@import "../assets/css/md.css";
.release{
    height: 100%;
}
.el-card{
   height: 95%;
   margin-top: 20px;
   .el-row{
       height: 100%;
       margin-top: 20px;
       .el-col{
           height: 100%!important;
           .md{
               border-radius: 4px;
               padding: 0 5px;
               border: 1px solid #1E90FF;
               overflow-y: scroll;
           }
       }
   }
   .addblog{
       width: 18%;
       margin-top: 20px;
   }
}
/*壁纸盒子滚动条样式*/
.md::-webkit-scrollbar{
  width: 4px;
}
.md::-webkit-scrollbar-thumb{
  background-color: #5a76cd;
}
</style>