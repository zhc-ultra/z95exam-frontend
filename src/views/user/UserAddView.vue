<template>
  <a-form
    class="userinfo"
    :model="form"
    :style="{ width: '600px' }"
    @submit="handleSubmit"
  >
    <a-form-item field="userName" label="姓名">
      <a-input v-model="form.userName" placeholder="请输入学生姓名" />
    </a-form-item>
    <a-form-item field="number" label="学号">
      <a-input v-model="form.number" placeholder="请输入学生学号" />
    </a-form-item>

    <a-form-item field="number" label="班级">
      <a-input v-model="form.classId" placeholder="请输入学生班级" />
    </a-form-item>

    <a-form-item field="number" label="账号">
      <a-input v-model="form.userAccount" placeholder="请输入学生账号" />
    </a-form-item>

    <a-form-item field="number" label="密码">
      <a-input v-model="form.userPassword" placeholder="请输入学生密码" />
    </a-form-item>

    <a-form-item field="number" label="确认密码">
      <a-input v-model="form.checkPassword" placeholder="请确认学生密码" />
    </a-form-item>
    <a-form-item>
      <a-button html-type="submit">添加</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";

const form = reactive({
  userName: "",
  number: Number(null),
  checkPassword: "",
  classId: Number(null),
  userAccount: "",
  userPassword: "",
});

const handleSubmit = async () => {
  const res = await UserControllerService.userRegisterUsingPost(form);
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
  margin: 25vh auto;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}
</style>
