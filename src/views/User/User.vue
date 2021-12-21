<template>
  <div>
    <el-card hover="shadow" style="margin-top: 20px">
      <el-table
        :data="tableData"
        style="width: 100%"
        row-key="id"
        border
        lazy
        :load="load"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="date" sortable label="创建日期" width="180">
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="180">
        </el-table-column>
        <el-table-column label="密码">
          <template slot-scope="scope">
            <div v-if="scope.row.operateButton">
              <span>{{ `${scope.row.password}` }}</span>
            </div>
            <div v-else>
              <span>密码</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="authority" label="权限"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div v-show="scope.row.operateButton">
              <el-button
                style="margin-left: 10px"
                size="mini"
                type="primary"
                @click="handleEdit(scope)"
              >
                编辑
              </el-button>

              <el-button
                style="margin-left: 10px"
                size="mini"
                type="danger"
                @click="handleDelete(scope)"
              >
                删除
              </el-button>
            </div>
            <div v-show="!scope.row.operateButton">
              <el-button
                style="margin-left: 10px"
                size="mini"
                type="info"
                @click="handleAdd(scope)"
              >
                {{ scope.row.authority }}
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--修改信息- -->
    <el-dialog
      title="修改信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <edit-user v-bind:userdata="editCopyData"></edit-user>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="ApplyEditClick(editCopyData)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!--添加用户- -->
    <el-dialog
      title="添加"
      :visible.sync="dialogAddVisible"
      width="30%"
      :before-close="handleAddClose"
    >
      <add-user v-bind:addUserdata="addData"></add-user>
      <span slot="footer" class="dialog-footer">
        <el-button @click="CancelAddClick()">取 消</el-button>
        <el-button type="primary" @click="ApplyAddClick()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getAdmin,
  getUser,
  getVisit,
  modifyUser,
  deleteUser,
  addUser,
} from "../../api/data";
import AddUser from "./addUser.vue";
import EditUser from "./editUser.vue";
export default {
  components: {
    AddUser,
    EditUser,
  },
  data() {
    return {
      tableData: [
        {
          id: "1",
          date: "创建日期",
          username: "管理员名称",
          password: "密码",
          authority: "添加管理员",
          operateButton: false,
          hasChildren: true,
        },
        {
          id: "2",
          date: "创建日期",
          username: "用户名称",
          password: "密码",
          authority: "添加新用户",
          operateButton: false,
          hasChildren: true,
        },
        {
          id: "3",
          date: "创建日期",
          username: "游客名称",
          password: "密码",
          authority: "添加游客",
          operateButton: false,
          hasChildren: true,
        },
      ],
      dialogVisible: false,
      dialogAddVisible: false,
      editCopyData: {},
      addData: { username: "", password: "", authority: ["首页"], type: "" },
      tree: null,
      treeNode: null,
      resolve: null,
    };
  },
  methods: {
    load(tree, treeNode, resolve) {
      this.tree = tree;
      this.treeNode = treeNode;
      this.resolve = resolve;
      if (tree.id === "1") {
        getAdmin().then((res) => {
          res.adminList = res.adminList.map((item) => {
            item.authority = item.authority.join(",");
            return item;
          });
          resolve(res.adminList);
        });
      } else if (tree.id === "2") {
        getUser().then((res) => {
          res.userList = res.userList.map((item) => {
            item.authority = item.authority.join(",");
            return item;
          });
          resolve(res.userList);
        });
      } else if (tree.id === "3") {
        getVisit().then((res) => {
          res.visitList = res.visitList.map((item) => {
            item.authority = item.authority.join(",");
            return item;
          });
          resolve(res.visitList);
        });
      }
    },
    handleEdit(scrope) {
      scrope.row.authority = scrope.row.authority.split(",");
      this.editCopyData = JSON.parse(JSON.stringify(scrope.row));
      this.dialogVisible = true;
    },
    handleAdd(scrope) {
      console.log(scrope.row.id);
      this.addData.type = scrope.row.id;
      this.dialogAddVisible = true;
    },
    handleDelete(scrope) {
      scrope.row.authority = scrope.row.authority.split(",");
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteUser(scrope.row).then((res) => {
            this.load(this.tree, this.treeNode, this.resolve);
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
    ApplyEditClick(newData) {
      modifyUser(newData).then((res) => {
        this.load(this.tree, this.treeNode, this.resolve);
      });
      this.dialogVisible = false;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    ApplyAddClick() {
      addUser(this.addData).then((res) => {
        if (this.tree !== null) {
          this.load(this.tree, this.treeNode, this.resolve);
        }
      });
      console.log("add apply");
      this.dialogAddVisible = false;
      this.addData = {
        username: "",
        password: "",
        authority: ["首页"],
        type: "",
      };
    },
    CancelAddClick() {
      this.dialogAddVisible = false;
      this.addData = {
        username: "",
        password: "",
        authority: ["首页"],
        type: "",
      };
    },
    handleAddClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
          this.addData = {
            username: "",
            password: "",
            authority: ["首页"],
            type: "",
          };
        })
        .catch((_) => {});
    },
  },
};
</script>