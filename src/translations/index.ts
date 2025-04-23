type TranslationKey = 
  | 'title'
  | 'moduleAccess'
  | 'footerRights'
  | 'moduleTitles'
  | 'moduleDescriptions'
  | 'needArticles'
  | 'weHaveIt';

type Translations = {
  [key in TranslationKey]: {
    fr: string;
    mg: string;
  }
};

export const translations: Translations = {
  title: {
    fr: 'MagasyManager (Toky & Marine)',
    mg: 'MagasyManager (Toky & Marine)',
  },
  moduleAccess: {
    fr: 'Accéder',
    mg: 'Hiditra',
  },
  footerRights: {
    fr: 'Tous droits réservés.',
    mg: 'Zo rehetra voatokana.',
  },
  moduleTitles: {
    fr: 'moduleTitles_fr', // Placeholder, to be expanded
    mg: 'moduleTitles_mg', // Placeholder, to be expanded
  },
  moduleDescriptions: {
    fr: 'moduleDescriptions_fr', // Placeholder, to be expanded
    mg: 'moduleDescriptions_mg', // Placeholder, to be expanded
  },
  needArticles: {
    fr: 'Le magasin 1 a besoin des articles suivant si vous en avez:',
    mg: 'Mila ireto entana manaraka ireto ny magazay 1 raha manana ianao:',
  },
  weHaveIt: {
    fr: 'Nous en avons',
    mg: 'Manana izahay',
  },
};

export const moduleData = {
  fr: [
    {
      title: "Enregistrement 📝",
      description: "✨ Gérez votre inventaire avec précision | 📦 Ajoutez de nouveaux articles | 🏷️ Étiquetage facile | 📊 Suivi des stocks en temps réel",
      icon: "📝",
      path: "/enregistrement",
      image: "/images/modules/inventory.png"
    },
    {
      title: "Inventaire 📋",
      description: "🔍 Contrôle précis des stocks | 📊 Suivi des quantités | 🚨 Alertes de seuil minimal | ⚡ Mise à jour en temps réel",
      icon: "📋",
      path: "/inventaire",
      image: "/images/modules/inventory-check.png"
    },
    {
      title: "Commande 🛍️",
      description: "📦 Commandes fournisseurs | 🤝 Gestion des relations | 📅 Planification des livraisons | 💫 Suivi des commandes",
      icon: "📦",
      path: "/commande",
      image: "/images/modules/commande.png"
    },
    {
      title: "Image 🖼️",
      description: "📸 Galerie produits | 🎨 Organisation visuelle | 🔍 Zoom détaillé | 🏷️ Étiquetage intelligent",
      icon: "🖼️",
      path: "/image",
      image: "/images/modules/gallery.png"
    },
    {
      title: "Statistique 📊",
      description: "📈 Analyse des ventes | 💰 Suivi des bénéfices | 📉 Tendances du marché | 🎯 Objectifs commerciaux",
      icon: "📊",
      path: "/statistique",
      image: "/images/modules/statistics.png"
    },
    {
      title: "Mouvement 🔄",
      description: "🚚 Transferts inter-magasins | 📦 Gestion des stocks | 🏪 Suivi dépôt-magasin | ⚡ Mise à jour en temps réel",
      icon: "🔄",
      path: "/mouvement",
      image: "/images/modules/transfer.png"
    },
    {
      title: "Vente 💰",
      description: "🛍️ Transactions | 🧾 Factures automatiques | 💳 Paiements multiples | 🎁 Fidélisation clients",
      icon: "💰",
      path: "/vente",
      image: "/images/modules/sales.png"
    }
  ],
  mg: [
    {
      title: "Fisoratana 📝",
      description: "✨ Tantano ny entana misy | 📦 Ampidiro ny entana vaovao | 🏷️ Fanomezana anarana mora | 📊 Fanaraha-maso ny tahiry",
      icon: "📝",
      path: "/enregistrement",
      image: "/images/modules/inventory.png"
    },
    {
      title: "Tahiry 📋",
      description: "🔍 Fanaraha-maso mazava ny tahiry | 📊 Fanaraha-maso ny isa | 🚨 Fampilazana ambany fetra | ⚡ Fanavaozana ara-potoana",
      icon: "📋",
      path: "/inventaire",
      image: "/images/modules/inventory-check.png"
    },
    {
      title: "Kaomandy 🛍️",
      description: "📦 Kaomandy mpivarotra | 🤝 Fitantanana ny fifandraisana | 📅 Fanatanterahana ireo fandefasana | 💫 Fanaraha-maso ny kaomandy",
      icon: "📦",
      path: "/commande",
      image: "/images/modules/commande.png"
    },
    {
      title: "Sary 🖼️",
      description: "📸 Galeria ny vokatra | 🎨 Fandaminana sary | 🔍 Zoom tsara | 🏷️ Famantarana malina",
      icon: "🖼️",
      path: "/image",
      image: "/images/modules/gallery.png"
    },
    {
      title: "Antontan'isa 📊",
      description: "📈 Famakafakana ny varotra | 💰 Fanaraha-maso ny tombony | 📉 Fivoaran'ny tsena | 🎯 Tanjona ara-barotra",
      icon: "📊",
      path: "/statistique",
      image: "/images/modules/statistics.png"
    },
    {
      title: "Fihetsehana 🔄",
      description: "🚚 Famindrana amin'ny fivarotana | 📦 Fitantanana ny tahiry | 🏪 Fanaraha-maso avy amin'ny trano | ⚡ Fanavaozana ara-potoana",
      icon: "🔄",
      path: "/mouvement",
      image: "/images/modules/transfer.png"
    },
    {
      title: "Varotra 💰",
      description: "🛍️ Varotra | 🧾 Faktiora atomaty | 💳 Fandoavana maro karazana | 🎁 Fidirana mpanjifa",
      icon: "💰",
      path: "/vente",
      image: "/images/modules/sales.png"
    }
  ]
};