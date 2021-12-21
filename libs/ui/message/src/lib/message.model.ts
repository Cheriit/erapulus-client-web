import {Type} from '@angular/core';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MessageContentComponent {

}

export enum MessageType {
  NONE,
  SUCCESS,
  ERROR
}

export interface Message<T> {
  type?: MessageType,
  title: string,
  content?: string | string[],
  component?: Type<T>,
  hasClose?: boolean
}
