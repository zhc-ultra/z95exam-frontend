<!--通用布局组件-->
<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <!--导航栏-->
      <a-layout-header class="header">
        <global-header />
        <hr color="#eee" style="margin-top: -5px;position: absolute">
      </a-layout-header>
      <!--内容-->
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <!--页脚-->
      <a-layout-footer class="footer">github @</a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>

#basicLayout {
}

#basicLayout .header {
  box-shadow: #eee 1px 1px 5px;
  margin-bottom: 20px;
}

#basicLayout .content {
  margin-top: 20px;
  padding:0 20px 20px 20px;
  background: linear-gradient(to right, #fefefe, #fff);
}

#basicLayout .footer {
  background-color: #efefef;
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>

<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>
