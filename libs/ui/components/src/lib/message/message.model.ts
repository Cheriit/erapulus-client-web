export enum MessageType {
  SUCCESS,
  ERROR
}

export interface Message {
  type?: MessageType,
  title: string,
  content: string | string[]
}
