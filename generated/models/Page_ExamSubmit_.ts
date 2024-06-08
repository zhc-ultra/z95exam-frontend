/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExamSubmit } from './ExamSubmit';
import type { OrderItem } from './OrderItem';
export type Page_ExamSubmit_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<ExamSubmit>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};

