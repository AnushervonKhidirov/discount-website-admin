/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
export enum Endpoint {
  Signin = 'http://localhost:4000/auth/sign-in',
  RefreshToken = 'http://localhost:4000/auth/refresh-token',
  GetUser = 'http://localhost:4000/users/:id',
  GetAllUsers = 'http://localhost:4000/users',
  GetBank = 'http://localhost:4000/banks/:id',
  GetAllBanks = 'http://localhost:4000/banks',
  CreateBank = 'http://localhost:4000/banks',
  UploadBankLogo = 'http://localhost:4000/banks/upload-logo/:id',
}
