import {user_base_model as base_model} from './user_base_model'
import {comment} from "./comment"

export interface Post extends base_model {
    title?: string
    description?: string
    images: Array<string>
    comments?: Array<comment>
}