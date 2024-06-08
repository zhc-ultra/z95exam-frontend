/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QuestionVO } from './QuestionVO';
export type ExamSubmitVO = {
    content?: string;
    courseId?: number;
    courseName?: string;
    examDate?: string;
    examTime?: number;
    id?: number;
    questions?: Array<QuestionVO>;
    state?: string;
    studentName?: string;
    teacherId?: number;
    teacherName?: string;
    title?: string;
};

