import { type User } from "@clerk/nextjs/api"

export const adminContextCaller: User = {
  id: '',
  passwordEnabled: true,
  totpEnabled: false,
  backupCodeEnabled: false,
  twoFactorEnabled: false,
  banned: false,
  createdAt: 1,
  updatedAt: 1,
  profileImageUrl: '',
  gender: '',
  birthday: '',
  primaryEmailAddressId: '',
  primaryPhoneNumberId: null,
  primaryWeb3WalletId: null,
  lastSignInAt: 1,
  externalId: null,
  username: null,
  firstName: null,
  lastName: null,
  publicMetadata: {},
  privateMetadata: {},
  unsafeMetadata: {},
  emailAddresses: [{
    id: '',
    emailAddress: 'admin@test.com.br',
    verification: {
      status: 'verified',
      strategy: 'email_code',
      externalVerificationRedirectURL: null,
      attempts: 1,
      expireAt: 1,
      nonce: null
    },
    linkedTo: []
  }],
  phoneNumbers: [],
  web3Wallets: [],
  externalAccounts: []
}

export const ispContextCaller: User = {
  id: '',
  passwordEnabled: true,
  totpEnabled: false,
  backupCodeEnabled: false,
  twoFactorEnabled: false,
  banned: false,
  createdAt: 1,
  updatedAt: 1,
  profileImageUrl: '',
  gender: '',
  birthday: '',
  primaryEmailAddressId: '',
  primaryPhoneNumberId: null,
  primaryWeb3WalletId: null,
  lastSignInAt: 1,
  externalId: null,
  username: null,
  firstName: null,
  lastName: null,
  publicMetadata: {},
  privateMetadata: {},
  unsafeMetadata: {},
  emailAddresses: [{
    id: '',
    emailAddress: 'isp@test.com.br',
    verification: {
      status: 'verified',
      strategy: 'email_code',
      externalVerificationRedirectURL: null,
      attempts: 1,
      expireAt: 1,
      nonce: null
    },
    linkedTo: []
  }],
  phoneNumbers: [],
  web3Wallets: [],
  externalAccounts: []
}

export const schoolTest = {
  name: "Escola Teste",
  state: "sp",
  city: "sp",
  zipCode: "00000-000",
  address: "sp",
  cnpj: "cnpjTest",
  inepCode: "12344321",
  email: "escola@test.com",
  administrator: "state"
}