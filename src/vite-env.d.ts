/// <reference types="vite/client" />

interface ImportMetaEnv {
  MODE: string;
  VITE_SERVICE_NAME: string;

  VITE_API_BASE_URL: string;
  VITE_GOOGLE_CLIENT_ID: string;
  VITE_MAX_SELECTED_BOOKS: number;
}
