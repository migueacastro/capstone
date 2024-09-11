import "./client.js";
import { w as writable } from "./index.js";
const user = writable({ name: null, email: null, is_superuser: null, is_staff: null });
const authenticated = writable(false);
export {
  authenticated as a,
  user as u
};
