import { notification } from 'onsenui'
import { BaseError } from '../exceptions/BaseError';
export async function sleep(ms: number): Promise<number> {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export function toast_message(message: string, delay: number) {
    notification.toast(message, { timeout: delay, animation: 'fall' })
}

export function toast_error(error: BaseError) {
    toast_message(error.display_message || "خطا", 3000)
}