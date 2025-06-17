import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type Language = "en" | "hi" | "te";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// Translation object
const translations = {
  // Navigation
  home: {
    en: "Home",
    hi: "होम",
    te: "హోమ్",
  },
  register_complaint: {
    en: "Register Complaint",
    hi: "शिकायत दर्ज करें",
    te: "ఫిర్యాదు నమోదు",
  },
  track_complaint: {
    en: "Track Complaint",
    hi: "शिकायत ट्रैक करें",
    te: "ఫిర్యాదు ట్రాక్ చేయండి",
  },
  dashboard: {
    en: "Dashboard",
    hi: "डैशबोर्ड",
    te: "డాష్‌బోర్డ్",
  },
  citizen_services: {
    en: "Citizen Services",
    hi: "नागरिक सेवाएं",
    te: "పౌర సేవలు",
  },
  contact: {
    en: "Contact",
    hi: "संपर्क",
    te: "సంప్రదించండి",
  },
  help: {
    en: "Help",
    hi: "मदद",
    te: "సహాయం",
  },
  sign_in: {
    en: "Sign In",
    hi: "साइन इन",
    te: "సైన్ ఇన్",
  },
  register: {
    en: "Register",
    hi: "रजिस्टर",
    te: "రిజిస్టర్",
  },
  logout: {
    en: "Logout",
    hi: "लॉगआउट",
    te: "లాగ్ అవుట్",
  },
  notifications: {
    en: "Notifications",
    hi: "सूचनाएं",
    te: "నోటిఫికేషన్లు",
  },
  profile: {
    en: "Profile",
    hi: "प्रोफाइल",
    te: "ప్రొఫైల్",
  },
  settings: {
    en: "Settings",
    hi: "सेटिंग्स",
    te: "సెట్టింగ్‌లు",
  },

  // Homepage
  transform_your_city: {
    en: "Transform Your City",
    hi: "अपने शहर को बदलें",
    te: "మీ నగరాన్ని మార్చండి",
  },
  one_report_at_time: {
    en: "One Report at a Time",
    hi: "एक समय में एक रिपोर्ट",
    te: "ఒక సమయంలో ఒక రిపోర్ట్",
  },
  join_digital_revolution: {
    en: "Join the digital revolution in civic engagement. Report issues, track progress, and see real change happen in your community with TS Civic.",
    hi: "नागरिक भागीदारी में डिजिटल क्रांति में शामिल हों। समस्याओं की रिपोर्ट करें, प्रगति को ट्रैक करें, और TS Civic के साथ अपने समुदाय में वास्तविक बदलाव देखें।",
    te: "పౌర భాగస్వామ్యంలో డిజిటల్ విప్లవంలో చేరండి. సమస్యలను నివేదించండి, పురోగతిని ట్రాక్ చేయండి మరియు TS Civic తో మీ కమ్యూనిటీలో నిజమైన మార్పును చూడండి.",
  },
  report_an_issue: {
    en: "Report an Issue",
    hi: "समस्या रिपोर्ट करें",
    te: "సమస్యను నివేదించండి",
  },
  track_progress: {
    en: "Track Progress",
    hi: "प्रगति ट्रैक करें",
    te: "పురోగతిని ట్రాక్ చేయండి",
  },

  // Categories
  roads: {
    en: "Roads & Transport",
    hi: "सड़कें और परिवहन",
    te: "రోడ్లు మరియు రవాణా",
  },
  water: {
    en: "Water Supply",
    hi: "पानी की आपूर्ति",
    te: "నీటి సరఫరా",
  },
  sanitation: {
    en: "Sanitation",
    hi: "स्वच्छता",
    te: "పరిశుభ్రత",
  },
  electricity: {
    en: "Electricity",
    hi: "बिजली",
    te: "విద్యుత్",
  },
  street_lights: {
    en: "Street Lights",
    hi: "स्ट्रीट लाइट्स",
    te: "వీధి దీపాలు",
  },
  safety: {
    en: "Public Safety",
    hi: "सार्वजनिक सुरक्षा",
    te: "ప్రజా భద్రత",
  },

  // Stats
  complaints_registered: {
    en: "Complaints Registered",
    hi: "शिकायतें दर्ज",
    te: "ఫిర్యాదులు నమోదు",
  },
  issues_resolved: {
    en: "Issues Resolved",
    hi: "समस्याएं हल",
    te: "సమస్యలు పరిష్కరించబడ్డాయి",
  },
  days_average: {
    en: "Days Average",
    hi: "औसत दिन",
    te: "రోజుల సగటు",
  },
  active_citizens: {
    en: "Active Citizens",
    hi: "सक्रिय नागरिक",
    te: "చురుకైన పౌరులు",
  },
  this_month: {
    en: "This Month",
    hi: "इस महीने",
    te: "ఈ నెల",
  },
  success_rate: {
    en: "Success Rate: 94%",
    hi: "सफलता दर: 94%",
    te: "విజయ రేటు: 94%",
  },
  resolution_time: {
    en: "Resolution Time",
    hi: "समाधान समय",
    te: "రిజల్యూషన్ సమయం",
  },
  registered_users: {
    en: "Registered Users",
    hi: "पंजीकृत उपयोगकर्ता",
    te: "నమోదిత వినియోగదారులు",
  },

  // Features
  smart_registration: {
    en: "Smart Registration",
    hi: "स्मार्ट पंजीकरण",
    te: "స్మార్ట్ రిజిస్ట్రేషన్",
  },
  smart_registration_desc: {
    en: "AI-powered complaint categorization with photo upload and GPS location",
    hi: "फोटो अपलोड और GPS स्थान के साथ AI-संचालित शिकायत वर्गीकरण",
    te: "ఫోటో అప్‌లోడ్ మరియు GPS లొకేషన్‌తో AI-శక్తితో కూడిన ఫిర్యాదు వర్గీకరణ",
  },
  real_time_tracking: {
    en: "Real-time Tracking",
    hi: "रियल-टाइम ट्रैकिंग",
    te: "రియల్-టైమ్ ట్రాకింగ్",
  },
  real_time_tracking_desc: {
    en: "Live status updates with SMS notifications and estimated completion",
    hi: "SMS सूचनाओं और अनुमानित पूर्णता के साथ लाइव स्थिति अपडेट",
    te: "SMS నోటిఫికేషన్‌లు మరియు అంచనా పూర్తితో లైవ్ స్టేటస్ అప్‌డేట్‌లు",
  },
  multilingual_support: {
    en: "Multilingual Support",
    hi: "बहुभाषी समर्थन",
    te: "బహుభాషా మద్దతు",
  },
  multilingual_support_desc: {
    en: "Available in Telugu, Hindi & English with voice-to-text support",
    hi: "वॉयस-टू-टेक्स्ट समर्थन के साथ तेलुगु, हिंदी और अंग्रेजी में उपलब्ध",
    te: "వాయిస్-టు-టెక్స్ట్ మద్దతుతో తెలుగు, హిందీ మరియు ఇంగ్లీష్‌లో అందుబాటులో ఉంది",
  },
  ai_assistant: {
    en: "AI Assistant",
    hi: "AI सहायक",
    te: "AI అసిస్టెంట్",
  },
  ai_assistant_desc: {
    en: "24/7 intelligent chatbot for instant help and guidance",
    hi: "तत्काल सहायता और मार्गदर्शन के लिए 24/7 बुद्धिमान चैटबॉट",
    te: "తక్షణ సహాయం మరియు మార్గదర్శకత్వం కోసం 24/7 తెలివైన చాట్‌బాట్",
  },

  // Notifications
  stay_updated: {
    en: "Stay updated with your civic activities and system alerts",
    hi: "अपनी नागरिक गतिविधियों और सिस्टम अलर्ट के साथ अपडेट रहें",
    te: "మీ పౌర కార్యకలాపాలు మరియు సిస్టమ్ అలర్ట్‌లతో అప్‌డేట్‌గా ఉండండి",
  },
  total: {
    en: "Total",
    hi: "कुल",
    te: "మొత్తం",
  },
  unread: {
    en: "Unread",
    hi: "अपठित",
    te: "చదవని",
  },
  today: {
    en: "Today",
    hi: "आज",
    te: "నేడు",
  },
  all: {
    en: "All",
    hi: "सभी",
    te: "అన్ని",
  },
  read: {
    en: "Read",
    hi: "पढ़ा गया",
    te: "చదివింది",
  },
  no_notifications_found: {
    en: "No notifications found",
    hi: "कोई सूचना नहीं मिली",
    te: "నోటిఫికేషన్‌లు కనుగొనబడలేదు",
  },
  all_caught_up: {
    en: "You're all caught up! No unread notifications.",
    hi: "आप सभी अप-टू-डेट हैं! कोई अपठित सूचना नहीं।",
    te: "మీరు అన్నింటినీ చూశారు! చదవని నోటిఫికేషన్‌లు లేవు.",
  },
  mark_all_read: {
    en: "Mark All as Read",
    hi: "सभी को पढ़ा गया चिह्नित करे���",
    te: "అన్నింటినీ చదివినట్లు గుర్తు పెట్టండి",
  },
  clear_all: {
    en: "Clear All",
    hi: "सभी साफ़ करें",
    te: "అన్నింటినీ క్లియర్ చేయండి",
  },

  // Common
  loading: {
    en: "Loading...",
    hi: "लोड हो रहा है...",
    te: "లోడ్ అవుతోంది...",
  },
  error: {
    en: "Error",
    hi: "त्रुटि",
    te: "లోపం",
  },
  success: {
    en: "Success",
    hi: "सफलता",
    te: "విజయం",
  },
  cancel: {
    en: "Cancel",
    hi: "रद्द करें",
    te: "రద్దు చేయండి",
  },
  confirm: {
    en: "Confirm",
    hi: "पुष्टि करें",
    te: "నిర్ధారించండి",
  },
  save: {
    en: "Save",
    hi: "सेव करें",
    te: "సేవ్ చేయండి",
  },
  delete: {
    en: "Delete",
    hi: "हटाएं",
    te: "తొలగించండి",
  },
  edit: {
    en: "Edit",
    hi: "संपादित करें",
    te: "సవరించండి",
  },
  view: {
    en: "View",
    hi: "देखें",
    te: "చూడండి",
  },
  back: {
    en: "Back",
    hi: "वापस",
    te: "వెనుకకు",
  },
  next: {
    en: "Next",
    hi: "अगला",
    te: "తదుపరి",
  },
  submit: {
    en: "Submit",
    hi: "जमा करें",
    te: "సమర్పించండి",
  },
  close: {
    en: "Close",
    hi: "बंद करें",
    te: "మూసివేయండి",
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("ts-civic-language") as Language;
    if (savedLanguage && ["en", "hi", "te"].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Save language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("ts-civic-language", language);
  }, [language]);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

  const t = (key: string, fallback?: string): string => {
    const keys = key.split(".");
    let current: any = translations;

    for (const k of keys) {
      if (current && typeof current === "object" && k in current) {
        current = current[k];
      } else {
        return fallback || key;
      }
    }

    if (current && typeof current === "object" && language in current) {
      return current[language];
    }

    return fallback || key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
