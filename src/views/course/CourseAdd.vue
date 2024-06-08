<template>
  <a-form
    class="userinfo"
    :model="form"
    :style="{ width: '600px' }"
    @submit="handleSubmit"
  >
    <a-form-item field="courseName" label="课程名">
      <a-input v-model="form.courseName" placeholder="请输入课程名称" />
    </a-form-item>
    <a-form-item>
      <a-button html-type="submit">添加</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import {
  TeacherControllerService,
  UserControllerService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";

const form = reactive({
  courseName: "",
});

const handleSubmit = async () => {
  const res = await TeacherControllerService.addCourseUsingPost(form);
  console.log(res.data);
  if (res.code === 0) {
    message.success("添加成功");
  } else {
    message.error(`添加失败，${res.message}`);
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
  margin: 0 auto;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}
</style>
