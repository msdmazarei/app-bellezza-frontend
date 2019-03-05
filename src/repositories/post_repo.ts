import { base_repo } from './base_repo'
import { ITag } from '../models/tag';
import { Post } from '../models/Post';
import { user_repo } from './user_repo';
import { comment } from '../models/comment';
import { IUser } from '../models/user';
import axios, { AxiosError } from 'axios';
import { unauth_error, internal_server_error } from '../utils/make_exception';
export class post_repo extends base_repo {
    static fake_comments(from: number, n: number): Array<comment> {
        let rtn = []
        const sample_comment = [
            "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. ",
            "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. ",
            "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از."
        ]
        for (let i = 0; i < n; i++) {
            rtn.push({
                id: `${from}-${n}`,
                creator: user_repo.get_fake_user(`${i}`),
                create_unixepoch: from + i,
                text: sample_comment[i % sample_comment.length]
            })
        }
        return rtn
    }
    static async get_after_comments_for_post(from_unixepoch: number, n: number, post: Post): Promise<Array<comment>> {
        return this.fake_comments(from_unixepoch, n)
    }
    static async get_before_comments_for_post(from_unixepoch: number, n: number, post: Post): Promise<Array<comment>> {
        return this.fake_comments(from_unixepoch, n)

    }
    static async  get_n_posts_for_spec_tag(from_unixepoch: number, n: number, tag: ITag): Promise<Array<Post>> {
        let rtn: Array<Post> = [];
        for (let i = 0; i < 10; i++) {
            rtn.push({
                id: `${i}`,
                title: `عنوان برای ${i}`,
                images: ["1", "2", "3", "4"].map(x => `images/posts/${x}.jpg`),
                create_unixepoch: i * 1000,
                creator: user_repo.get_fake_user(`${i}`),
                description: "متن توضیحات نوشته یا نبشته برای نوشتن",
                comments: [1, 2, 3, 4, 5].map(x => {
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


    static async new_post(user: IUser, title: string, description: string, pictures: any): Promise<Post> {
        debugger;
        try {
            var formData = new FormData();
            formData.append("title", title)
            formData.append("description", description)
            for (let i = 0; i < pictures.length; i++)
                formData.append("upload", pictures[i])
            const res = await axios.post('/api/posts', formData,
                {
                    auth: {
                        username: user.username,
                        password: user.password
                    },
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
            return {
                id: res.data.id,
                title: res.data.title,
                description: res.data.description,
                images: res.data.pictures_id
            }
        } catch (e) {
            const err: AxiosError = e;
            if (err.response.status == 401) throw unauth_error();
            if (err.response.status > 499) throw internal_server_error();

        }
    }
}