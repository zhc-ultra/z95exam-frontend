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
      <template #tags="{ record }">
        <a-space wrap>
          <a-tag v-for="(tag, index) in record.tags" :key="index" color="green">
            {{ tag }}
          </a-tag>
        </a-space>
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="showExamDetail(record)"
          >查看试卷详情
          </a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref, watchEffect} from "vue";
import {
  type ExamQueryRequest,
  StudentControllerService,
} from "@/../generated";
import message from "@arco-design/web-vue/es/message";
import {useRouter} from "vue-router";

const tableRef = ref();
const dataList = ref([]);
const total = ref(0);
const searchParams = ref<ExamQueryRequest>({
  pageSize: 8,
  current: 1,
});

const loadData = async () => {
  const res = await StudentControllerService.getStudentAllExamUsingPost(
          searchParams.value,
      )
  ;
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
  {title: "标题", dataIndex: "title"},
  {title: "考试课程", dataIndex: "courseName"},
  {title: "开始时间", dataIndex: "examDate"},
  {title: "考试时长 / min", dataIndex: "examTime"},
  {title: "状态", dataIndex: "state"},
  {title: "操作", slotName: "optional"},
];

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const showExamDetail = async (record: any) => {
  // 跳转到 user 修改页面
  const res = await StudentControllerService.queryExamSubmitByIdUsingPost(
      {
        examId: Number(record.id)
      }
  );
  if (res.code === 0) {
    router.push({
      path: `/exam-completed/${record.id}`,
    });
  } else {
    message.error("考试已过期或未开始无法查看详情");
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