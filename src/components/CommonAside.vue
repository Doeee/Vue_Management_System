<template>
  <el-menu
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :default-active="activeIndex"
    :router="true"
  >
    <h3 v-if="!isCollapse">通用后台管理系统</h3>
    <h3 v-else>后台</h3>
    <el-menu-item
      :index="item.path"
      v-for="item in noChildren"
      :key="item.path"
      @click="clickMenu(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu :index="item.path" v-for="item in hasChildren" :key="item.path">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          :index="subitem.path"
          v-for="subitem in item.children"
          :key="subitem.path"
        >
          <i :class="'el-icon-' + subitem.icon"></i>
          <span slot="title">{{ subitem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "CommonAside",
  data() {
    return {
      menu: [
        {
          path: "index",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/Home",
        },
        {
          path: "/mall",
          name: "mall",
          label: "商品管理",
          icon: "video-play",
          url: "MallManage/MallManage",
        },
        {
          path: "/user",
          name: "user",
          label: "用户管理",
          icon: "user",
          url: "UserManage/UserManage",
        },
        // {
        //   label: "其他",
        //   icon: "location",
        //   path: "index//other",
        //   children: [
        //     {
        //       path: "/page1",
        //       name: "page1",
        //       label: "页面1",
        //       icon: "setting",
        //       url: "Other/PageOne",
        //     },
        //     {
        //       path: "/page2",
        //       name: "page2",
        //       label: "页面2",
        //       icon: "setting",
        //       url: "Other/PageTwo",
        //     },
        //   ],
        // },
      ],
    };
  },
  computed: {
    hasChildren() {
      return this.menu.filter((item) => item.children);
    },
    noChildren() {
      return this.menu.filter((item) => !item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
    activeIndex() {
      const name = this.$route.path;
      return name;
    },
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item) {
      this.$router.push({ name: item.name });
      this.$store.commit("selectMenu", item);
    },
  },
};
</script>

<style lang="scss" scoped>
.h3 {
  height: 20px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 170px;
  min-height: 100%;
}
.el-menu-vertical-demo.el-menu--collapse {
  min-height: 100%;
  width: 70px;
}
</style>