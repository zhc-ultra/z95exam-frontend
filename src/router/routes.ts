// 路由配置
import {RouteRecordRaw} from "vue-router";
import accessEnum from "@/access/accessEnum";
import UserLayout from "@/layouts/UserLayout.vue";
import LoginView from "@/views/user/LoginView.vue";
import StudentManageView from "@/views/teacher/StudentManageView.vue";
import UserModifyView from "@/views/user/UserModifyView.vue";
import UserAddView from "@/views/user/UserAddView.vue";
import ExamInfoView from "@/views/exam/ExamInfoView.vue";
import ExamModifyView from "@/views/exam/ExamModifyView.vue";
import ExamAddView from "@/views/exam/ExamAddView.vue";
import ScoreQueryView from "@/views/score/ScoreQueryView.vue";
import QuestionView from "@/views/question/QuestionView.vue";
import QuestionAdd from "@/views/question/QuestionAdd.vue";
import QuestionModify from "@/views/question/QuestionModify.vue";
import CourseAdd from "@/views/course/CourseAdd.vue";
import ChangePassword from "@/views/student/ChangePassword.vue";
import ExamCenter from "@/views/student/ExamCenter.vue";
import ExamHistory from "@/views/student/ExamHistory.vue";
import QuestionSubmit from "@/views/score/QuestionSubmit.vue";
import DoExam from "@/views/student/DoExam.vue";
import ExamPaperDetail from "@/views/exam/ExamPaperDetail.vue";
import StudentExamDetail from "@/views/exam/StudentExamDetail.vue";
import HomeView from "@/views/HomeView.vue";
import CompletedExam from "@/views/student/CompletedExam.vue";

export const routes: Array<RouteRecordRaw> = [
    {
        path: "/user",
        name: "用户",
        component: UserLayout,
        children: [
            {
                path: "/user/login",
                name: "用户登录",
                component: LoginView,
            },
        ],
        meta: {
            hideInMenu: true,
        },
    },
    {
        path: "/",
        name: "主页",
        component: HomeView,
        meta: {
            hideInMenu: true,
        },
    },
    {
        path: "/student",
        name: "学生管理",
        component: StudentManageView,
        meta: {
            access: accessEnum.TEACHER,
        },
    },
    {
        path: "/user-modify/:id",
        name: "更新学生",
        component: UserModifyView,
        meta: {
            access: accessEnum.TEACHER,
            hideInMenu: true,
        },
    },
    {
        path: "/exam-modify/:id",
        name: "更新考试",
        component: ExamModifyView,
        meta: {
            access: accessEnum.TEACHER,
            hideInMenu: true,
        },
    },
    {
        path: "/user-add",
        name: "添加学生",
        component: UserAddView,
        meta: {
            access: accessEnum.TEACHER,
            hideInMenu: true,
        },
    },
    {
        path: "/exam-info",
        name: "查看考试信息",
        component: ExamInfoView,
        meta: {
            access: accessEnum.TEACHER,
        },
    },
    {
        path: "/exam-add",
        name: "创建新考试",
        component: ExamAddView,
        meta: {
            access: accessEnum.TEACHER,
        },
    },
    {
        path: "/question",
        name: "题目管理",
        component: QuestionView,
        meta: {
            access: accessEnum.TEACHER,
        },
    },
    {
        path: "/question-add",
        name: "添加题目",
        component: QuestionAdd,
        meta: {
            access: accessEnum.TEACHER,
            hideInMenu: true,
        },
    },
    {
        path: "/question-modify/:id",
        name: "更新题目",
        component: QuestionModify,
        meta: {
            access: accessEnum.TEACHER,
            hideInMenu: true,
        },
    },
    {
        path: "/score",
        name: "成绩查询",
        component: ScoreQueryView,
        meta: {
            access: accessEnum.TEACHER,
        },
    },
    {
        path: "/student-score/:id",
        name: "学生作答情况",
        component: StudentExamDetail,
        meta: {
            access: accessEnum.TEACHER,
            hideInMenu: true,
        },
    },
    {
        path: "/course-add",
        name: "添加课程",
        component: CourseAdd,
        meta: {
            access: accessEnum.TEACHER,
            hideInMenu: true,
        },
    },
    {
        path: "/exam-center",
        name: "考试中心",
        component: ExamCenter,
        meta: {
            access: accessEnum.STUDENT,
        },
    },
    {
        path: "/exam/:id",
        name: "在线考试",
        component: DoExam,
        meta: {
            access: accessEnum.STUDENT,
            hideInMenu: true,
        },
    },
    {
        path: "/user-detail/:id",
        name: "考卷详情",
        component: ExamPaperDetail,
        meta: {
            hideInMenu: true,
        }
    },
    {
        path: "/exam-history",
        name: "考试历史",
        component: ExamHistory,
        meta: {
            access: accessEnum.STUDENT,
        },
    },
    {
        path: "/modify-password",
        name: "修改密码",
        component: ChangePassword,
        meta: {
            access: accessEnum.STUDENT,
        },
    },
    {
        path: "/exam-completed/:id",
        name: "试卷详情",
        component: CompletedExam,
        meta: {
            access: accessEnum.STUDENT,
            hideInMenu: true,
        },
    },
];
