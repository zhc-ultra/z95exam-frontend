<template>
  <div id="questionsView">
    <a-divider size="0"/>
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
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="showRecord(record)"
          >查看学生作答情况
          </a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watchEffect} from "vue";
import {TeacherControllerService, UserQueryRequest} from "@/../generated";
import message from "@arco-design/web-vue/es/message";
import {useRouter} from "vue-router";

const tableRef = ref();
const dataList = ref([]);
const total = ref(0);
const searchParams = ref<UserQueryRequest>({
  userName: "",
  pageSize: 8,
  current: 1,
});

const loadData = async () => {
  const res = await TeacherControllerService.queryExamSubmitByPageUsingPost(
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
  {title: "编号", dataIndex: "id"},
  {title: "学生id", dataIndex: "userId"},
  {title: "考试id", dataIndex: "examId"},
  {title: "分数", dataIndex: "score"},
  {title: "考试记录", slotName: "optional"},
];

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const showRecord = (record: any) => {
  // 跳转到 user 修改页面
  router.push({
    path: `/student-score/${record.id}`,
  });
};

const router = useRouter();
</script>

<style scoped>
#questionsView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
