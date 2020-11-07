import { SortOrder } from "../enums/sort-order.enum";

export interface IndexDto {
    query?: string;
    limit?: number;
    offset?: number;
    sort_order?: SortOrder;
}
