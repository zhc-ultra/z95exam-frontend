<template>
  <div v-if="exam">
    <a-card style="margin-bottom: 25px;max-width: 60vw;margin-left: 20vw;margin-top: 32px;margin-bottom: 32px">
      <h1>{{ exam.title }}</h1>
      <p>考试课程: {{ courseName }} </p>
      <p>考试日期: {{ formatDate(exam.examDate) }}</p>
      <p>考试时长: {{ exam.examTime }} 分钟</p>
    </a-card>
    <a-form :model="answers" layout="vertical" @submit="handleSubmit"
            style="max-width: 60vw;margin-left: 20vw;margin-top: 32px;margin-bottom: 32px">>
      <div v-for="(question, index) in exam.questions" :key="question.id">
        <a-form-item :label="`题目 ${index + 1}: ${question.title}`">
          <a-radio-group v-model="answers[question.id]" direction="vertical">
            <a-radio value="A">A: {{ question.choiceA }}</a-radio>
            <a-radio value="B">B: {{ question.choiceB }}</a-radio>
            <a-radio value="C">C: {{ question.choiceC }}</a-radio>
            <a-radio value="D">D: {{ question.choiceD }}</a-radio>
          </a-radio-group>
        </a-form-item>
      </div>
      <a-form-item>
        <a-button type="primary" html-type="submit">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
  <div v-else>
    <a-spin>加载中...</a-spin>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, onMounted} from "vue";
import {useRoute} from "vue-router";
import {
  type Answer,
  StudentControllerService,
  TeacherControllerService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import router from "@/router";

interface Question {
  id: string;
  title: string;
  type: string;
  choiceA?: string;
  choiceB?: string;
  choiceC?: string;
  choiceD?: string;
}

interface Exam {
  id: string; // 添加试卷ID
  title: string;
  examDate: string;
  examTime: number;
  questions: Question[];
}

interface ExamSubmitAddRequest {
  answers?: Array<Answer>;
  examId?: number;
}

const route = useRoute();
const exam = ref<Exam | null>(null);
const answers = reactive<Record<string, string>>({});
const courseName = ref();
const queryExamByIdUsingPost = async () => {
  try {
    const id = route.params.id;
    const response = await TeacherControllerService.queryExamByIdUsingPost(
        Number(id)
    );
    if (response.code === 0) {
      exam.value = response.data;
      courseName.value = response.data.courseName;
      exam.value?.questions.forEach((question) => {
        answers[question.id] = "";
      });
    }
  } catch (error) {
    console.error("Failed to fetch exam data:", error);
  }
};

const handleSubmit = async () => {
  const submitData = {
    examId: exam.value?.id, // 添加试卷ID到提交的数据中
    answers: Object.entries(answers).map(([questionId, answer]) => ({
      questionId,
      answer,
    })),
  };
  const res = await StudentControllerService.submitExamUsingPost(
      submitData as unknown as ExamSubmitAddRequest
  );
  if (res.code === 0) {
    message.success("提交成功");
    await router.push({
      path: `/exam-center`,
    });
  } else {
    message.error("提交失败");
  }
};

onMounted(() => {
  queryExamByIdUsingPost();
});

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString();
};
</script>

<style scoped>
/* 你的样式 */
</style>
