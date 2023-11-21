
export const adminContextCaller = {
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
  externalAccounts: [],
  imageUrl: ""
}

export const ispContextCaller = {
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
  externalAccounts: [],
  imageUrl: ""
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
  administrator: "state",
  lon: "-46.633308",
  lat: "-23.550520" 
}


export const adminContextSession = {
  user: {
    id: 'adminUuid',
    name: '',
    email: adminContextCaller.emailAddresses[0]?.emailAddress,
    image: adminContextCaller.profileImageUrl
  },
  expires: new Date(Date.now() + 3600000).toISOString()
}

export const ispContextSession = {
  user: {
    id: 'ispUuid',
    name: '',
    email: ispContextCaller.emailAddresses[0]?.emailAddress,
    image: ispContextCaller.profileImageUrl
  },
  expires: new Date(Date.now() + 3600000).toISOString()
}
