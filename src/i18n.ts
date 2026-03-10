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
      brandName: "Live Analytics",
      liveFeed: "Live feed",
      lastUpdate: "Last update",
      liveStatus: "Live",
      pausedStatus: "Paused",
      pauseUpdates: "Pause updates",
      resumeUpdates: "Resume updates",
      toggleTheme: "Toggle theme",
      selectDateRange: "Select date range",
      dateRangePlaceholder: "Pick a date range",
      selectLanguage: "Select language",
      languageEnglish: "English",
      languageSpanish: "Spanish",
      languageFrench: "French",
      activeVisitors: "Active visitors",
      liveUsers: "Live users on site",
      visitors: "Visitors",
      revenue: "Revenue (USD)",
      revenueLabel: "Revenue",
      grossRevenue: "Estimated gross revenue",
      orders: "Orders",
      completedConversions: "Completed conversions",
      conversionRate: "Conversion rate",
      visitsToOrders: "Visits → orders",
      projects: "Projects",
      estimates: "Estimates",
      reports: "Reports",
      settings: "Settings",
      trafficChartDescription: "Active audience trend sampled every 2 seconds.",
      chartNow: "Now",
      chartPeak: "Peak",
      revenueChartDescription: "Revenue movement across the current live session.",
      vsFirstSample: "vs first sample",
      recentActivity: "Recent activity",
      recentActivityDescription: "Latest transactions and conversions.",
      tableUser: "User",
      tableAction: "Action",
      tableDate: "Date",
      tableAmount: "Amount",
      tableShowingEntries: "Showing {{start}}-{{end}} of {{total}} entries",
      previous: "Previous",
      next: "Next",
      recentActivityPurchase: "Purchase",
      recentActivitySubscription: "Subscription",
      recentActivityRefund: "Refund",
      recentActivityUpgrade: "Upgrade",
      recentActivityTrial: "Trial",
      notifications: "Notifications",
      notificationsAllCaughtUp: "You're all caught up",
      notificationsUnreadUpdates_one: "{{count}} unread update",
      notificationsUnreadUpdates_other: "{{count}} unread updates",
      notificationsTotal: "{{count}} total",
      new: "New",
      justNow: "Just now",
      notificationNewOrderTitle: "New enterprise order",
      notificationNewOrderMessage:
        "A high-value checkout was completed from the pricing page.",
      notificationTrafficSpikeTitle: "Traffic spike detected",
      notificationTrafficSpikeMessage:
        "Active visitors jumped above the recent session baseline.",
      notificationTrialUpgradeTitle: "Trial converted to paid",
      notificationTrialUpgradeMessage:
        "A returning user upgraded after revisiting the product page.",
      language: "Language",
      admin: "Admin",
    },
  },
  es: {
    translation: {
      dashboard: "Tablero",
      brandName: "Analítica en vivo",
      liveFeed: "Transmisión en vivo",
      lastUpdate: "Última actualización",
      liveStatus: "En vivo",
      pausedStatus: "Pausado",
      pauseUpdates: "Pausar actualizaciones",
      resumeUpdates: "Reanudar actualizaciones",
      toggleTheme: "Cambiar tema",
      selectDateRange: "Seleccionar rango de fechas",
      dateRangePlaceholder: "Selecciona un rango de fechas",
      selectLanguage: "Seleccionar idioma",
      languageEnglish: "Inglés",
      languageSpanish: "Español",
      languageFrench: "Francés",
      activeVisitors: "Visitantes activos",
      liveUsers: "Usuarios en vivo",
      visitors: "Visitantes",
      revenue: "Ingresos (USD)",
      revenueLabel: "Ingresos",
      grossRevenue: "Ingresos estimados",
      orders: "Pedidos",
      completedConversions: "Conversiones completadas",
      conversionRate: "Tasa de conversión",
      visitsToOrders: "Visitas → pedidos",
      projects: "Proyectos",
      estimates: "Estimaciones",
      reports: "Informes",
      settings: "Configuración",
      trafficChartDescription:
        "Tendencia de audiencia activa muestreada cada 2 segundos.",
      chartNow: "Ahora",
      chartPeak: "Pico",
      revenueChartDescription:
        "Movimiento de ingresos durante la sesión en vivo actual.",
      vsFirstSample: "vs primera muestra",
      recentActivity: "Actividad reciente",
      recentActivityDescription: "Últimas transacciones y conversiones.",
      tableUser: "Usuario",
      tableAction: "Acción",
      tableDate: "Fecha",
      tableAmount: "Importe",
      tableShowingEntries: "Mostrando {{start}}-{{end}} de {{total}} registros",
      previous: "Anterior",
      next: "Siguiente",
      recentActivityPurchase: "Compra",
      recentActivitySubscription: "Suscripción",
      recentActivityRefund: "Reembolso",
      recentActivityUpgrade: "Mejora",
      recentActivityTrial: "Prueba",
      notifications: "Notificaciones",
      notificationsAllCaughtUp: "Todo está al día",
      notificationsUnreadUpdates_one: "{{count}} actualización sin leer",
      notificationsUnreadUpdates_other:
        "{{count}} actualizaciones sin leer",
      notificationsTotal: "{{count}} en total",
      new: "Nuevo",
      justNow: "Ahora mismo",
      notificationNewOrderTitle: "Nuevo pedido empresarial",
      notificationNewOrderMessage:
        "Se completó una compra de alto valor desde la página de precios.",
      notificationTrafficSpikeTitle: "Pico de tráfico detectado",
      notificationTrafficSpikeMessage:
        "Los visitantes activos superaron la línea base reciente de la sesión.",
      notificationTrialUpgradeTitle: "La prueba pasó a pago",
      notificationTrialUpgradeMessage:
        "Un usuario recurrente mejoró su plan tras volver a la página del producto.",
      language: "Idioma",
      admin: "Admin",
    },
  },
  fr: {
    translation: {
      dashboard: "Tableau de bord",
      brandName: "Analytique en direct",
      liveFeed: "Flux en direct",
      lastUpdate: "Dernière mise à jour",
      liveStatus: "En direct",
      pausedStatus: "En pause",
      pauseUpdates: "Pause des mises à jour",
      resumeUpdates: "Reprendre les mises à jour",
      toggleTheme: "Changer de thème",
      selectDateRange: "Sélectionner une plage de dates",
      dateRangePlaceholder: "Choisir une plage de dates",
      selectLanguage: "Sélectionner la langue",
      languageEnglish: "Anglais",
      languageSpanish: "Espagnol",
      languageFrench: "Français",
      activeVisitors: "Visiteurs actifs",
      liveUsers: "Utilisateurs en direct",
      visitors: "Visiteurs",
      revenue: "Revenu (USD)",
      revenueLabel: "Revenu",
      grossRevenue: "Revenu estimé",
      orders: "Commandes",
      completedConversions: "Conversions terminées",
      conversionRate: "Taux de conversion",
      visitsToOrders: "Visites → commandes",
      projects: "Projets",
      estimates: "Estimations",
      reports: "Rapports",
      settings: "Paramètres",
      trafficChartDescription:
        "Tendance de l'audience active échantillonnée toutes les 2 secondes.",
      chartNow: "Actuel",
      chartPeak: "Pic",
      revenueChartDescription:
        "Évolution des revenus pendant la session en direct en cours.",
      vsFirstSample: "vs premier échantillon",
      recentActivity: "Activité récente",
      recentActivityDescription: "Dernières transactions et conversions.",
      tableUser: "Utilisateur",
      tableAction: "Action",
      tableDate: "Date",
      tableAmount: "Montant",
      tableShowingEntries: "Affichage de {{start}} à {{end}} sur {{total}} entrées",
      previous: "Précédent",
      next: "Suivant",
      recentActivityPurchase: "Achat",
      recentActivitySubscription: "Abonnement",
      recentActivityRefund: "Remboursement",
      recentActivityUpgrade: "Mise à niveau",
      recentActivityTrial: "Essai",
      notifications: "Notifications",
      notificationsAllCaughtUp: "Vous êtes à jour",
      notificationsUnreadUpdates_one: "{{count}} mise à jour non lue",
      notificationsUnreadUpdates_other:
        "{{count}} mises à jour non lues",
      notificationsTotal: "{{count}} au total",
      new: "Nouveau",
      justNow: "À l'instant",
      notificationNewOrderTitle: "Nouvelle commande entreprise",
      notificationNewOrderMessage:
        "Un paiement de forte valeur a été effectué depuis la page tarifaire.",
      notificationTrafficSpikeTitle: "Pic de trafic détecté",
      notificationTrafficSpikeMessage:
        "Les visiteurs actifs ont dépassé la référence récente de la session.",
      notificationTrialUpgradeTitle: "Essai converti en offre payante",
      notificationTrialUpgradeMessage:
        "Un utilisateur récurrent a changé d'offre après être revenu sur la page produit.",
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
