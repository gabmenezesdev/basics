export class Auth {
  id: number | null;
  phoneNumber: string | null;
  email: string | null;
  password: string;

  constructor(props: AuthInterface) {
    this.id = props.id || null;
    this.phoneNumber = props.phoneNumber || "";
    this.email = props.email || "";
    this.password = props.password;
  }
}

export interface AuthInterface {
  id?: number;
  phoneNumber?: string;
  email?: string;
  password: string;
}
