<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><a href="/home" @click="toHome">首页</a></el-breadcrumb-item>
            <el-breadcrumb-item>添加标签</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑导航区域 end-->

        <!-- 卡片区域 -->
        <el-card>
            <el-input v-model="technologyForm.technology_name" width="200px" clearable></el-input>
            <el-button type="primary" @click="addtechnology">添加标签</el-button>

            <!-- 表格中的数据 -->
            <el-table :data="technologyList" border stripe>
                <!-- 索引列 固定格式 -->
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column label="分类名称" prop="technology_name"></el-table-column>
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="editTechnology(scope.row)"></el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTechnology(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 表格中的数据 end-->

        </el-card>
        <!-- 卡片区域 end-->

        <!-- 编辑分类 -->
        <el-dialog title="编辑标签" :visible.sync="editTDialog" width="30%">
            <el-form :model="updateTData">
                 <el-form-item label="分类名称">
                    <el-input v-model="updateTData.technology_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editTDialog = false">取消</el-button>
                <el-button type="primary" @click="updateT">更新</el-button>
            </span>
        </el-dialog>
        <!-- 编辑分类 end-->

    </div>
</template>

<script>
export default {
    data(){
        return{
            technologyForm:{//标签表单
                technology_name:'',
            },
            technologyList:[],//标签数据
            updateTData:{},
            editTDialog:false
        }
    },
    created() {
        this.getSTData()//调用获取分类与标签数据函数
    },
    methods: {
        //获取分类与标签数据函数
        async getSTData(){
            const {data:res} = await this.$http.get("blogdatadetail")
            if(res.code != 200) return this.$message({message: `${res.tips}`,type: 'error',duration:1000})
            this.technologyList = res.data.data2
        },
        //添加标签
        async addtechnology(){
            if(this.technologyForm.technology_name.trim() === '') return this.$message({message: '请输入数据',type: 'error',duration:1000})
            const {data:res} = await this.$http.post("addtechnology",this.technologyForm)
            this.technologyForm.technology_name = ''
            if(res.code != 200) return this.$message({message: `${res.tips}`,type: 'error',duration:1000})
            this.$message({message: `${res.tips}`,type: 'success',duration:1000})
            this.getSTData()
        },
        //根据id删除标签
        async deleteTechnology(value){
            const {data:res} = await this.$http.post('deletetechnology',{id:value.id})
            if(res.code != 200) return this.$message({message: `${res.tips}`,type: 'error',duration:1000})
            this.$message({message: `${res.tips}`,type: 'success',duration:1000})
            this.getSTData()
        },
        editTechnology(value){
            this.updateTData = value
            this.editTDialog = true
        },
        async updateT(){
            const {data:res} = await this.$http.post('updatetechnology',this.updateTData)
            if( res.code != 200) return this.$message({message: `${res.tips}`,type: 'error',duration:1000})
            this.$message({message: `${res.tips}`,type: 'success',duration:1000})
            this.getSTData()
            this.editTDialog = false
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