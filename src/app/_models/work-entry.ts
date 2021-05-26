import { DailyReport } from "./daily-report";
import { Employee } from "./employee";

export class WorkEntry{
    id!: number;
    hours!:number;
    factor!:number;
    night!: boolean;
    height!: boolean;
    category!: string;
    description!: string;
    name!: string;
    last_name!:string;
    daily_report!: DailyReport;
}

export class WorkEntryRequest{
    daily_report_id!:number;
    employee_id!:number;
    hours!:number;
    factor!:number;
    night!: boolean;
    height!: boolean;
    description!: string;   
}

export class WorkEntryRequestArray{
    daily_report_id!: number;
    entries!: WorkEntryRequest[];

    public constructor(init?: Partial<WorkEntryRequestArray>) {
        Object.assign(this, init);
    }
}