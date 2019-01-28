import {base_repo} from './base_repo';
import {ITag} from '../models/tag';

export class tag_repo extends base_repo {
    static async get_primary_tags(): Promise<Array<ITag>> {
        let rtn: Array<ITag>=[];
        let titles={
            "clothes" : "لباس",
            "shoes": "کفش",
            "bags":"کیف",
            "hairs":"طرح مو",
            "design":"طراحی ها"
        };
        return Object.keys(titles).map(x=>{
            return {
                id: x,
                icon: `images/tags/${x}.png`,
                title: (titles as any)[x],
                description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. "
            } as ITag
        });
    }
}