<template>
  <div class="question-add">
    <h1>修改题目</h1>
    <a-form :model="form" :style="{ width: '600px' }" @submit="handleSubmit">
      <a-form-item field="courseName" label="编号">
        <a-input v-model="form.id" disabled/>
      </a-form-item>

      <a-form-item field="courseName" label="课程">
        <a-input v-model="form.courseName" placeholder="请输入课程名称"/>
      </a-form-item>

      <a-form-item field="type" label="类型">
        <strong style="margin-left: 25px">单选</strong>
        <input id="single" type="radio" name="type" value="0"/>
        <strong style="margin-left: 25px">多选</strong>
        <input id="multiple" type="radio" name="type" value="1"/>
        <strong style="margin-left: 25px">填空</strong>
        <input id="fill" type="radio" name="type" value="3"/>
        <strong style="margin-left: 25px">判断</strong>
        <input id="judge" type="radio" name="type" value="2"/>
        <strong style="margin-left: 25px">主观</strong>
        <input id="subjective" type="radio" name="type" value="4"/>
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
        <a-input v-model="post.value" placeholder="please enter your post..."/>
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
      <input type="submit" value="更新题目" style="margin-top: 32px"/>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, reactive} from "vue";
import message from "@arco-design/web-vue/es/message";
import {useRoute} from "vue-router";
import {TeacherControllerService} from "../../../generated";

const form = reactive({
  id: 0,
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
const route = useRoute();

onMounted(async () => {
  // load data
  const id = Number(route.params.id);
  form.id = id;
  const res = await TeacherControllerService.queryQuestionByIdUsingPost(id);
  if (res.code === 0) {
    // set info
    form.courseName = res.data.courseName;
    form.type = res.data.type;
    // 选中单选框
    let radio: any = null;
    if (res.data.type === 0) {
      radio = document.getElementById("single");
    } else if (res.data.type === 1) {
      radio = document.getElementById("multiple");
    } else if (res.data.type === 2) {
      radio = document.getElementById("judge");
    } else if (res.data.type === 3) {
      radio = document.getElementById("fill");
    } else if (res.data.type === 4) {
      radio = document.getElementById("subjective");
    }
    // 设置选中
    radio.checked = true;
    form.title = res.data.title;
    let ans: string = "";
    for (const an of res.data.answer) {
      ans += an + "*%*";
    }
    form.answer = ans;
    const opt = [];
    for (const con of res.data.content.options) {
      opt.push({
        value: con,
      });
    }
    form.option = opt;
  } else {
    message.error("参数错误");
  }
});

// 提交表单
const handleSubmit = async () => {
  // update
  const request = {
    id: form.id,
    answer: computed(() => form.answer.split("*%*")).value,
    content: {
      options: form.option.map((option) => option.value),
    },
    courseName: form.courseName,
    title: form.title,
    type: form.type,
  };
  // 同步
  const res = await TeacherControllerService.updateQuestionUsingPost(request);
  if (res.code === 0) {
    message.success("更新成功");
  } else {
    message.error("更新失败");
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
