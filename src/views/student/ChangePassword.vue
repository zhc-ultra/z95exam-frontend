<template>
  <a-form
      class="userinfo"
      :model="form"
      :style="{ width: '600px' }"
      @submit="handleSubmit"
  >
    <a-form-item field="courseName" label="原密码">
      <a-input
          type="password"
          v-model="form.oldPassword"
          placeholder="请输入原密码"
      />
    </a-form-item>

    <a-form-item field="courseName" label="新密码">
      <a-input
          type="password"
          v-model="form.userPassword"
          placeholder="请输入新密码"
      />
    </a-form-item>

    <a-form-item field="courseName" label="重复密码">
      <a-input
          type="password"
          v-model="form.checkPassword"
          placeholder="请输确认密码"
      />
    </a-form-item>
    <a-form-item>
      <a-button html-type="submit">修改</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import {
  TeacherControllerService,
  UserControllerService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import {useRoute, useRouter} from "vue-router";

const form = reactive({
  oldPassword: "",
  userPassword: "",
  checkPassword: "",
});
const router = useRouter();
const handleSubmit = async () => {
  const res = await UserControllerService.updateMyUserUsingPost(form);
  console.log(res.data);
  if (res.code === 0) {
    message.success("修改成功");
    const logoutRes = await UserControllerService.userLogoutUsingPost();
    if (logoutRes.code === 0) {
      await router.push({
        path: "/user/login",
      });
    }
  } else {
    message.error(`修改失败，${res.message}`);
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
