import { User } from '../models/user.model';

export interface updateUser {
    total: number;
    users: User[];
}