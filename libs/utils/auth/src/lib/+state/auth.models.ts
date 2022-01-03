export enum UserRole {
  ADMINISTRATOR = 'ADMINISTRATOR',
  UNIVERSITY_ADMINISTRATOR = 'UNIVERSITY_ADMINISTRATOR',
  EMPLOYEE = 'EMPLOYEE',
  STUDENT = 'STUDENT',
  UNAUTHORIZED = 'UNAUTHORIZED'
}

export interface SignInResponse {
  token: string,
  universityId: string,
  userId: string
}

export interface AuthUser extends SignInResponse {
  email: string,
  role: UserRole
}
