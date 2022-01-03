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
  universityId: string
  name: string,
  description: string
}

export interface ErapulusProgramDocument extends ErapulusUniversityDocument {
  programId: string
  facultyId: string
}

export interface ErapulusModuleDocument extends ErapulusProgramDocument {
  moduleId: string
}

export interface ErapulusProgram {
  id: string,
  name: string,
  abbrev: string,
  description?: string,
  facultyId: string
}

export interface ErapulusModule {
  id: string,
  name: string,
  abbrev: string,
  description?: string,
  facultyId: string,
  programId: string
}

export interface ErapulusResponse<T> {
  status: number,
  payload: T,
  message: string
}
