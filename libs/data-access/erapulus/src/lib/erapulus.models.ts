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

export interface ErapulusFaculty {
  id: string,
  name: string,
  address: string,
  email: string,
  universityId: string
}

export interface ErapulusBuilding {
  id: string,
  name: string,
  abbrev: string,
  latitude: number,
  longitude: number,
  universityId: string
}

export interface ErapulusPost {
  id: string,
  title: string,
  date: string,
  content: string,
  universityId: string
}

export interface ErapulusUniversityDocument extends File {
  id: string,
  university: string
  name: string,
  description: string
}

export interface ErapulusProgramFile extends ErapulusUniversityDocument {
  program: string
}

export interface ErapulusModuleFile extends ErapulusProgramFile {
  module: string
}

export interface ErapulusResponse<T> {
  status: number,
  payload: T,
  message: string
}
