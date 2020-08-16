import { AuthUser } from './auth-user.model';

export interface AuthStorage {
    user: AuthUser;
    token: string;
    tokenExpireDate: number;
    remembered: boolean;
}
