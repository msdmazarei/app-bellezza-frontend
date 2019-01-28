import {base_repo} from './base_repo'
import { ITag } from '../models/tag';
import { Post } from '../models/Post';
import { user_repo } from './user_repo';
import { comment } from '../models/comment';

export class post_repo extends base_repo{
    static async  get_n_posts_for_spec_tag(from_unixepoch: number,n: number, tag: ITag): Promise<Array<Post>>{
        let rtn: Array<Post>=[];
        for(let i=0;i<10;i++){
            rtn.push({
                id: `${i}`,
                title: `عنوان برای ${i}`,
                images:["1","2","3","4"].map(x=> `images/posts/${x}.jpg`),
                create_unixepoch: i * 1000,
                creator: user_repo.get_fake_user(`${i}`),
                description: "متن توضیحات نوشته یا نبشته برای نوشتن",
                comments: [1,2,3,4,5].map(x=>{
                    return {
                        id: `com-${x}`,
                        text: `یک یادداشت برای یک متن نوشته شده${x}`,
                        creator: user_repo.get_fake_user(`com-${x}`)
                    } as comment
                })
            })
        }
        return rtn;
    }
}