<template>
  <div id="questionsView">
    <a-button @click="addStudent">添加学生</a-button>
    <a-divider size="0" />
    <a-table
      :ref="tableRef"
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #tags="{ record }">
        <a-space wrap>
          <a-tag v-for="(tag, index) in record.tags" :key="index" color="green">
            {{ tag }}
          </a-tag>
        </a-space>
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="modifyRecord(record)">修改</a-button>
        </a-space>
        <a-space style="margin-left: 36px">
          <a-button type="primary" @click="deleteRecord(record)">删除</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  TeacherControllerService,
  UserControllerService,
  UserQueryRequest,
} from "@/../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";

const tableRef = ref();
const dataList = ref([]);
const total = ref(0);
const searchParams = ref<UserQueryRequest>({
  userName: "",
  pageSize: 8,
  current: 1,
});

const loadData = async () => {
  const res = await TeacherControllerService.listUserByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败，" + res.message);
  }
};

watchEffect(() => {
  loadData();
});

onMounted(() => {
  loadData();
});

const columns = [
  { title: "编号", dataIndex: "id" },
  { title: "姓名", dataIndex: "userName" },
  { title: "学号", dataIndex: "number" },
  { title: "密码", dataIndex: "userPassword" },
  { title: "操作", slotName: "optional" },
];

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const modifyRecord = (record: any) => {
  // 跳转到 user 修改页面
  router.push({
    path: `/user-modify/${record.id}`,
  });
};
const addStudent = () => {
  router.push({
    path: `/user-add`,
  });
};

const deleteRecord = async (record: any) => {
  try {
    const deleteRequest = { id: record.id };
    const res = await UserControllerService.deleteUserUsingPost(deleteRequest);
    if (res.code === 0) {
      message.success("删除成功");
      loadData();
    } else {
      message.error(`删除失败，${res.message}`);
    }
  } catch (error) {
    message.error("操作失败");
  }
};

const router = useRouter();
</script>

<style scoped>
#questionsView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
