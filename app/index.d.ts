interface UserType {
  username: string;
  password: string;
  loggedIn: boolean;
}

interface IUserValidation {
  username: string;
  password: string;
}

interface IStates {
  showSidebar: boolean;
  showLogoutModal: boolean;
}
