import * as R from "react/jsx-runtime";
import { prepare } from "./core";
export const Fragment = R.Fragment;
export const jsx = (t: any, p: any, k?: any) => prepare(t, p, k, R.jsx);
export const jsxs = (t: any, p: any, k?: any) => prepare(t, p, k, R.jsxs);
export type { JSX } from "react/jsx-runtime";
