import { User } from './user';

export interface Group {
    id: number;
    subtitle: string;
    name: string;
    ownerId: number;
    desc: string;
    users: User[];
}
