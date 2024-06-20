

export interface User {
    id : string;
    name : String;
    surname : String;
    mail : String;

}

export type UserCreateInput = Omit<User, "id"> & {
    password: string;
  };