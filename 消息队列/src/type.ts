import { type } from "os"

export interface IQueue {
    defer: Function
    params?: any[]
}
export interface IQueues {
    children: Array<IQueue>
    name: string
    result?: any[]
}
export type IQueueTemp = {
    [key: string]: IQueues
}
export type IQueueList = Array<IQueue>
export type IState = "idle" | "pending" | "fulfilled" | "rejected"
export type ITaskQueue = {
    readonly maxLen: number
    queues: IQueueList
    state: IState
    push: (queue: IQueues) => Promise<void>
    unshift: (length: number) => IQueueList
    run: (reject: any) => unknown
    clear: () => void
}
