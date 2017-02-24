export interface AuthenticationService {
  authenticate(
    email: string,
    password: string,
    error: (error: any) => void,
    success: (result: any ) => void
  ): void;
}
