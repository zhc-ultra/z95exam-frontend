<template>
  <a-form
    class="userinfo"
    :model="form"
    :style="{ width: '600px' }"
    @submit="handleSubmit"
  >
    <strong style="font: 25px '微软雅黑'">创建考试</strong>

    <a-select
      :style="{ width: '480px', marginLeft: '128px', marginTop: '20px' }"
      placeholder="选择课程"
      :trigger-props="{ autoFitPopupMinWidth: true }"
      @mousedown.native="fetchCourses"
      v-model="form.courseId"
    >
      <a-option v-for="course in courses" :key="course.id" :value="course.id">
        {{ course.name }}
      </a-option>
    </a-select>

    <a-form-item field="title" label="标题" style="margin-top: 20px">
      <a-input v-model="form.title" placeholder="请输入考试标题" />
    </a-form-item>

    <a-form-item field="classId" label="班级">
      <a-input v-model="form.className" placeholder="请输入考试班级" />
    </a-form-item>

    <a-form-item field="examDate" label="日期">
      <a-date-picker
        style="width: 220px; margin: 0 24px 0px 0"
        show-time
        format="YYYY-MM-DD HH:mm"
        v-model:value="form.examDate"
      />
    </a-form-item>

    <a-form-item field="number" label="时长">
      <a-input v-model="form.examTime" placeholder="请输入考试时长" />
    </a-form-item>

    <a-form-item
      field="#"
      label="选择题目"
      style="margin-left: -20vw"
    ></a-form-item>

    <a-space direction="vertical" size="large" fill style="min-width: 50vw">
      <a-table
        row-key="id"
        :columns="columns"
        :data="questions"
        :row-selection="rowSelection"
        v-model:selectedKeys="selectedKeys"
        :pagination="pagination"
      />
    </a-space>

    <a-form-item style="margin-top: 25px">
      <a-button html-type="submit">创建考试</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import {
  Course,
  ExamAddRequest,
  TeacherControllerService,
  UserQueryRequest,
} from "../../../generated";
import { useRoute } from "vue-router";
import axios from "axios";
import message from "@arco-design/web-vue/es/message";

// 定义课程接口，包括 id 和 name
interface Course {
  id: number;
  name: string;
}

const searchParams = ref<UserQueryRequest>({
  pageSize: 8,
  current: 1,
});

const courses = ref<Course[]>([]);
const questions = ref([]); // 存储题目数据

const fetchCourses = async () => {
  try {
    const res = await TeacherControllerService.getCourseListUsingGet();
    if (res.code === 0 && res.data) {
      courses.value = res.data.map((course: any) => ({
        id: course.id,
        name: course.name,
      }));
    } else {
      message.error("课程列表请求错误");
    }
  } catch (error) {
    message.error("网络错误或服务器问题");
    console.error("Error fetching courses:", error);
  }
};

const fetchQuestions = async () => {
  try {
    const res = await TeacherControllerService.queryQuestionPageUsingPost(
      searchParams.value
    );
    if (res.code === 0 && res.data) {
      questions.value = res.data.records.map((question: any) => ({
        id: question.id,
        type: question.typeCN,
        title: question.title,
      }));
    } else {
      message.error("题目列表请求错误");
    }
  } catch (error) {
    message.error("网络错误或服务器问题");
    console.error("Error fetching questions:", error);
  }
};

onMounted(() => {
  fetchCourses();
  fetchQuestions();
});

const form = reactive({
  title: "",
  content: [],
  courseId: null,
  className: "",
  examDate: "",
  examTime: "",
});

const selectedKeys = ref([]);
const rowSelection = reactive({
  type: "checkbox",
  showCheckedAll: true,
  onlyCurrent: false,
});
const pagination = { pageSize: 5 };

const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "题型",
    dataIndex: "type",
  },
  {
    title: "题干",
    dataIndex: "title",
  },
];

const handleSubmit = async () => {
  const selectedQuestionIds = selectedKeys.value.map((key) => parseInt(key));

  const examData: ExamAddRequest = {
    title: form.title,
    content: selectedQuestionIds,
    courseId: form.courseId !== null ? form.courseId : undefined,
    classId: form.className ? parseInt(form.className) : undefined,
    examDate: form.examDate,
    examTime: form.examTime ? parseInt(form.examTime) : undefined,
  };

  try {
    const res = await TeacherControllerService.addExamUsingPost(examData);
    if (res.code === 0) {
      message.success("创建成功");
    } else {
      message.error(`创建失败，${res.message}`);
    }
  } catch (error) {
    message.error("创建考试时发生错误");
    console.error("Error creating exam:", error);
  }
};
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 10px;
}
</style>
