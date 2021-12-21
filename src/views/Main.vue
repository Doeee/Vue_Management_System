<template>
  <el-container>
    <el-aside width="auto">
      <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header>
        <common-header></common-header>
      </el-header>
      <common-tag></common-tag>
      <el-main><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "../components/CommonAside.vue";
import CommonHeader from "../components/CommonHeader.vue";
import CommonTag from "../components/CommonTag.vue";
export default {
  name: "Main",
  components: {
    CommonAside,
    CommonHeader,
    CommonTag,
  },
};
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #333;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  height: 900px;
}

.el-main {
  padding-top: 0px;
  margin: 0px;
}

body {
  height: 920px;
}

body > .el-container {
  margin-bottom: 40px;
  height: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>

