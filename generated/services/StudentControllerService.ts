/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_ExamSubmitVO_ } from '../models/BaseResponse_ExamSubmitVO_';
import type { BaseResponse_Page_ExamVO_ } from '../models/BaseResponse_Page_ExamVO_';
import type { ExamQueryRequest } from '../models/ExamQueryRequest';
import type { ExamSubmitAddRequest } from '../models/ExamSubmitAddRequest';
import type { ExamSubmitQueryRequest } from '../models/ExamSubmitQueryRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StudentControllerService {
    /**
     * getStudentExamCenter
     * @param examQueryRequest examQueryRequest
     * @returns BaseResponse_Page_ExamVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getStudentExamCenterUsingPost(
        examQueryRequest: ExamQueryRequest,
    ): CancelablePromise<BaseResponse_Page_ExamVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/exam_center_list',
            body: examQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getStudentAllExam
     * @param examQueryRequest examQueryRequest
     * @returns BaseResponse_Page_ExamVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getStudentAllExamUsingPost(
        examQueryRequest: ExamQueryRequest,
    ): CancelablePromise<BaseResponse_Page_ExamVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/exam_list',
            body: examQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * submitExam
     * @param examSubmitAddRequest examSubmitAddRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static submitExamUsingPost(
        examSubmitAddRequest: ExamSubmitAddRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/exam_submit',
            body: examSubmitAddRequest,
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
    public static queryExamSubmitByIdUsingPost(
        examSubmitQueryRequest: ExamSubmitQueryRequest,
    ): CancelablePromise<BaseResponse_ExamSubmitVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/query_exam_submit',
            body: examSubmitQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
