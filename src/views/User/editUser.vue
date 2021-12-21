<template>
  <div>
    <el-form ref="form" :model="userdata" label-width="80px">
      <el-form-item label="用户名：">
        <el-input v-model="userdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码：">
        <el-input v-model="userdata.password"></el-input>
      </el-form-item>
      <el-form-item label="权限：">
        <el-checkbox-group v-model="userdata.authority">
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
  name: "editUser",
  props: ["userdata"],
  data() {
    return {};
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