import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("dataset", "routes/dataset.tsx"),
] satisfies RouteConfig;
