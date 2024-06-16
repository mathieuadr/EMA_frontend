

export interface User {
    id_user : string;
    name : String;
    surname : String;
    mail : String;

}

export type UserCreateInput = Omit<User, "id_user"> & {
    password: string;
  };