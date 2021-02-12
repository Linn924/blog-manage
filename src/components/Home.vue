<template>
    <el-container class="home-container">
        <el-header>
            <div>
                <img src="../assets/logo.jpg">
                <span>简约博客后台管理系统</span>
            </div>
            <el-button type="info" @click="logout">登出</el-button>
        </el-header>

        <el-container>
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

            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data(){
        return{
            routerList:[
                {id:0,path:'/blogs',content:'博客管理'},
                {id:1,path:'/sorts',content:'分类管理'},
                {id:2,path:'/labels',content:'标签管理'},
                {id:3,path:'/comments',content:'评论管理'},
                {id:4,path:'/users',content:'用户管理'},
                {id:5,path:'/addblog',content:'发布博客'}
            ],
            id:-1,//初始控制点击侧边栏路由的值
        }
    },
    created() {
        this.id = sessionStorage.getItem('id')
    },
    methods: {
        clickLi(id){
            sessionStorage.setItem('id',id)
            this.id = id
        },
        logout(){
            sessionStorage.removeItem('token')
            this.$router.push('/login')
            this.$message({message: '登出成功',type: 'success',duration:1200})
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