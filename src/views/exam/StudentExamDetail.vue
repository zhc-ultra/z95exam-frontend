<template>
  <div v-if="exam" class="exam-paper">
    <a-card style="margin-bottom: 25px;max-width: 60vw;margin-left: 20vw;margin-top: 32px;margin-bottom: 32px">
      <h1>{{ exam.title }}</h1>
      <p>考试课程: {{ courseName }} </p>
      <p>考试日期: {{ formatDate(exam.examDate) }}</p>
      <p>考试时长: {{ exam.examTime }} 分钟</p>
      <p>考试状态: {{ state }} </p>
    </a-card>
    <a-form :model="answers" layout="vertical"
            style="max-width: 60vw;margin-left: 20vw;margin-top: 32px;margin-bottom: 32px">
      <div v-for="(question, index) in exam.questions" :key="question.id">
        <a-form-item :label="`题目 ${index + 1}: ${question.title}  ( ${question.score} 分 )`">
          <a-radio-group v-model="answers[question.id]" direction="vertical" :disabled="true">
            <a-radio value="A">A: {{ question.choiceA }}</a-radio>
            <a-radio value="B">B: {{ question.choiceB }}</a-radio>
            <a-radio value="C">C: {{ question.choiceC }}</a-radio>
            <a-radio value="D">D: {{ question.choiceD }}</a-radio>
          </a-radio-group>
        </a-form-item>
        <p style="margin: 24px 0">正确答案: {{ question.answer[0] }} </p>
      </div>
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
  answer?: string[];
}

interface Exam {
  id: string; // 添加试卷ID
  title: string;
  examDate: string;
  examTime: number;
  questions: Question[];
}

const route = useRoute();
const exam = ref<Exam | null>(null);
const courseName = ref('');
const state = ref('');
const answers = reactive<Record<string, string>>({});

const queryExamByIdUsingPost = async () => {
  try {
    const id = route.params.id;
    const response = await TeacherControllerService.queryExamSubmitByIdUsingPost1(
        {
          id: Number(id)
        }
    );
    if (response.code === 0) {
      courseName.value = response.data.courseName;
      state.value = response.data.state;
      exam.value = response.data;
      exam.value?.questions.forEach((question) => {
        if (question.answer && question.answer.length > 0) {
          answers[question.id] = question.answer[0];
        } else {
          answers[question.id] = "";
        }
      });
    }
  } catch (error) {
    console.error("Failed to fetch exam data:", error);
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
.exam-paper {
}
</style>
