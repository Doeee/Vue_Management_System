<template>
  <div>
    <div class="container">
      <el-card class="contentOuter">
        <div class="content">
          <div class="leftInner">
            <div class="carouseDiv">
              <el-carousel height="410px">
                <el-carousel-item v-for="item in carouselImg" :key="item">
                  <span>
                    <img :src="item" class="carouselImg" />
                  </span>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
          <div class="rightInner">
            <h3 class="loginTitle">登录</h3>
            <el-form
              class="loginFrom"
              ref="form"
              :model="form"
              label-width="80px"
            >
              <el-form-item label="用户名">
                <!-- <el-input ref="strNameTxb" v-model="form.username"></el-input> -->
                <el-autocomplete
                  class="inline-input"
                  v-model="form.username"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入用户名"
                  value-key="username"
                  @select="handleSelect"
                ></el-autocomplete>
              </el-form-item>
              <el-form-item label="密码">
                <el-input
                  ref="strPassTxb"
                  placeholder="请输入密码"
                  v-model="form.password"
                  show-password
                ></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-checkbox-group v-model="form.remember">
                  <el-checkbox
                    ref="rememberCkb"
                    label="记住密码"
                    name="type"
                  ></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item>
                <el-button class="loginButton" type="primary" @click="loginIn"
                  >登录</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getAdmin, getUser, getVisit } from "../../api/data";
export default {
  name: "Login",
  props: [""],
  data() {
    return {
      restaurants: [],
      form: {
        username: "",
        password: "",
        remember: "",
      },
      carouselImg: [
        require("../../assets/images/carousel1.jpg"),
        require("../../assets/images/carousel2.jpg"),
        require("../../assets/images/carousel3.jpg"),
        require("../../assets/images/carousel4.jpg"),
      ],
      user: [],
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {
    if (this.user.length === 0) {
      getAdmin().then((res) => {
        this.user = [...this.user, ...res.adminList];
      });
      getUser().then((res) => {
        this.user = [...this.user, ...res.userList];
      });
      getVisit().then((res) => {
        this.user = [...this.user, ...res.visitList];
      });

      //记住密码
      let strName = localStorage.getItem("keyName");
      let strPass = localStorage.getItem("keyPass");
      this.restaurants = [
        {
          username: strName,
          password: strPass,
        },
      ];
      console.log("初始化restaurants：", this.restaurants);
      if (strName) {
        this.form.username = strName;
      }
      if (strPass) {
        this.form.password = strPass;
      }
    }
  },
  methods: {
    loginIn() {
      let canLogin = this.user.some((item) => {
        return (
          item.username == this.form.username &&
          item.password == this.form.password
        );
      });
      if (canLogin) {
        console.log("form", this.form);
        if (this.form.remember) {
          localStorage.setItem("keyName", this.form.username);
          localStorage.setItem("keyPass", this.form.password);
        }
        this.$router.push("/index");
      } else {
        this.$alert("用户名或密码错误", "提示", {
          confirmButtonText: "确定",
          callback: () => {
            this.$message({
              type: "info",
              message: `用户名或密码错误`,
            });
          },
        });
      }
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return restaurant.username.indexOf(queryString.toLowerCase()) === 0;
      };
    },
    handleSelect(item) {
      this.form.username = item.username;
      this.form.password = item.password;
    },
  },

  watch: {},
};
</script>


<style lang='scss' scoped>
@import "~@/assets/scss/login";
</style>