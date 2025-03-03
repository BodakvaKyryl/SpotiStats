import { route, type RouteConfig } from "@react-router/dev/routes";

export default [
  // layout("./providers/providers.tsx", [route("home", "./pages/home.tsx"), route("login", "./pages/login.tsx")]),
  route("home", "./pages/home.tsx"),
  route("login", "./pages/login.tsx"),
  // index("./pages/root.tsx"),
] satisfies RouteConfig;
