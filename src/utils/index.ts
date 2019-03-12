import { notification } from 'onsenui'
import { BaseError } from '../exceptions/BaseError';
import './utils.scss'
export async function sleep(ms: number): Promise<number> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function toPersianDigits(str: string){
    var id= ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
    return str.replace(/[0-9]/g, function(w){
        return id[+w]
    });
}

export function toast_message(message: string, delay: number, className: string = null) {
    notification.toast(message, { timeout: delay, animation: 'fall' , class: className || "green"})
}

export function toast_error(error: BaseError) {
    console.log("error:",error)
    toast_message(error.display_message || "خطا", 3000, "red")
}

export function timeDifference(current: number, previous:number) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {

         return toPersianDigits( Math.round(elapsed/1000) + 'ثانیه پیش');   
    }

    else if (elapsed < msPerHour) {
         return toPersianDigits( Math.round(elapsed/msPerMinute) + ' دقیقه پیش');   
    }

    else if (elapsed < msPerDay ) {
         return  toPersianDigits( Math.round(elapsed/msPerHour ) + ' ساعت پیش');   
    }

    else if (elapsed < msPerMonth) {
        return toPersianDigits('تقریبا ' + Math.round(elapsed/msPerDay) + ' روز پیش');   
    }

    else if (elapsed < msPerYear) {
        return toPersianDigits('تقریبا ' + Math.round(elapsed/msPerMonth) + ' ماه پیش');   
    }

    else {
        return toPersianDigits('تقریبا ' + Math.round(elapsed/msPerYear ) + ' سال پیش');   
    }
}