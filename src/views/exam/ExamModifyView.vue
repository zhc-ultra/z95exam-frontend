<template>
  <a-form
    class="userinfo"
    :model="form"
    :style="{ width: '600px' }"
    @submit="handleSubmit"
  >
    <a-form-item field="id" label="考试编号">
      <a-input v-model="form.id" placeholder="" disabled />
    </a-form-item>

    <a-form-item field="userName" label="考试班级">
      <a-input v-model="form.id" placeholder="" />
    </a-form-item>
    <a-form-item field="number" label="考试标题">
      <a-input v-model="form.title" placeholder="请输入学生学号" />
    </a-form-item>

    <a-form-item field="number" label="考试时间">
      <a-input v-model="form.examDate" placeholder="请输入学生密码" />
    </a-form-item>

    <a-form-item field="number" label="考试时长">
      <a-input v-model="form.examTime" placeholder="请输入学生密码" />
    </a-form-item>

    <a-form-item>
      <a-button html-type="submit">更新</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { TeacherControllerService } from "../../../generated";
import { useRoute } from "vue-router";
import message from "@arco-design/web-vue/es/message";

const form = reactive({
  id: 0,
  classId: Number(0),
  title: "",
  examDate: "",
  examTime: Number(0),
});
const route = useRoute();
onMounted(async () => {
  const id = Number(route.params.id);
  form.id = id;
  const res = await TeacherControllerService.queryExamByIdUsingPost(id);
  if (res.code === 0) {
    form.classId = res.data?.classId ?? 0;
    form.title = res.data?.title ?? "";
    form.examDate = res.data?.examDate ?? "";
    form.examTime = res.data?.examTime ?? 0;
  } else {
    message.error(`加载失败，${res.message}`);
  }
});

const handleSubmit = async () => {
  const res = await TeacherControllerService.updateExamUsingPost(form);
  if (res.code === 0) {
    message.success("更新成功");
  } else {
    message.error(`更新失败，${res.message}`);
  }
};
</script>

<style scoped>
.userinfo {
  /* 保持原有样式 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  margin: 25vh auto;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}
</style>
