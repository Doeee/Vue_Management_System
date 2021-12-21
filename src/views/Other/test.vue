<template>
  <div class="page_list">
    <div class="table_search">
      <div class="search_item">
        <el-input v-model="name" placeholder="名称" />
      </div>
      <el-button
        class="serach_btn"
        :disabled="loading"
        icon="el-icon-search"
        type="primary"
        @click="searchBtn"
        >查 询</el-button
      >
      <el-button
        class="serach_btn"
        :disabled="loading"
        icon="el-icon-refresh-right"
        @click="clearCondition"
        >重 置</el-button
      >
      <el-button
        class="serach_btn"
        :disabled="loading"
        type="success"
        icon="el-icon-plus"
        @click="add()"
        >新增</el-button
      >
      <el-popconfirm
        class="m-l-10"
        title="是否批量删除?"
        @onConfirm="multipleDelete"
      >
        <el-button
          slot="reference"
          class="serach_btn"
          :disabled="loading"
          type="danger"
          icon="el-icon-delete"
          >批量删除</el-button
        >
      </el-popconfirm>
    </div>
    <div class="table_place">
      <el-table
        ref="table"
        v-loading="loading"
        border
        row-key="id"
        :data="list"
        lazy
        :load="load"
        size="small"
        style="width: 100%"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        @selection-change="selectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="name" label="名称" align="center" width="130" />
        <el-table-column align="center" label="操作" width="220" fixed="right">
          <template slot-scope="{ row }">
            <el-button type="success" size="mini" @click="add(row)"
              >新增</el-button
            >
            <el-button type="primary" size="mini" @click="edit(row)"
              >编辑</el-button
            >
            <el-popconfirm
              class="m-l-10"
              title="是否删除?"
              @onConfirm="deleteBtn(row)"
            >
              <el-button slot="reference" type="danger" size="mini"
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total"
        :total="total"
        :page.sync="pageNo"
        :limit.sync="limit"
        @pagination="pageChange"
      />
    </div>
    <Operate
      :is-add="isAdd"
      :parent="parent"
      :data="editData"
      :visible="visibleOperate"
      @update="getList"
      @cancel="hiddenOperate"
    />
  </div>
</template>
<script>
import { getLists, getChildrenLists, deleteRows } from "@/api";
import Operate from "./operate";
export default {
  components: {
    Operate, // 新增编辑操作组件
  },
  data() {
    return {
      name: "",
      loading: false,
      isDelete: false,
      parentIds: [], // 操作时存储有父节点的，即需要更新的
      pageNo: 1,
      limit: 10,
      total: 0,
      list: [],
      multipleSelection: [],
      isAdd: false,
      parent: "0", // 新增存储父节点id
      visibleOperate: false,
      editData: {},
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getList();
    },
    getList() {
      const { pageNo, limit, name } = this;
      if (!this.loading) {
        this.loading = true;
      } else {
        return;
      }
      getLists({
        pageNo,
        limit,
        name,
      })
        .then((res) => {
          if (
            res.code == 200 &&
            res.result.records &&
            res.result.records.length >= 0
          ) {
            const records = res.result.records;
            this.list = records;
            const parentIds = this.parentIds;
            if (parentIds.length) {
              parentIds.forEach((id) => {
                this.updateList(id);
              });
            }
            this.initPages(res.result);
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    initPages(obj) {
      this.limit = parseInt(obj.limit);
      this.total = parseInt(obj.total);
      this.pageNo = parseInt(obj.pageNo);
    },
    load(tree, treeNode, resolve) {
      const pid = tree.id;
      getChildrenLists(pid).then((res) => {
        if (res.code == 200) {
          const nodes = res.result;
          resolve(nodes);
        }
      });
    },
    updateList(pid) {
      getChildrenLists(pid).then((res) => {
        if (res.code == 200) {
          const nodes = res.result || [];
          this.$set(this.$refs.table.store.states.lazyTreeNodeMap, pid, nodes);
        }
      });
    },
    pageChange() {
      this.parentIds = [];
      this.getList();
    },
    searchBtn() {
      this.pageNo = 1;
      this.parentIds = [];
      this.getList();
    },
    clearCondition() {
      this.parentIds = [];
      this.pageNo = 1;
      this.limit = 10;
      this.name = "";
      this.getList();
    },
    selectionChange(val) {
      this.multipleSelection = val;
    },
    hiddenOperate() {
      this.toggleOperate(false);
    },
    toggleOperate(flag) {
      this.visibleOperate = flag;
    },
    changeIsAdd(flag) {
      this.isAdd = flag;
    },
    add(row) {
      if (row) {
        this.parent = row.id;
        this.parentIds = [row.id];
        this.editData = { ...row };
      } else {
        this.parentIds = [];
        this.parent = "";
        this.scope_code = "";
      }
      this.changeIsAdd(true);
      this.toggleOperate(true);
    },
    edit(row) {
      this.editData = { ...row };
      this.parent = row.id;
      if (row.parentId != "") {
        this.parentIds = [row.parentId];
      } else {
        this.parentIds = [];
      }
      this.toggleOperate(true);
      this.changeIsAdd(false);
    },
    deleteBtn(row) {
      if (row.parentId != "") {
        this.parentIds = [row.parentId];
      } else {
        this.parentIds = [];
      }
      this.delete([row.id]);
    },
    delete(ids) {
      const isDelete = this.isDelete;
      if (!isDelete) {
        this.isDelete = true;
        deleteRows(ids)
          .then((res) => {
            if (res.code == 200) {
              this.$message.success("删除成功");
              this.pageNo = 1;
              this.limit = 10;
              this.name = "";
              this.getList();
            }
            this.isDelete = false;
          })
          .catch(() => {
            this.isDelete = false;
          });
      } else {
        this.$message.warning("正在删除");
      }
    },
    multipleDelete() {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length) {
        const parentIds = [];
        const data = multipleSelection.map((item) => {
          if (item.parentId != "") {
            parentIds.push(item.parentId);
          }
          return item.id;
        });
        this.parentIds = [...new Set(parentIds)];
        this.delete(data);
      } else {
        this.$message.warning("请选择删除项");
      }
    },
  },
};
</script>
