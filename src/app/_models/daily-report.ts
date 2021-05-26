import { Customer } from "./customer";
import { Profile } from "./profile";
import { WorkEntry } from "./work-entry";

export class DailyReport{
    id! : number;
    detail! : string;
    date! : Date;
    customer! : Customer;
    manager! : Profile;
    ost! : string;
    ose! : string;
    entries! : WorkEntry[];
    signature! : string;
    name! : string;
}

export class DailyReportRequest{
    detail! : string;
    date! : Date;
    customer_id!: number;
    manager_id! : number;
    ost! : string;
    ose! : string;

    public constructor(init?: Partial<DailyReportRequest>) {
        Object.assign(this, init);
    }
}