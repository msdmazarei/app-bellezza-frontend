export interface BaseError extends Error {
    no: number
    code: string
    description?: string
    display_message?: string
}