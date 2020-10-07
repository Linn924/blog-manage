<template>
    <el-container class="home-container">

        <!-- 头部区域 -->
        <el-header>
            <div>
                <img src="https://s1.ax1x.com/2020/09/04/wkjLL9.png">
                <span>博客后台管理系统&nbsp;v1.0</span>
            </div>
            <el-button type="info" @click="loginDialog = true" v-show="btnLogin">登录</el-button>
            <el-button type="info" @click="logout" v-show="btnLogout">登出</el-button>
        </el-header>

        <!-- 页面主题区域 -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside width="192px">
                <nav>
                    <li v-for="item in routerList" :key="item.id"
                        @click="clickLi(item.id)">
                        <router-link :to="item.path" :class="id == item.id ?
                            'changeColor' : '' ">{{item.content}}
                        </router-link>
                    </li>
                </nav>
            </el-aside>

            <!-- 右侧内容主体 -->
            <el-main>
                <router-view></router-view>
            </el-main>

        </el-container>

        <!-- 登录对话框 -->
        <el-dialog title="LOGIN" :visible.sync="loginDialog" width="30%" center>
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" clearable prefix-icon="el-icon-user-solid"
                    placeholder="username" autofocus="true"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" clearable prefix-icon="el-icon-lock"
                    type="password" placeholder="password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="loginDialog = false">取 消</el-button>
                <el-button type="primary" @click="login">确 定</el-button>
            </span>
        </el-dialog>

    </el-container>
</template>

<script>
export default {
    inject:['reload'],
    data(){
        return{
            routerList:[//侧边栏路由信息
                {id:0,path:'/bloglist',content:'博客信息'},
                {id:1,path:'/addsort',content:'分类信息'},
                {id:2,path:'/addtechnology',content:'标签信息'},
                {id:3,path:'/addblog',content:'发布博客'}
            ],
            id:-1,//初始控制点击侧边栏路由的值
            loginDialog:false,//控制登录表单的显示与隐藏
            loginForm:{//登录表单数据
                username:'',
                password:''
            },
            loginRules:{//登录表单验证规则
                username:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ]
            },
            btnLogin:true,//控制登录按钮的显示与隐藏
            btnLogout:false,//控制登出按钮的显示与隐藏
        }
    },
    created() {
        this.id = window.sessionStorage.getItem('id')//获取id的值赋值给定义的id 进而控制侧边栏路由点击变色
        this.getStatus()//调用控制登录登出状态函数
    },
    methods: {
        //点击侧边栏路由
        clickLi(id){
            window.sessionStorage.setItem('id',id)
            this.id = id
        },
        //点击登录按钮
        async login(){
             this.$refs.loginFormRef.validate( async valid => {
                if(!valid) return
                const {data:res} = await this.$http.post("login",this.loginForm)
                if(res.code != 200) return this.$message({message: '登录失败',type: 'error',duration:1000})
                this.$message({message: `${res.tips}`,type: 'success',duration:1000})
                window.sessionStorage.setItem('token', res.token)
                this.reload()
             })
        },
        //控制登录登出状态函数
        getStatus(){
            if(sessionStorage.getItem('token') == null){
                this.btnLogin = true
                this.btnLogout = false
            }else{
                this.btnLogin = false
                this.btnLogout = true
            }
        },
        //登出
        logout(){
            window.sessionStorage.removeItem('token')
            this.reload()
            this.$message({message: '登出成功',type: 'success',duration:1000})
        }
    }
}
</script>

<style lang="less" scoped>
.home-container {
    height: 100%;
    background-color: #A9B0BA;
}
.el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 16px;
    >div{
        display: flex;
        align-items: center;
        margin-left: 20px;
        img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
        span {margin-left: 20px;}
    }
    
}
.el-aside {
    nav{
        display: flex;
        flex-flow: column wrap;
        align-items: center;
        list-style: none;
        padding: 0!important;
        li{
            width: 100%;
            &:hover{background-color: rgba(255,255,255,.2);}
            a{
                display: block;
                width: 100%;
                height: 60px;
                line-height: 60px;
                text-align: center;
                color: #fff;
                text-decoration: none;
                letter-spacing: 2px;
            }
        }
    }
}
.el-main {background-color: #fff;}
.iconfont {margin-right: 10px;}
.toggle-button {
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
.changeColor{color: #1E90FF!important;}
</style>