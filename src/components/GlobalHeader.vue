<!--全局导航栏组件-->
<template>
  <a-row class="globalHeader" align="center" :wrap="false">
    <!--栅格布局 auto start-->
    <a-col flex="auto">
      <a-menu
          mode="horizontal"
          :selected-keys="selectedKeys"
          @menu-item-click="doMenuClick"
      >
        <a-menu-item
            key="0"
            :style="{ padding: 0, marginRight: '38px' }"
            disabled
        >
          <!--占位的logo图标-->
          <div class="title-bar">
            <!--logo图片-->
            <img class="logo" src="../../public/logo.svg" alt="#" style="margin-top: 2px"/>
            <!--网站名称-->
            <div class="title">Z95 Exam System</div>
          </div>
        </a-menu-item>
        <!--根据路由动态渲染导航项-->
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <!--栅格布局 auto end-->

    <!--栅格布局 100px start-->
    <!--    <a-col flex="100px">-->
    <div>
      <strong>{{ store.state.user?.loginUser?.userName ?? "未登录" }}</strong>
      <strong style="margin-right: 24px"> ({{ store.state.user?.loginUser?.userRole ?? "undefined" }})</strong>
    </div>
    <!--    </a-col>-->
    <a-button @click="logout" style="margin-right: 24px">退出登录</a-button>
    <!--栅格布局 100px end-->
  </a-row>
</template>
<script setup lang="ts">
// 导入路由配置
import {routes} from "@/router/routes";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {computed, onMounted, ref} from "vue";
import checkAccess from "@/access/checkAccess";
import accessEnum from "@/access/accessEnum";
import {UserControllerService} from "../../generated";
// 全局状态
const store = useStore();

// 路由对象，进行路由跳转
const route = useRouter();
// 选择的导航项，默认主页
const selectedKeys = ref(["/"]);

// 监听路由变化，更新导航项
route.afterEach((to) => {
  selectedKeys.value = [to.path];
});

const logout = async () => {
  const res = await UserControllerService.userLogoutUsingPost();
  await route.push({
    path: "/user/login",
  })
}

// 点击导航项之后进行路由跳转
const doMenuClick = (key: string) => {
  route.push({
    path: key,
  });
};

console.log(store.state.user.loginUser);
/**
 * 过滤掉隐藏路由（控制路由的显隐）
 */
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    return checkAccess(store.state.user.loginUser, item.meta?.access as string);
  });
});
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #444;
  margin-left: 16px;
}

.logo {
  height: 48px;
}
</style>
