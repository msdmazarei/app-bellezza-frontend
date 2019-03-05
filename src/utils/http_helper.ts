import {AxiosResponse} from 'axios'
import * as make_exception from './make_exception'

export function is_ok_response(status: number) : boolean {
    return status > 199 && status < 300
}

export function raise_proper_exception(resp: AxiosResponse) {
    if (resp.status==401) 
       throw make_exception.unauth_error()
    if(resp.status>499 && resp.status<600)
        throw make_exception.internal_server_error()

}