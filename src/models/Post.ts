import {user_base_model as base_model} from './user_base_model'
import {comment} from "./comment"

export interface Post extends base_model {
    title?: string
    description?: string
    images: Array<string>
    likes: number,
    is_liked_by_me?: boolean,
    comments?: Array<comment>
}