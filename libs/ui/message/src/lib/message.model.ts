export enum MessageType {
  NONE,
  SUCCESS,
  ERROR,
  WARNING
}

export interface Message {
  type?: MessageType,
  title: string,
  content?: string | string[],
  hasClose?: boolean,
  hasButtons?: boolean
}

export enum MessageAction {
  ACCEPT,
  CANCEL,
  CLOSE
}
