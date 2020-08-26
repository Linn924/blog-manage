<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><a href="/home" @click="toHome">首页</a></el-breadcrumb-item>
            <el-breadcrumb-item>添加分类</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑导航区域 end-->

        <!-- 卡片区域 -->
        <el-card>
            <el-input v-model="sortForm.sort_name" width="200px" clearable></el-input>
            <el-button type="primary" @click="addsort">添加分类</el-button>

            <!-- 表格中的数据 -->
            <el-table :data="sortList" border stripe>
                <!-- 索引列 固定格式 -->
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column label="分类名称" prop="sort_name"></el-table-column>
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="editSort(scope.row)"></el-button>
                        <!-- 删除按钮 -->
                        <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" @click="deleteSort(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 表格中的数据 end-->
            
        </el-card>
        <!-- 卡片区域 end-->

        <!-- 编辑分类 -->
        <el-dialog title="编辑分类" :visible.sync="editSortDialog" width="30%">
            <el-form :model="updateSortData">
                 <el-form-item label="分类名称">
                    <el-input v-model="updateSortData.sort_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editSortDialog = false">取消</el-button>
                <el-button type="primary" @click="updateSort">更新</el-button>
            </span>
        </el-dialog>
        <!-- 编辑分类 end-->

    </div>
</template>

<script>
export default {
    data(){
        return{
            sortForm:{//分类表单数据
                sort_name:'',
            },
            sortList:[],//分类数据
            editSortDialog:false,
            updateSortData:{}
        }
    },
    created() {
        this.getSTData()//调用获取分类与标签数据函数
    },
    methods: {
        //获取分类与标签数据函数
        async getSTData(){
            const {data:res} = await this.$http.get("http://139.196.210.43:0924/blogdatadetail")
            if(res.code != 200) return this.$message.error(`${res.tips}`)
            this.sortList = res.data.data1
        },
        //添加分类
        async addsort(){
            if(this.sortForm.sort_name.trim() === '') return this.$message.error('请输入数据')
            const {data:res} = await this.$http.post("http://139.196.210.43:0924/addsort",this.sortForm)
            this.sortForm.sort_name = ''
            if(res.code != 200) return this.$message.error(`${res.tips}`)
            this.$message.success(`${res.tips}`)
            this.getSTData()
        },
        //根据id删除分类
        async deleteSort(value){
            const {data:res} = await this.$http.post('http://139.196.210.43:0924/deletesort',{id:value.id})
            if(res.code != 200) return this.$message.error(`${res.tips}`)
            this.$message.success(`${res.tips}`)
            this.getSTData()
        },
        editSort(value){
            this.updateSortData = value
            this.editSortDialog = true
        },
        async updateSort(){
            const {data:res} = await this.$http.post('http://139.196.210.43:0924/updatesort',this.updateSortData)
            if( res.code != 200) return this.$message.error(`${res.tips}`)
            this.$message.success(`${res.tips}`)
            this.getSTData()
            this.editSortDialog = false
        },
        //点击首页 移除sessionStorage中的id
        toHome(){
            window.sessionStorage.removeItem("id");
        }
    }
}
</script>

<style lang="less" scoped>
.el-card{
   margin-top: 20px;
   .el-input{
       width: 200px!important;
   }
   .el-button{
       margin-left: 20px;
   }
   .el-table{
       margin: 20px 0;
       text-align: center;
   }
}
</style>