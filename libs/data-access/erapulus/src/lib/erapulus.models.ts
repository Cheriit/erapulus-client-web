import {UserRole} from '@erapulus/utils/auth';

export interface ErapulusUser {
  id: string,
  type: UserRole,
  firstName: string,
  lastName: string,
  university?: string,
  email: string,
  phoneNumber?: string
}

export interface ErapulusUniversity {
  id: string,
  name: string,
  address: string,
  address2?: string,
  zipcode: string,
  city: string,
  country: string,
  description?: string,
  websiteUrl?: string,
  logoUrl?: string,
}
