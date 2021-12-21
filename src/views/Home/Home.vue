<template>
  <div>
    <el-row class="home" :gutter="20">
      <el-col :span="7" style="margin-top: 20px">
        <el-card shhadow="hover">
          <div class="user">
            <img :src="userImg" />
            <div class="userinfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间：<span>2021-12-9</span></p>
            <p>上次登录地点：<span>武汉</span></p>
          </div>
        </el-card>
        <el-card shhadow="hover" style="margin-top: 20px; height: 390px">
          <el-table :data="tableData">
            <el-table-column
              show-overflow-tooltip
              v-for="(val, key) in tableLabel"
              :key="key"
              :prop="key"
              :label="val"
            ></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="17" style="margin-top: 20px">
        <div class="num">
          <el-card
            shhadow="hover"
            v-for="item in countData"
            :key="item.name"
            :body-style="{ display: 'flex', padding: 0 }"
          >
            <i
              class="icon"
              :class="`el-icon-${item.icon}`"
              :style="{ background: item.color }"
            ></i>
            <div class="detail">
              <label class="txt">￥{{ item.name }}</label>
              <label class="num">￥{{ item.value }}</label>
            </div>
          </el-card>
        </div>
        <el-card shhadow="hover" style="height: 280px" ref="echart">
          <echart :chartData="echartData.order" style="height: 280px"></echart>
        </el-card>
        <div class="graph">
          <el-card shhadow="hover" style="height: 260px">
            <echart :chartData="echartData.user" style="height: 240px"></echart>
          </el-card>
          <el-card shhadow="hover" style="height: 260px">
            <echart
              :chartData="echartData.video"
              style="height: 240px"
              :isAxisChart="false"
            ></echart>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getHome } from "../../api/data";
import Echart from "@/components/ECharts.vue";

export default {
  name: "Home",
  props: [""],
  data() {
    return {
      userImg: require("../../assets/images/user.png"),
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      tableData: [],
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      echartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          series: [],
        },
      },
    };
  },

  components: { Echart },

  computed: {},

  beforeMount() {},

  mounted() {
    this.getTableData();
  },

  methods: {
    getTableData() {
      getHome().then((res) => {
        this.tableData = res.data.tableData;

        // 折线图的展示
        const order = res.data.orderData;
        let keyArray = Object.keys(order.data[0]);

        // const myEchartsOrder = echarts.init(this.$refs.echart);
        // myEchartsOrder.setOption(this.echartsData.order);

        // 传给组件的值
        this.echartData.order.xData = order.date;
        keyArray.forEach((key) => {
          this.echartData.order.series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });

        // 用户图

        this.echartData.user.xData = res.data.userData.map((item) => item.date);
        this.echartData.user.series.push({
          name: "新增用户",
          data: res.data.userData.map((item) => item.new),
          type: "bar",
        });
        this.echartData.user.series.push({
          name: "活跃用户",
          data: res.data.userData.map((item) => item.active),
          type: "bar",
        });

        this.echartData.video.series.push({
          data: res.data.videoData,
          type: "pie",
        });
      });
    },
  },

  watch: {},
};
</script>


<style lang='scss' scoped>
@import "~@/assets/scss/home";
</style>