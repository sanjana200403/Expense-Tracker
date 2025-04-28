export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
    GET_USER_INFO: "/api/v1/auth/getUser",
  },
  DASHBOARD: {
    GET_DATA: "/api/v1/dashboard",
  },
  INCOME: {
    ADD: "/api/v1/income/add",
    GET_ALL: "/api/v1/income/get",
    DOWNLOAD_EXCEL: "/api/v1/income/downloadExcel",
    DELETE: (incomeId) => `/api/v1/income/${incomeId}`, // Dynamically pass incomeId here
  },
  EXPENSE: {
    ADD: "/api/v1/expense/add",
    GET_ALL: "/api/v1/expense/get",
    DOWNLOAD_EXCEL: "/api/v1/expense/downloadExcel",
    DELETE: (expenseId) => `/api/v1/expense/${expenseId}`, // Dynamically pass expenseId here
  },
  IMAGE: {
    UPLOAD_IMAGE: "/api/v1/auth/upload-image",
  }
};
