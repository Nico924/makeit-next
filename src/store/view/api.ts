import { call, crud } from "store/utils/api";
import { config } from "config/general";

const api = {
  message: (options: Record<string, any>): void =>
    call("crm/leaveMessageOnly", "POST", options)
};

export default api;
