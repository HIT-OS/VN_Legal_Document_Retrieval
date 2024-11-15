enum TokenType {
  ACCESS = 'ACCESS_TOKEN',
  REFRESH = 'REFRESH_TOKEN',
}

export class AuthConstants {
  static readonly BCRYPT_SALT: number = 10;
  static readonly TokenType = TokenType;
}
