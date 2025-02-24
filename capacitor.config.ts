import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'agendaJa',
  webDir: 'www',
  plugins: {
    StatusBar: {
      overlaysWebView: true,
      style: "DARK",
      backgroundColor: "#00000000", // Transparente
    },
  },
};

export default config;
