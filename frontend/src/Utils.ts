export class Constants {
  static URL_API = "http://localhost:8080";

  static ROLE = {
    ADMINISTRADOR: 1,
    TRIADOR: 2,
    FINALIZADOR: 3,
  };

  static getRoleDescription = (role: number) => {
    switch (role) {
      case Constants.ROLE.ADMINISTRADOR:
        return "Administrador";
      case Constants.ROLE.TRIADOR:
        return "Triador";
      case Constants.ROLE.FINALIZADOR:
        return "Finalizador";
      default:
        return "";
    }
  };
}
