export class PaginationModel {
    skip: number;
    take: number;
    orderByTerm: string;
    orderType: string;
    currentPage: number;
    totalRecords: number;
    sortColumnName: string;
    isDescending: boolean;


    constructor(take, sortColumnName, isDescending) {
        this.skip = 0;
        this.take = take;
        this.totalRecords = 0;
        this.currentPage = 1;
        this.orderByTerm = '';
        this.sortColumnName = sortColumnName;
        this.isDescending = isDescending;
    }


}