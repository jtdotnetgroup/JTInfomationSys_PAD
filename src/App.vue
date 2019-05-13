<template>
  <div id="app">
    <transition name="el-zoom-in-center">
      <router-view/>
    </transition>
  </div>
</template>

<style>

@media screen (max-width: 1000; and ) {

}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  align-items: center;
  display: flex;
  overflow-y: hidden;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.header{
    background:#409EFF;
}
.header .el-col{
  padding: 1% 0 1% 0;
}
.time{
  font-size: 1.2rem;
  font-weight: bold;
}
.fullscreen{
  height: 100vh;
  width: 100vw;
}

body{
  margin:0;
}
table{
  font-size: 1.7vh;
}
.el-pagination{
  position: fixed;bottom: 0px;text-align: center;
}
.el-pagination__total,.el-pagination__sizes,.el-select,.el-select--mini,.el-pager{
  font-size:50px !important;
}
.el-pagination button, .el-pagination span:not([class*=suffix]),.el-input--mini,.el-input__inner,.el-pager,.btn-prev,li.number{
  font-size:50px !important;}
td,tr{
  font-size: 17px;
}
.el-pagination {
    white-space: nowrap;
    padding: 2px 5px;
    color: #303133;
    font-weight: 700;
    position: fixed;
    left: 0px;
    right: 0px;
}
.el-pager li{
      height: 50px !important;
    line-height: 50px !important;
}
.el-pagination.is-background .el-pager li{
   min-width: 50px !important;
}
.el-pagination.is-background .btn-prev,.el-pagination.is-background .btn-next{
  min-width: 50px !important;
}
.el-pagination button{
  height: 50px !important;
    line-height: 50px !important;
}
.el-pagination .btn-next .el-icon, .el-pagination .btn-prev .el-icon{
  font-size: 35px!important;
}
</style>
