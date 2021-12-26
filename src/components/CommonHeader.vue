<template>
  <header>
    <div class="l-content">
      <el-button
        plain
        icon="el-icon-menu"
        @click="handleMenu()"
        size="mini"
      ></el-button>
      <span
        ><el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">退出</el-breadcrumb-item>
        </el-breadcrumb></span
      >
    </div>
    <div class="r-content">
      <el-dropdown @command="handleDropdownMenuCommand">
        <span>
          <img :src="uesrImg" class="user" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="item in dropDownMenu"
            :key="item.path"
            :command="item.name"
            >{{ item.label }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
export default {
  name: "CommonHeader",
  props: [""],
  data() {
    return {
      uesrImg: require("../assets/images/user.png"),
      dropDownMenu: [
        {
          path: "/",
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
      ],
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    handleMenu() {
      this.$store.commit("CollapseMenus");
    },
    handleDropdownMenuCommand(command) {
      const [item] = this.dropDownMenu.filter((item) => item.name === command);
      console.log(item);
      this.$router.push({ name: item.name });
      this.$store.commit("selectMenu", item);
    },
  },

  watch: {},
};
</script>


<style lang='scss' scoped>
header {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}
span {
  color: aliceblue;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
.r-content {
  .user {
    height: 40px;
    width: 40px;
    border-radius: 50px;
  }
}
</style>

<style lang="scss">
.el-breadcrumb__item {
  .el-breadcrumb__inner {
    color: rgb(5, 5, 5);
    font-weight: normal;
  }
  &:last-child {
    .el-breadcrumb__inner {
      color: white;
    }
  }
}
</style>
