import { notification } from 'onsenui'
import { BaseError } from '../exceptions/BaseError';
import './utils.scss'
export async function sleep(ms: number): Promise<number> {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export function toast_message(message: string, delay: number, className: string = null) {
    notification.toast(message, { timeout: delay, animation: 'fall' , class: className || "green"})
}

export function toast_error(error: BaseError) {
    console.log("error:",error)
    toast_message(error.display_message || "خطا", 3000, "red")
}