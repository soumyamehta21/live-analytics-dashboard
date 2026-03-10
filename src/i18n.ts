import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const LANGUAGE_STORAGE_KEY = "live-dashboard-language";
const SUPPORTED_LANGUAGES = ["en", "es", "fr"] as const;

function getInitialLanguage() {
  if (typeof window === "undefined") return "en";

  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored && SUPPORTED_LANGUAGES.includes(stored as (typeof SUPPORTED_LANGUAGES)[number])) {
    return stored;
  }

  const browserLanguage = window.navigator.language.split("-")[0];
  return SUPPORTED_LANGUAGES.includes(browserLanguage as (typeof SUPPORTED_LANGUAGES)[number])
    ? browserLanguage
    : "en";
}

const resources = {
  en: {
    translation: {
      dashboard: "Dashboard",
      liveFeed: "Live feed",
      lastUpdate: "Last update",
      pauseUpdates: "Pause updates",
      resumeUpdates: "Resume updates",
      activeVisitors: "Active visitors",
      liveUsers: "Live users on site",
      revenue: "Revenue (USD)",
      grossRevenue: "Estimated gross revenue",
      orders: "Orders",
      completedConversions: "Completed conversions",
      conversionRate: "Conversion rate",
      visitsToOrders: "Visits → orders",
      recentActivity: "Recent activity",
      notifications: "Notifications",
      language: "Language",
      admin: "Admin",
    },
  },
  es: {
    translation: {
      dashboard: "Tablero",
      liveFeed: "Transmisión en vivo",
      lastUpdate: "Última actualización",
      pauseUpdates: "Pausar actualizaciones",
      resumeUpdates: "Reanudar actualizaciones",
      activeVisitors: "Visitantes activos",
      liveUsers: "Usuarios en vivo",
      revenue: "Ingresos (USD)",
      grossRevenue: "Ingresos estimados",
      orders: "Pedidos",
      completedConversions: "Conversiones completadas",
      conversionRate: "Tasa de conversión",
      visitsToOrders: "Visitas → pedidos",
      recentActivity: "Actividad reciente",
      notifications: "Notificaciones",
      language: "Idioma",
      admin: "Admin",
    },
  },
  fr: {
    translation: {
      dashboard: "Tableau de bord",
      liveFeed: "Flux en direct",
      lastUpdate: "Dernière mise à jour",
      pauseUpdates: "Pause des mises à jour",
      resumeUpdates: "Reprendre les mises à jour",
      activeVisitors: "Visiteurs actifs",
      liveUsers: "Utilisateurs en direct",
      revenue: "Revenu (USD)",
      grossRevenue: "Revenu estimé",
      orders: "Commandes",
      completedConversions: "Conversions terminées",
      conversionRate: "Taux de conversion",
      visitsToOrders: "Visites → commandes",
      recentActivity: "Activité récente",
      notifications: "Notifications",
      language: "Langue",
      admin: "Admin",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: "en",
  supportedLngs: [...SUPPORTED_LANGUAGES],
  interpolation: {
    escapeValue: false,
  },
});

if (typeof window !== "undefined") {
  i18n.on("languageChanged", (language) => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  });
}

export default i18n;
