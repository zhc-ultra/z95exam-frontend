<template>
  <div id="questionsView">
    <a-button @click="addExam">添加考试</a-button>

    <a-button @click="addCourse" style="margin-left: 32px">添加课程</a-button>
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
        <a-space style="margin-left: 36px">
          <a-button type="primary" @click="detailRecord(record)"
            >考卷详情
          </a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { TeacherControllerService, UserQueryRequest } from "../../../generated";
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
  const res = await TeacherControllerService.listExamByPageUsingPost(
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
  { title: "试卷名称", dataIndex: "title" },
  { title: "考试时间", dataIndex: "examDate" },
  { title: "考试时长", dataIndex: "examTime" },
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
    path: `/exam-modify/${record.id}`,
  });
};

const detailRecord = (record: any) => {
  router.push({
    path: `/user-detail/${record.id}`,
  });
};
const addExam = () => {
  router.push({
    path: `/exam-add`,
  });
};

const addCourse = () => {
  router.push({
    path: `/course-add`,
  });
};

const deleteRecord = async (record: any) => {
  try {
    const deleteRequest = { id: record.id };
    const res = await TeacherControllerService.deleteExamUsingPost(
      deleteRequest
    );
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
