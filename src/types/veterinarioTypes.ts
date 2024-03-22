export type AuthUser  ={
  email: string;
  nombre: string;
  JwtToken: JwtToken;
}

type JwtToken = {
  token: string;
}