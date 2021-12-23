export enum UserRole {
  ADMINISTRATOR = 'ADMINISTRATOR',
  UNIVERSITY_ADMINISTRATOR = 'UNIVERSITY_ADMINISTRATOR',
  EMPLOYEE = 'EMPLOYEE',
  STUDENT = 'STUDENT'
}

export interface SignInResponse {
  token: string,
  universityId: number,
  userId: number
}

export interface AuthUserData extends SignInResponse {
  email: string,
  role: UserRole
}
