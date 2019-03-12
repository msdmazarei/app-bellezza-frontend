import { base_repo } from "./base_repo";
import { IUser } from "../models/user";

import axios, { AxiosError } from 'axios';
import { unauth_error, internal_server_error, general_error } from '../utils/make_exception';
import { is_ok_response } from '../utils/http_helper';
import { number } from "prop-types";
import { event } from '../models/event'

export class event_repo extends base_repo {
    static async get_count(user: IUser): Promise<number> {
        const r = await base_repo.run_http<{ count: number }>(() => axios.get("/api/events/_count", base_repo.auth_config(user)))
        return r.data.count
    }
    static server_response_to_event(a: any): event {
        return {
            ...a, 
            create_unixepoch: a.creation_date,

        } as event
    }
    static async get_events(user: IUser, from_unixepoch: number, count: number): Promise<Array<event>> {
        const r = await base_repo.run_http(() =>
            axios.post("/api/events/_search", { 
                scroll: "down" ,
                count: count, time: from_unixepoch,
            }, base_repo.auth_config(user)))
        return (r.data.result || []).map(event_repo.server_response_to_event)

    }
}


//  http://localhost:8080/events/_count