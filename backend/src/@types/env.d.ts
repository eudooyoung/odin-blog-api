declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      SESSTION_SECRET: string;
      DATABASE_URL: string;
      APP_DEBUG: string;
    }
  }
}

export {};
