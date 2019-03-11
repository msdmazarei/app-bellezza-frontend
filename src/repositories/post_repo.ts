import { base_repo } from './base_repo'
import { ITag } from '../models/tag';
import { Post } from '../models/Post';
import { user_repo } from './user_repo';
import { comment } from '../models/comment';
import { IUser } from '../models/user';
import axios, { AxiosError } from 'axios';
import { unauth_error, internal_server_error, general_error } from '../utils/make_exception';
import { is_ok_response } from '../utils/http_helper';

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
    // static async get_post__(forward:boolean, from_unixepoch: number, count:number, tag:ITag):Promise<Array<Post>> {
    //     let rtn : Array<Post> =[]     
    //     const inc = forward ? 1 : -1

    //     for (let i = 0; i < 10; i++) {
    //         rtn.push({
    //             id: `${i * inc +  from_unixepoch}`,
    //             title: `عنوان برای ${i*inc+ from_unixepoch}`,
    //             images: ["1", "2", "3", "4"].map(x => `images/posts/${x}.jpg`),
    //             create_unixepoch: i *inc + from_unixepoch,
    //             creator: user_repo.get_fake_user(`${i}`),
    //             description: "متن توضیحات نوشته یا نبشته برای نوشتن",
    //             comments: [1, 2, 3, 4, 5].map(x => {
    //                 return {
    //                     id: `com-${x}`,
    //                     text: `یک یادداشت برای یک متن نوشته شده${x}`,
    //                     creator: user_repo.get_fake_user(`com-${x}`)
    //                 } as comment
    //             })
    //         })
    //     }
    //     return rtn;

    // }
    static async get_post(forward: boolean, from_unixepoch: number, n: number, tag: ITag): Promise<Array<Post>> {
        try {
            const type = forward ? "up" : "down"
            let res = await axios.post("/api/posts/category", {
                category: [tag.title],
                count: 7, time: from_unixepoch,
                scroll: type
            })
            if (is_ok_response(res.status)) {
                return res.data.result.map((x: any) => this.server_post_to_client(x))
            } else {
                throw internal_server_error()
            }
        } catch (e) {
            const err: AxiosError = e
            if (err.response.status == 400) throw general_error(400, "bad_request", "داده ی ارسال شده به سرور صحیح نیست ")
            if (err.response.status == 401) throw unauth_error()
            if (err.response.status > 499) throw internal_server_error()
        }
    }
    static server_post_to_client(x: any): Post {
        return {
            id: x.id,
            create_unixepoch: x.creation_date,
            creator: x.creator,
            description: x.body,
            images: (x.pictures_id || []).map((y: string) => `/api/serve-files/${y}`),
            modifier: x.modifier,
            modify_unixepoch: x.modification_date,
            title: x.title,
            comments: [],
            likes: x.likes,
            is_liked_by_me: x.user_liked
        } as Post
    }

    // static async  get_n_posts_for_spec_tag(from_unixepoch: number, n: number, tag: ITag): Promise<Array<Post>> {
    //     let rtn: Array<Post> = [];

    //     try {
    //         let result = await axios.get(`/api/posts/category/${tag.title}`)
    //         if (is_ok_response(result.status)) {
    //             return result.data.result.map(
    //                 (x: any) => {
    //                     return this.server_post_to_client(x)
    //                 }
    //             )
    //         } else {
    //             throw general_error(600, "unknown_result_from_server", "پاسخ غیر منتظره از سرور")
    //         }
    //     } catch (e) {
    //         const err: AxiosError = e;
    //         if (err.response.status == 404) throw general_error(404, "not_found", "شاخه مورد نظر یافت نشد!!!")
    //         if (err.response.status == 400) throw general_error(400, "bad_request", "خطا در نحوه ی ارسال درخواست")
    //         throw internal_server_error()
    //     }

    //     // for (let i = 0; i < 10; i++) {
    //     //     rtn.push({
    //     //         id: `${i}`,
    //     //         title: `عنوان برای ${i}`,
    //     //         images: ["1", "2", "3", "4"].map(x => `images/posts/${x}.jpg`),
    //     //         create_unixepoch: i * 1000,
    //     //         creator: user_repo.get_fake_user(`${i}`),
    //     //         description: "متن توضیحات نوشته یا نبشته برای نوشتن",
    //     //         comments: [1, 2, 3, 4, 5].map(x => {
    //     //             return {
    //     //                 id: `com-${x}`,
    //     //                 text: `یک یادداشت برای یک متن نوشته شده${x}`,
    //     //                 creator: user_repo.get_fake_user(`com-${x}`)
    //     //             } as comment
    //     //         })
    //     //     })
    //     // }
    //     // return rtn;
    // }


    static async new_post(user: IUser,
        title: string,
        description: string,
        pictures: any,
        categories: Array<{ id: string, text: string }>): Promise<Post> {
        debugger;
        try {
            var formData = new FormData();
            formData.append("title", title)
            formData.append("body", description)
            formData.append("category", categories.map(x => x.text).join(","))
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
                images: res.data.pictures_id,
                likes: 0
            }
        } catch (e) {
            const err: AxiosError = e;
            if (err.response.status == 401) throw unauth_error();
            if (err.response.status > 499) throw internal_server_error();

        }
    }
    static general_http_exception(e: AxiosError) {
        if (e.response.status == 401) throw unauth_error()
        if (e.response.status == 400) throw general_error(400, "bad_request", "داده ارسالی به سرور صحیح نیست")
        if (e.response.status > 499) throw internal_server_error()
        if (e.response.status == 404) throw general_error(404, "NOTFOUND", "یافت نشد")
    }
    static auth_config(user: IUser) {
        return {
            auth: {
                username: user.username,
                password: user.password
            }
        }
    }
    static async like(user: IUser, post: Post): Promise<boolean> {
    
        try {
            let result = await axios.post("/api/likes", {
                "post_id": post.id
            }, post_repo.auth_config(user))
            if (is_ok_response(result.status)) {
                return true
            } else {
                throw internal_server_error()
            }
        } catch (e) {

            post_repo.general_http_exception(e as AxiosError)
        }
    }
    static async unlike(user: IUser, post: Post): Promise<boolean> {
        try {
            let result = await axios.delete(`/api/likes/${post.id}`, post_repo.auth_config(user))
            if (is_ok_response(result.status))
                return true
            else
                throw internal_server_error()
        } catch (e) {
            post_repo.general_http_exception(e as AxiosError)
        }
    }
}