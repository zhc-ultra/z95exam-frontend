<template>
  <a-form
    class="userinfo"
    :model="form"
    :style="{ width: '600px' }"
    @submit="handleSubmit"
  >
    <a-form-item field="id" label="编号">
      <a-input v-model="form.id" placeholder="请输入学生编号" disabled />
    </a-form-item>
    <a-form-item field="userName" label="姓名">
      <a-input v-model="form.userName" placeholder="请输入学生姓名" />
    </a-form-item>
    <a-form-item field="number" label="学号">
      <a-input v-model="form.number" placeholder="请输入学生学号" />
    </a-form-item>

    <a-form-item field="number" label="密码">
      <a-input v-model="form.userPassword" placeholder="请输入学生密码" />
    </a-form-item>

    <a-form-item>
      <a-button html-type="submit">更新</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { UserControllerService, UserUpdateRequest } from "../../../generated";
import { useRoute } from "vue-router";
import message from "@arco-design/web-vue/es/message";

const form = reactive({
  id: 0,
  userName: "",
  number: 0,
  userPassword: "",
});
const route = useRoute();
onMounted(async () => {
  const id = Number(route.params.id);
  const res = await UserControllerService.getUserByIdUsingGet(id);
  if (res.code === 0) {
    form.id = id;
    form.userName = <string>res.data?.userName;
    form.number = <number>res.data?.number;
    form.userPassword = <string>res.data?.userPassword;
  } else {
    message.error(`加载失败，${res.message}`);
  }
});

const handleSubmit = async () => {
  const res = await UserControllerService.updateUserUsingPost(form);
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
