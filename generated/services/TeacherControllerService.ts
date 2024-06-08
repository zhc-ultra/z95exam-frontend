/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type {BaseResponse_boolean_} from '../models/BaseResponse_boolean_';
import type {BaseResponse_ExamSubmitVO_} from '../models/BaseResponse_ExamSubmitVO_';
import type {BaseResponse_ExamVO_} from '../models/BaseResponse_ExamVO_';
import type {BaseResponse_List_Course_} from '../models/BaseResponse_List_Course_';
import type {BaseResponse_long_} from '../models/BaseResponse_long_';
import type {BaseResponse_Page_Exam_} from '../models/BaseResponse_Page_Exam_';
import type {BaseResponse_Page_ExamSubmit_} from '../models/BaseResponse_Page_ExamSubmit_';
import type {BaseResponse_Page_QuestionVO_} from '../models/BaseResponse_Page_QuestionVO_';
import type {BaseResponse_Page_User_} from '../models/BaseResponse_Page_User_';
import type {BaseResponse_QuestionVO_} from '../models/BaseResponse_QuestionVO_';
import type {CourseAddRequest} from '../models/CourseAddRequest';
import type {ExamAddRequest} from '../models/ExamAddRequest';
import type {ExamQueryRequest} from '../models/ExamQueryRequest';
import type {ExamSubmitQueryRequest} from '../models/ExamSubmitQueryRequest';
import type {ExamUpdateRequest} from '../models/ExamUpdateRequest';
import type {QuestionAddRequest} from '../models/QuestionAddRequest';
import type {QuestionDeleteRequest} from '../models/QuestionDeleteRequest';
import type {QuestionQueryRequest} from '../models/QuestionQueryRequest';
import type {QuestionUpdateRequest} from '../models/QuestionUpdateRequest';
import type {UserQueryRequest} from '../models/UserQueryRequest';
import type {CancelablePromise} from '../core/CancelablePromise';
import {OpenAPI} from '../core/OpenAPI';
import {request as __request} from '../core/request';

export class TeacherControllerService {
    /**
     * allDelete
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static allDeleteUsingPost(): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/teacher/all_delete',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * addCourse
     * @param courseAddRequest courseAddRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addCourseUsingPost(
        courseAddRequest: CourseAddRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/teacher/course_add',
            body: courseAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getCourseList
     * @returns BaseResponse_List_Course_ OK
     * @throws ApiError
     */
    public static getCourseListUsingGet(): CancelablePromise<BaseResponse_List_Course_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/teacher/course_list',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * addExam
     * @param examAddRequest examAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addExamUsingPost(
        examAddRequest: ExamAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/teacher/exam_add',
            body: examAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * deleteExam
     * @param examQueryRequest examQueryRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteExamUsingPost(
        examQueryRequest: ExamQueryRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/teacher/exam_delete',
            body: examQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listExamByPage
     * @param examQueryRequest examQueryRequest
     * @returns BaseResponse_Page_Exam_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listExamByPageUsingPost(
        examQueryRequest: ExamQueryRequest,
    ): CancelablePromise<BaseResponse_Page_Exam_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/teacher/exam_list',
            body: examQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * queryExamById
     * @param id id
     * @returns BaseResponse_ExamVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static queryExamByIdUsingPost(
        id?: number,
    ): CancelablePromise<BaseResponse_ExamVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/teacher/exam_query',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * updateExam
     * @param examUpdateRequest examUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateExamUsingPost(
        examUpdateRequest: ExamUpdateRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/teacher/exam_update',
            body: examUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * queryExamSubmitById
     * @param examSubmitQueryRequest examSubmitQueryRequest
     * @returns BaseResponse_ExamSubmitVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static queryExamSubmitByIdUsingPost1(
        examSubmitQueryRequest: ExamSubmitQueryRequest,
    ): CancelablePromise<BaseResponse_ExamSubmitVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/teacher/query_exam_submit',
            body: examSubmitQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * addQuestion
     * @param questionAddRequest questionAddRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addQuestionUsingPost(
        questionAddRequest: QuestionAddRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/teacher/question_add',
            body: questionAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * deleteQuestion
     * @param questionDeleteRequest questionDeleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteQuestionUsingPost(
        questionDeleteRequest: QuestionDeleteRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/teacher/question_delete',
            body: questionDeleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * queryQuestionById
     * @param content
     * @param courseId
     * @param current
     * @param id
     * @param pageSize
     * @param sortField
     * @param sortOrder
     * @param title
     * @param userId
     * @returns BaseResponse_QuestionVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static queryQuestionByIdUsingPost(
        id?: number,
        content?: string,
        courseId?: number,
        current?: number,
        pageSize?: number,
        sortField?: string,
        sortOrder?: string,
        title?: string,
        userId?: number,
    ): CancelablePromise<BaseResponse_QuestionVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/teacher/question_query',
            query: {
                'content': content,
                'courseId': courseId,
                'current': current,
                'id': id,
                'pageSize': pageSize,
                'sortField': sortField,
                'sortOrder': sortOrder,
                'title': title,
                'userId': userId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * queryQuestionPage
     * @param questionQueryRequest questionQueryRequest
     * @returns BaseResponse_Page_QuestionVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static queryQuestionPageUsingPost(
        questionQueryRequest: QuestionQueryRequest,
    ): CancelablePromise<BaseResponse_Page_QuestionVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/teacher/question_query_page',
            body: questionQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * updateQuestion
     * @param questionUpdateRequest questionUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateQuestionUsingPost(
        questionUpdateRequest: QuestionUpdateRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/teacher/question_update',
            body: questionUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listUserByPage
     * @param userQueryRequest userQueryRequest
     * @returns BaseResponse_Page_User_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listUserByPageUsingPost(
        userQueryRequest: UserQueryRequest,
    ): CancelablePromise<BaseResponse_Page_User_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/teacher/student_list',
            body: userQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * queryExamSubmitByPage
     * @param examSubmitQueryRequest examSubmitQueryRequest
     * @returns BaseResponse_Page_ExamSubmit_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static queryExamSubmitByPageUsingPost(
        examSubmitQueryRequest: ExamSubmitQueryRequest,
    ): CancelablePromise<BaseResponse_Page_ExamSubmit_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/teacher/student_score_list',
            body: examSubmitQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
