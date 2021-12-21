<template>
  <div>
    <el-form ref="addUserdata" :model="form" label-width="80px">
      <el-form-item label="用户名：">
        <el-input v-model="addUserdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码：">
        <el-input v-model="addUserdata.password"></el-input>
      </el-form-item>
      <el-form-item label="权限：">
        <el-checkbox-group v-model="addUserdata.authority">
          <el-checkbox label="首页" disabled></el-checkbox>
          <el-checkbox label="商品管理"></el-checkbox>
          <el-checkbox label="用户管理"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "addUser",
  props: ["addUserdata"],
  data() {
    return {
      form: {
        username: "",
        password: "",
        authority: ["首页"],
      },
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },

  watch: {},
};
</script>


<style lang='' scoped>
</style>