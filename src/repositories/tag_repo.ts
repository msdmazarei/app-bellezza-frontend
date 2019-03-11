import { base_repo } from './base_repo';
import { ITag } from '../models/tag';
import axios, { AxiosError } from 'axios';
import { unauth_error, internal_server_error } from '../utils/make_exception';
import { is_ok_response } from '../utils/http_helper';

export class tag_repo extends base_repo {
    static async get_primary_tags(): Promise<Array<ITag>> {
        try {
            let result = await axios.post<any>("/api/categories/_search")
            if (is_ok_response(result.status)) {
                return result.data.result.map((x: any) => {
                    return {
                        id: x.id,
                        create_unixepoch: x.creation_date,
                        description: x.description,
                        icon: `/api/serve-files/${x.image}`,
                        is_primary: true,
                        modify_unixepoch: x.modification_date,
                        title: x.title
                    } as ITag
                })

            } else {
                throw internal_server_error()
            }
        } catch (e) {
            const err: AxiosError = e
            throw internal_server_error()
        }

        // let rtn: Array<ITag> = [];
        // let titles = {
        //     "clothes": "لباس",
        //     "shoes": "کفش",
        //     "bags": "کیف",
        //     "hairs": "طرح مو",
        //     "design": "طراحی ها"
        // };
        // return Object.keys(titles).map(x => {
        //     return {
        //         id: x,
        //         icon: `images/tags/${x}.png`,
        //         title: (titles as any)[x],
        //         description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. "
        //     } as ITag
        // });
    }
}