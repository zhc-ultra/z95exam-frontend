<template>
  <div class="question-add">
    <h1>创建题目</h1>
    <a-form :model="form" :style="{ width: '600px' }" @submit="handleSubmit">
      <a-form-item field="courseName" label="课程">
        <a-input v-model="form.courseName" placeholder="请输入课程名称"/>
      </a-form-item>

      <a-form-item field="type" label="类型">
        <strong style="margin-left: 25px">单选</strong>
        <input type="radio" name="type" value="0"/>
        <strong style="margin-left: 25px">多选</strong>
        <input type="radio" name="type" value="1" disabled/>
        <strong style="margin-left: 25px">填空</strong>
        <input type="radio" name="type" value="3" disabled/>
        <strong style="margin-left: 25px">判断</strong>
        <input type="radio" name="type" value="2" disabled/>
        <strong style="margin-left: 25px">主观</strong>
        <input type="radio" name="type" value="4" disabled/>
      </a-form-item>

      <a-form-item field="title" label="题干">
        <a-input v-model="form.title" placeholder="请输入题干"/>
      </a-form-item>

      <a-form-item
          v-for="(post, index) of form.option"
          :field="`option[${index}].value`"
          :label="`选项-${index + 1}`"
          :key="index"
      >
        <a-input v-model="post.value" placeholder="请输入选项内容"/>
        <a-button @click="handleDelete(index)" :style="{ marginLeft: '10px' }"
        >Delete
        </a-button>
      </a-form-item>

      <a-form-item field="answer" label="答案">
        <a-input
            v-model="form.answer"
            placeholder="请输入题目答案,多个答案使用 *%* 进行分割"
        />
      </a-form-item>
      <div>
        <a-button @click="handleAdd">添加选项</a-button>
      </div>
      <input type="submit" value="创建题目" style="margin-top: 32px;min-height: 32px"/>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import {computed, reactive} from "vue";
import message from "@arco-design/web-vue/es/message";
import {TeacherControllerService} from "../../../generated";

const form = reactive({
  courseName: "",
  type: 0,
  title: "",
  answer: "",
  option: [{value: ""}],
});

const handleAdd = () => {
  form.option.push({
    value: "",
  });
};

const handleDelete = (index: any) => {
  form.option.splice(index, 1);
};

// 提交表单
const handleSubmit = async () => {
  const request = {
    answer: computed(() => form.answer.split("*%*")).value,
    content: {
      options: form.option.map((option) => option.value),
    },
    courseName: form.courseName,
    title: form.title,
    type: form.type,
  };

  // 同步
  const res = await TeacherControllerService.addQuestionUsingPost(request);
  if (res.code === 0) {
    message.success("添加成功");
  } else {
    message.error("添加失败");
  }
};
</script>

<style scoped>
.question-add {
  /* 保持原有样式 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  margin: 5vh auto;
  padding: 10px;
}
</style>
