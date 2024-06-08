<template>
  <div class="home">
    <h1 style="margin-left: 35vw">欢迎使用Z95 在线考试系统！</h1>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import MDEditor from "@/components/MDEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue";

const value = ref();
const onChange = (v: string) => {
  value.value = v;
};
</script>
