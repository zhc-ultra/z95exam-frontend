/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Exam } from './Exam';
import type { OrderItem } from './OrderItem';
export type Page_Exam_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<Exam>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};

