<template>
    <div class="login">
        <header></header>
        <main>
            <!-- 左侧登录 -->
            <div class="main-left">
                <div class="login-form">
                    <div class="title">
                        <span>账号登录</span>
                    </div>
                    <div class="line"></div>
                    <!-- 登录方法 -->
                    <div class="login-method">
                        <!-- 账号登录 -->
                        <div class="account-form">
                            <div class="account-content">
                                <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
                                    <el-form-item prop="username">
                                        <el-input v-model="loginForm.username" clearable prefix-icon="el-icon-user-solid"
                                            placeholder="username"></el-input>
                                    </el-form-item>
                                    <el-form-item prop="password">
                                        <el-input v-model="loginForm.password" clearable prefix-icon="el-icon-lock"
                                            type="password" placeholder="password"></el-input>
                                    </el-form-item>
                                </el-form>
                                <button @click="login">登录</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 右侧修饰部分 -->
            <div class="main-right">
            </div>
        </main> 
        <footer>
            <section>
                <span>© 2021 LinnCooper</span>
            </section>  
        </footer>
    </div>
</template>

<script>
export default {
    data(){
        return {
            loginForm:{//登录表单
                username:'',
                password:''
            },
            loginRules:{//登录表单验证规则
                username:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
                ]
            },
        }
    },
    methods:{
        async login(){
            this.$refs.loginFormRef.validate( async valid => {
                if(!valid) return 
                const {data:res} = await this.axios.get('login',{params:this.loginForm})
                if(res.code != 200) 
                return this.$message({message: `${res.tips}`,type: 'error',duration:1200})
                this.$message({message: `${res.tips}`,type: 'success',duration:1200})
                sessionStorage.setItem('token',res.token)
                this.$router.push('/home')
            })
        }
    }
}
</script>

<style lang="less" scoped>
.login{
    height: 100vh;
    background-color: #F6F8FB;
    background-repeat: repeat-y;
    background-size: 30% 100%;
    background-position: 0 0;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAABCAYAAABkOJMpAAAAAXNSR0IArs4c6QAAABpJREFUOBFjVMn49J9hFIyGwGgIjIbAEAgBAK6uAn+8Yc3TAAAAAElFTkSuQmCC);
    display: flex;
    flex-direction: column;
    header{
        padding: 70px 0;
        height: 20px;
        width: 1200px;
        margin: 0 auto;
    }
    main{
        width: 1200px;
        border-radius: 5px;
        margin: 0 auto;
        // background:url(https://s3.ax1x.com/2021/02/02/ynl0PJ.jpg) no-repeat right center;
    }
    footer{
        flex: 1;
        width: 1200px;
        margin: 0 auto; 
    }
}
main{
    display: flex;
    justify-content: space-between;
    .main-left{
        width: 420px;
        height: 412px;
        background-color:#FFFFFF;
        border-radius: 5px 0 0 5px;
        box-shadow: 0 10px 20px 0px rgba(0, 0, 0, .05);
        box-sizing: border-box;
        padding: 50px;
        .login-form{
            width: 100%;
            height: 100%;
            position: relative;
            .title{
                display: flex;
                justify-content: space-around;
                padding: 20px 0;
                font-size: 18px;
                cursor: pointer;
            }
            .line{
                border: 1px solid #ECECEC;
            }
        }
        
    }
}
footer{
    display: flex;
    justify-content: center;
    align-items: flex-end;
    section{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span{font-size: 12px;}
    }
}
.login-method{
    height: 100%;
    width: 100%;
    display: flex;
    .account-form{
        .account-content{
            padding: 30px 0;
            button{
                width: 320px;
                padding: 12px 0;
                border-radius: 20px;
                border: none;
                outline: none;
                background-color: #2468F2;
                color: #fff;
                cursor: pointer;
            }
        }
    }
}
</style>