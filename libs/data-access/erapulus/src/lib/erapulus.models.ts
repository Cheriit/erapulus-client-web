import {UserRole} from '@erapulus/utils/auth';

export interface ErapulusUser {
  id: string,
  type: UserRole,
  firstName: string,
  lastName: string,
  university?: number,
  email: string,
  phoneNumber?: string
}
