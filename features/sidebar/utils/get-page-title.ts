export function getPageTitle(pathname: string): string {
  switch (pathname) {
    case "/workflows":
      return "Workflows";
    case "/credentials":
      return "Credentials";
    case "/billing":
      return "Billing";

    default:
      return "";
  }
}
