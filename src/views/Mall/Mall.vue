 <template>
  <div>
    <el-card hover="shadow" style="margin-top: 20px">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-table :data="ruleForm.showData" row-key="id" style="width: 100%">
          <el-table-column label="日期" width="200">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品编号" width="280">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" width="220">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>商品名称: {{ scope.row.name }}</p>
                <p>商品信息: {{ scope.row.info }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.name }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="销售地区" width="220">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ `${scope.row.area}` }}</span>
            </template>
          </el-table-column>
          <el-table-column label="库存数量" width="190">
            <template slot-scope="scope">
              <el-form-item
                :prop="'showData.' + scope.$index + '.storeNum'"
                :rules="rules.storeNum"
                label-width="0px"
                style="margin: 0px 0px 0px 0px"
              >
                <el-input
                  type="text"
                  v-model="scope.row.storeNum"
                  v-show="scope.row.iseditor"
                  style="margin: 0px 10px 0px 0px"
                />
              </el-form-item>
              <span
                style="display: block; margin: 10px 0px 10px 0px"
                v-show="!scope.row.iseditor"
                >{{ `${scope.row.storeNum}部` }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="销售数量" width="190">
            <template slot-scope="scope">
              <el-form-item
                :prop="'showData.' + scope.$index + '.saleNum'"
                :rules="rules.saleNum"
                label-width="0px"
                style="margin: 0px 0px 0px 0px"
              >
                <el-input
                  type="text"
                  v-model="scope.row.saleNum"
                  v-show="scope.row.iseditor"
                  style="margin: 0px 10px 0px 0px"
                />
              </el-form-item>
              <span
                style="display: block; margin: 10px 0px 10px 0px"
                v-show="!scope.row.iseditor"
                >{{ `${scope.row.saleNum}部` }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="好评率" width="180">
            <template slot-scope="scope">
              <el-form-item
                :prop="'showData.' + scope.$index + '.goodComment'"
                :rules="rules.goodComment"
                label-width="0px"
                style="margin: 0px 0px 0px 0px"
              >
                <el-input
                  type="text"
                  v-model="scope.row.goodComment"
                  v-show="scope.row.iseditor"
                  style="margin: 0px 10px 0px 0px"
                />
              </el-form-item>
              <span
                style="display: block; margin: 10px 0px 10px 0px"
                v-show="!scope.row.iseditor"
                >{{ `${scope.row.goodComment}%` }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button
                style="margin-left: 10px"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                v-show="!scope.row.iseditor"
              >
                编辑
              </el-button>
              <el-button
                size="mini"
                type="warning"
                @click="handleSave(scope.$index, scope.row, 'ruleForm')"
                v-show="scope.row.iseditor"
              >
                保存
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleCancel(scope.row, 'ruleForm')"
                v-show="scope.row.iseditor"
              >
                取消
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                v-show="!scope.row.iseditor"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="tableData.length"
        >
        </el-pagination>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getMall, delMall, modifyMall } from "../../api/data";
export default {
  name: "mall",
  props: [""],
  data() {
    return {
      tableData: [],
      ruleForm: {
        showData: [],
      },
      pagesize: 0,
      currentPage: 0,
      pageSize: 9,
      rules: {
        storeNum: [
          {
            type: "number",
            transform(value) {
              return Number(value);
            },
            required: true,
            message: "库存数量必须为数字值",
            trigger: "blur",
          },
        ],
        saleNum: [
          {
            type: "number",
            transform(value) {
              return Number(value);
            },
            required: true,
            message: "销售数量必须为数字值",
            trigger: "blur",
          },
        ],
        goodComment: [
          {
            type: "number",
            transform(value) {
              return Number(value);
            },
            required: true,
            message: "好评率必须为数字值",
            trigger: "blur",
          },
          {
            pattern: /^100$|^(\d|[1-9]\d)(\.\d+)*$/,
            required: true,
            message: "好评率必须大于0小于100",
            trigger: "blur",
          },
        ],
      },
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {
    this.getTableData();
  },

  methods: {
    getTableData() {
      getMall().then((res) => {
        this.tableData = res.data.map((item) => {
          item.iseditor = false;
          return item;
        });
        this.currentPage = 1;
      });
    },
    handleEdit(index, row) {
      row.iseditor = true;
    },
    handleSave(index, row, ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          row.iseditor = false;
          modifyMall(row).then(() => {
            getMall().then((res) => {
              console.log("res.data", res.data);
              this.tableData = res.data.map((item) => {
                item.iseditor = false;
                return item;
              });
            });
          });
        } else {
          const h = this.$createElement;

          this.$notify({
            title: "错误",
            message: h("h4", { style: "color: red" }, "请勿非法输入"),
            duration: 1000,
          });
          return false;
        }
      });
    },
    handleCancel(row, ruleForm) {
      row.iseditor = false;
      this.$refs[ruleForm].resetFields();
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delMall(row).then(() => {
            getMall().then((res) => {
              this.tableData = res.data.map((item) => {
                item.iseditor = false;
                return item;
              });

              if (
                this.currentPage >
                Math.ceil(this.tableData.length / this.pageSize)
              ) {
                this.currentPage = Math.ceil(
                  this.tableData.length / this.pageSize
                );
              } else {
                let low = (this.currentPage - 1) * this.pageSize;
                let high =
                  low + this.pageSize - 1 > this.tableData.length - 1
                    ? this.tableData.length - 1
                    : low + this.pageSize - 1;
                this.ruleForm.showData = this.tableData.slice(low, high + 1);
              }
            });
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    check_num(index, row) {
      console.log("row", row);
    },
  },

  watch: {
    currentPage: {
      handler(newName) {
        let low = (newName - 1) * this.pageSize;
        let high =
          low + this.pageSize - 1 > this.tableData.length - 1
            ? this.tableData.length - 1
            : low + this.pageSize - 1;
        this.ruleForm.showData = this.tableData.slice(low, high + 1);
      },
      immediate: true,
    },
    tableData: {
      handler(newData) {
        this.tableData = newData;
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>


<style lang='scss' scoped>
.el-pagination {
  text-align: right;
}
/deep/.el-form-item__error {
  position: relative;
}
</style>