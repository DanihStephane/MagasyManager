export default function Documentation() {
  return (
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: '40px 20px',
      fontFamily: 'Georgia, serif',
      lineHeight: '1.8',
      color: '#333'
    }}>
      <h1 style={{ textAlign: 'center', fontSize: '28px', marginBottom: '10px' }}>
        DOCUMENTATION COMPLÈTE
      </h1>
      <h2 style={{ textAlign: 'center', fontSize: '20px', marginBottom: '40px', fontWeight: 'normal' }}>
        Système de Gestion d'Entrepôt MagasyManager
      </h2>

      <hr style={{ margin: '30px 0', border: 'none', borderTop: '2px solid #333' }} />

      {/* TABLE DES MATIÈRES */}
      <div style={{ marginBottom: '50px', padding: '20px', border: '1px solid #ddd' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>TABLE DES MATIÈRES</h3>
        <ol style={{ lineHeight: '2' }}>
          <li>Introduction et Architecture du Système</li>
          <li>Contrôle d'Accès et Authentification</li>
          <li>Module Administrateur d'Entrepôt
            <ol style={{ listStyleType: 'lower-alpha' }}>
              <li>Gestion des Articles</li>
              <li>Gestion des Commandes</li>
              <li>Gestion des Balles</li>
              <li>Statistiques et Suivi</li>
            </ol>
          </li>
          <li>Module Employés Magasin
            <ol style={{ listStyleType: 'lower-alpha' }}>
              <li>Point de Vente</li>
              <li>Inventaire</li>
            </ol>
          </li>
          <li>Flux de Données et Intégrations</li>
          <li>Scénarios d'Usage Détaillés</li>
        </ol>
      </div>

      <hr style={{ margin: '40px 0' }} />

      {/* 1. INTRODUCTION */}
      <section style={{ marginBottom: '50px' }}>
        <h2 style={{ fontSize: '22px', marginBottom: '20px', borderBottom: '2px solid #333', paddingBottom: '10px' }}>
          1. INTRODUCTION ET ARCHITECTURE DU SYSTÈME
        </h2>

        <h3 style={{ fontSize: '18px', marginTop: '25px', marginBottom: '15px' }}>1.1 Vue d'ensemble</h3>
        <p>
          MagasyManager est un système complet de gestion d'entrepôt conçu pour gérer l'ensemble
          des opérations d'un entrepôt de distribution textile. Le système utilise des données
          statiques pour les simulations et comprend trois niveaux d'accès principaux :
        </p>
        <ul>
          <li><strong>Administrateur d'entrepôt</strong> : Accès complet à tous les modules de gestion</li>
          <li><strong>Employés d'entrepôt</strong> : Accès au module Inventaire pour le comptage physique dans l'entrepôt</li>
          <li><strong>Employés magasin</strong> : Accès au module Vente (point de vente en magasin)</li>
        </ul>

        <div style={{ padding: '15px', backgroundColor: '#f0f8ff', border: '1px solid #4682b4', marginTop: '15px', marginBottom: '15px' }}>
          <p><strong>📍 DISTINCTION IMPORTANTE :</strong></p>
          <ul>
            <li><strong>ENTREPÔT</strong> : Lieu de stockage central. Personnel : Administrateur + Employés d'entrepôt</li>
            <li><strong>MAGASIN</strong> : Points de vente clients. Personnel : Employés magasin (vendeurs)</li>
            <li><strong>INVENTAIRE</strong> : Se fait UNIQUEMENT à l'entrepôt par les employés d'entrepôt</li>
            <li><strong>VENTE</strong> : Se fait UNIQUEMENT en magasin par les employés magasin</li>
          </ul>
        </div>

        <h3 style={{ fontSize: '18px', marginTop: '25px', marginBottom: '15px' }}>1.2 Modules principaux</h3>
        <ul>
          <li><strong>Gestion des Articles</strong> : Enregistrement, modification, visualisation des produits</li>
          <li><strong>Gestion des Commandes</strong> : Commandes de stock et commandes de surplus avec plafond budgétaire</li>
          <li><strong>Gestion des Balles</strong> : Organisation physique de l'entrepôt par balles</li>
          <li><strong>Point de Vente</strong> : Module de vente pour employés magasin</li>
          <li><strong>Inventaire</strong> : Système de comptage assigné par catégorie</li>
          <li><strong>Statistiques</strong> : Suivi des ventes, mouvements, graphiques</li>
        </ul>
      </section>

      <hr style={{ margin: '40px 0' }} />

      {/* 2. CONTRÔLE D'ACCÈS */}
      <section style={{ marginBottom: '50px' }}>
        <h2 style={{ fontSize: '22px', marginBottom: '20px', borderBottom: '2px solid #333', paddingBottom: '10px' }}>
          2. CONTRÔLE D'ACCÈS ET AUTHENTIFICATION
        </h2>

        <h3 style={{ fontSize: '18px', marginTop: '25px', marginBottom: '15px' }}>2.1 Page de déverrouillage (Unlock)</h3>
        <p>
          <strong>Route :</strong> /unlock (route par défaut)<br />
          <strong>Description :</strong> Premier écran de l'application avec animation de déverrouillage simulant
          une authentification biométrique.
        </p>
        <p><strong>UserFlow :</strong></p>
        <ol>
          <li>L'utilisateur arrive sur la page de déverrouillage avec une animation d'empreinte digitale</li>
          <li>Après simulation d'authentification, redirection vers /home</li>
          <li>Dans un environnement de production, cette page permettrait de distinguer les rôles (admin vs employé)</li>
        </ol>

        <h3 style={{ fontSize: '18px', marginTop: '25px', marginBottom: '15px' }}>2.2 Page d'accueil (Home)</h3>
        <p>
          <strong>Route :</strong> /home<br />
          <strong>Accès :</strong> Tous les utilisateurs authentifiés<br />
          <strong>Description :</strong> Dashboard principal avec carte des modules accessibles selon le rôle.
        </p>
        <p><strong>Modules affichés (pour administrateur) :</strong></p>
        <ul>
          <li>Enregistrement (Gestion des articles)</li>
          <li>Commande (Gestion des commandes)</li>
          <li>Vente (Point de vente)</li>
          <li>Statistique (Analyse des ventes)</li>
          <li>Mouvement (Suivi des transferts)</li>
          <li>Image (Catalogue visuel)</li>
          <li>Inventaire (Gestion des inventaires)</li>
          <li>Gestion des Balles</li>
        </ul>
        <p><strong>Fonctionnalités :</strong></p>
        <ul>
          <li>Sélection de thème (clair/sombre)</li>
          <li>Sélection de langue (Français/Malgache)</li>
          <li>Notification de succès lors d'opérations</li>
        </ul>
      </section>

      <hr style={{ margin: '40px 0' }} />

      {/* 3. MODULE ADMINISTRATEUR */}
      <section style={{ marginBottom: '50px' }}>
        <h2 style={{ fontSize: '22px', marginBottom: '20px', borderBottom: '2px solid #333', paddingBottom: '10px' }}>
          3. MODULE ADMINISTRATEUR D'ENTREPÔT
        </h2>

        {/* 3.1 Gestion des Articles */}
        <h3 style={{ fontSize: '18px', marginTop: '30px', marginBottom: '15px', textDecoration: 'underline' }}>
          3.1 GESTION DES ARTICLES
        </h3>

        <h4 style={{ fontSize: '16px', marginTop: '20px', marginBottom: '10px' }}>
          3.1.1 Page Enregistrement
        </h4>
        <p>
          <strong>Route :</strong> /enregistrement<br />
          <strong>Accès :</strong> Administrateur uniquement<br />
          <strong>Description :</strong> Gestion complète du catalogue d'articles (CRUD).
        </p>
        <p><strong>UserFlow - Visualisation :</strong></p>
        <ol>
          <li>L'utilisateur accède à la liste paginée des articles (12 articles de démonstration)</li>
          <li>Recherche par nom/référence/catégorie possible</li>
          <li>Filtrage par catégorie (Hauts, Bas, Vestes, Robes)</li>
          <li>Affichage sous forme de cartes avec image, prix, stock, référence</li>
          <li>Navigation par pagination (6 articles par page)</li>
        </ol>

        <p><strong>UserFlow - Ajout d'article :</strong></p>
        <ol>
          <li>Clic sur bouton "Ajouter Article"</li>
          <li>Redirection vers /ajouter-article (formulaire multi-étapes)</li>
        </ol>

        <h4 style={{ fontSize: '16px', marginTop: '20px', marginBottom: '10px' }}>
          3.1.2 Page Ajouter Article
        </h4>
        <p>
          <strong>Route :</strong> /ajouter-article<br />
          <strong>Description :</strong> Formulaire wizard multi-étapes pour créer un article.
        </p>
        <p><strong>UserFlow complet :</strong></p>
        <ol>
          <li><strong>Étape 1 - Genre :</strong> Sélection parmi Hommes, Femmes, Garçons, Filles (avec images)</li>
          <li><strong>Étape 2 - Classe :</strong> Type de vêtement (Débardeur, Body, T-Shirt, Manche longue, Polo, Chemise, Blouson, Short)</li>
          <li><strong>Étape 3 - Matière :</strong> Cotton, Lin, Jeans, Nilon, Filet, Fibrane, 3D</li>
          <li><strong>Étape 4 - Motif :</strong> Uni, Rayé, À pois, Floral, Géométrique, Imprimé</li>
          <li><strong>Étape 5 - Dessin :</strong> Options de design spécifiques</li>
          <li><strong>Étape 6 - Pointure :</strong> Si applicable</li>
          <li><strong>Étape 7 - Couleur :</strong> Palette de couleurs standard</li>
          <li><strong>Étape 8 - Informations finales :</strong>
            <ul>
              <li>Référence (générée automatiquement)</li>
              <li>Image (URL ou upload)</li>
              <li>Prix unitaire</li>
              <li>Quantité initiale en stock</li>
              <li>Description</li>
              <li>Emplacement dans l'entrepôt</li>
            </ul>
          </li>
          <li><strong>Étape 9 - Récapitulatif :</strong> Affichage de toutes les informations</li>
          <li>Clic sur "Terminer" → Redirection vers /recapitulatif-article</li>
        </ol>

        <h4 style={{ fontSize: '16px', marginTop: '20px', marginBottom: '10px' }}>
          3.1.3 Page Récapitulatif Article
        </h4>
        <p>
          <strong>Route :</strong> /recapitulatif-article<br />
          <strong>Description :</strong> Confirmation finale et enregistrement de l'article.
        </p>
        <p><strong>UserFlow :</strong></p>
        <ol>
          <li>Affichage du récapitulatif complet avec toutes les sélections</li>
          <li>Bouton "Valider" → Sauvegarde dans localStorage (simulation BD)</li>
          <li>Redirection vers /enregistrement avec notification de succès</li>
          <li>Nouvel article visible dans la liste</li>
        </ol>

        <h4 style={{ fontSize: '16px', marginTop: '20px', marginBottom: '10px' }}>
          3.1.4 Page Image (Catalogue Visuel)
        </h4>
        <p>
          <strong>Route :</strong> /image<br />
          <strong>Description :</strong> Galerie visuelle des articles avec zoom.
        </p>
        <p><strong>UserFlow :</strong></p>
        <ol>
          <li>Affichage en grille des articles avec grandes images</li>
          <li>Recherche par référence ou nom</li>
          <li>Filtrage par catégorie</li>
          <li>Clic sur image → Modal de zoom avec détails</li>
          <li>Navigation pagination</li>
        </ol>

        {/* 3.2 Gestion des Commandes */}
        <h3 style={{ fontSize: '18px', marginTop: '30px', marginBottom: '15px', textDecoration: 'underline' }}>
          3.2 GESTION DES COMMANDES (SYSTÈME CRUCIAL)
        </h3>

        <h4 style={{ fontSize: '16px', marginTop: '20px', marginBottom: '10px' }}>
          3.2.1 Page Choix Type de Commande
        </h4>
        <p>
          <strong>Route :</strong> /commande<br />
          <strong>Description :</strong> Sélection entre Commande de Stock et Commande de Surplus.
        </p>
        <p><strong>UserFlow :</strong></p>
        <ol>
          <li>Affichage de 2 cartes de choix :
            <ul>
              <li><strong>Commande de Stock :</strong> Gestion des stocks réguliers, anticipation des besoins</li>
              <li><strong>Commande de Surplus :</strong> Commandes spéciales pour pics d'activité</li>
            </ul>
          </li>
          <li>Clic sur une carte → Redirection vers la page correspondante</li>
        </ol>

        <h4 style={{ fontSize: '16px', marginTop: '20px', marginBottom: '10px' }}>
          3.2.2 Page Commande de Stock (DÉTAILS CRITIQUES)
        </h4>
        <p>
          <strong>Route :</strong> /commande-stock<br />
          <strong>Description :</strong> Système de commande avec plafond budgétaire et gestion de dépassement.
        </p>

        <div style={{ padding: '15px', backgroundColor: '#f9f9f9', border: '1px solid #ddd', marginTop: '15px', marginBottom: '15px' }}>
          <p><strong>PARAMÈTRES FINANCIERS :</strong></p>
          <ul>
            <li><strong>Prix d'affaire (businessPrice) :</strong> 1 000 000 Ar (plafond initial)</li>
            <li><strong>Mode dépassement (isDepassementMode) :</strong> Permet de dépasser le plafond avec code</li>
          </ul>
        </div>

        <p><strong>UserFlow Complet :</strong></p>

        <p style={{ fontWeight: 'bold', marginTop: '15px' }}>ÉTAPE 1 - Sélection de Catégorie :</p>
        <ol>
          <li>Affichage des catégories avec checkboxes de filtrage :
            <ul>
              <li>Débardeur (15 000 Ar)</li>
              <li>Body (20 000 Ar)</li>
              <li>T-shirt (25 000 Ar)</li>
              <li>Manche longue (30 000 Ar)</li>
              <li>Polo (35 000 Ar)</li>
              <li>Chemise (40 000 Ar)</li>
              <li>Blouson (50 000 Ar)</li>
              <li>Short (30 000 Ar)</li>
              <li>Robe (45 000 Ar)</li>
            </ul>
          </li>
          <li>Utilisateur peut cocher/décocher pour filtrer les catégories visibles</li>
          <li>Sélection d'une catégorie → Passage à l'étape 2</li>
        </ol>

        <p style={{ fontWeight: 'bold', marginTop: '15px' }}>ÉTAPE 2 - Sélection de Quantité :</p>
        <ol>
          <li>Affichage des quantités prédéfinies avec checkboxes : 1, 2, 3, 5, 10</li>
          <li>Possibilité de filtrer les quantités visibles</li>
          <li>Possibilité d'ajouter une quantité personnalisée</li>
          <li>Sélection d'une quantité → Passage à l'étape 3</li>
        </ol>

        <p style={{ fontWeight: 'bold', marginTop: '15px' }}>ÉTAPE 3 - Panier et Validation :</p>
        <ol>
          <li>Affichage du panier avec tous les articles ajoutés</li>
          <li>Calcul en temps réel du prix total :
            <ul>
              <li>Prix unitaire × Quantité pour chaque ligne</li>
              <li>Total général affiché</li>
            </ul>
          </li>
          <li><strong>CONTRÔLE DU PLAFOND :</strong>
            <ul>
              <li>Si Total {'>'} 1 000 000 Ar ET mode dépassement désactivé :</li>
              <li>→ Message d'erreur : "Vous avez atteint la limite maximum de prix du magasin"</li>
              <li>→ Impossible d'ajouter l'article au panier</li>
              <li>→ Affichage du bouton "Permettre le dépassement"</li>
            </ul>
          </li>
          <li>Possibilité de supprimer des articles du panier</li>
          <li>Bouton "Valider la commande" → Impression/Confirmation</li>
        </ol>

        <h4 style={{ fontSize: '16px', marginTop: '20px', marginBottom: '10px' }}>
          3.2.3 Système de Dépassement (FLUX CRITIQUE)
        </h4>
        <p>
          <strong>Route :</strong> /depassement<br />
          <strong>Description :</strong> Processus d'autorisation pour dépasser le plafond budgétaire.
        </p>

        <div style={{ padding: '15px', backgroundColor: '#fff3cd', border: '1px solid #ffc107', marginTop: '15px', marginBottom: '15px' }}>
          <p><strong>⚠️ INFORMATIONS CRITIQUES :</strong></p>
          <ul>
            <li><strong>Code de dépassement :</strong> "0101" (hardcodé dans Depassement.tsx:14)</li>
            <li><strong>Fonction :</strong> Permet de passer isDepassementMode à true</li>
            <li><strong>Implication :</strong> Désactive le contrôle du plafond de 1 000 000 Ar</li>
          </ul>
        </div>

        <p><strong>UserFlow Complet :</strong></p>
        <ol>
          <li><strong>Déclenchement :</strong> Clic sur "Permettre le dépassement" depuis /commande-stock</li>
          <li><strong>Étape 1 - Saisie du code :</strong>
            <ul>
              <li>Affichage d'un formulaire modal ou page</li>
              <li>Explication : "Le dépassement permet d'augmenter temporairement votre limite d'achat"</li>
              <li>Champ de saisie : Code de dépassement (type password)</li>
              <li>Utilisateur saisit : "0101"</li>
              <li>Validation → Passage à l'étape 2</li>
              <li>Si code incorrect → Reste sur étape 1</li>
            </ul>
          </li>
          <li><strong>Étape 2 - Délai de remboursement :</strong>
            <ul>
              <li>Champ : "Nombre de jours pour le remboursement"</li>
              <li>Explication : L'excédent doit être remboursé dans ce délai</li>
              <li>Saisie d'un nombre (ex: 30 jours, 60 jours)</li>
              <li>Validation → Passage à l'étape 3</li>
            </ul>
          </li>
          <li><strong>Étape 3 - Récapitulatif :</strong>
            <ul>
              <li>Affichage : "Code de dépassement validé"</li>
              <li>Affichage : "Délai de remboursement: X jours"</li>
              <li>Bouton "Retourner à la commande"</li>
              <li>→ Redirection vers /commande-stock avec isDepassementMode = true</li>
            </ul>
          </li>
          <li><strong>Retour sur Commande Stock :</strong>
            <ul>
              <li>Le contrôle du plafond est désormais désactivé (ligne 112-117)</li>
              <li>Utilisateur peut ajouter des articles sans limite de prix</li>
              <li>Badge ou indication visuelle du mode dépassement actif</li>
            </ul>
          </li>
        </ol>

        <div style={{ padding: '15px', backgroundColor: '#d1ecf1', border: '1px solid #bee5eb', marginTop: '15px', marginBottom: '15px' }}>
          <p><strong>💡 LOGIQUE MÉTIER :</strong></p>
          <p>
            Le système de dépassement simule un mécanisme d'amortissement où :
          </p>
          <ul>
            <li>Le magasin a un budget limité (chiffre d'affaires)</li>
            <li>En cas de besoin urgent, le responsable peut demander un dépassement</li>
            <li>Ce dépassement doit être autorisé par code (contrôle hiérarchique)</li>
            <li>Un délai de remboursement est fixé (amortissement)</li>
            <li>Le système trace cette opération exceptionnelle</li>
          </ul>
        </div>

        <h4 style={{ fontSize: '16px', marginTop: '20px', marginBottom: '10px' }}>
          3.2.4 Page Commande de Surplus
        </h4>
        <p>
          <strong>Route :</strong> /commande-surplus<br />
          <strong>Description :</strong> Commandes spéciales pour surplus, même logique que Commande Stock.
        </p>
        <p><strong>UserFlow :</strong></p>
        <ol>
          <li>Processus identique à Commande Stock (étapes 1-2-3)</li>
          <li>Même système de catégories et quantités</li>
          <li>Même contrôle de plafond budgétaire</li>
          <li>Accès au système de dépassement si nécessaire</li>
          <li>Différence : Les surplus sont destinés à des pics d'activité (soldes, fêtes, etc.)</li>
        </ol>

        {/* 3.3 Gestion des Balles */}
        <h3 style={{ fontSize: '18px', marginTop: '30px', marginBottom: '15px', textDecoration: 'underline' }}>
          3.3 GESTION DES BALLES
        </h3>

        <h4 style={{ fontSize: '16px', marginTop: '20px', marginBottom: '10px' }}>
          3.3.1 Page Gestion Balles
        </h4>
        <p>
          <strong>Route :</strong> /gestion-balles<br />
          <strong>Description :</strong> Organisation physique de l'entrepôt par balles de marchandises.
        </p>
        <p><strong>Concept :</strong></p>
        <ul>
          <li>Une balle = unité de stockage contenant plusieurs articles</li>
          <li>Chaque balle a : Numéro, Emplacement (Zone A/B/C/D), Étage (A/B/C/D/E)</li>
          <li>Permet de retrouver physiquement les articles dans l'entrepôt</li>
        </ul>

        <p><strong>UserFlow - Visualisation :</strong></p>
        <ol>
          <li>Liste des balles existantes (3 balles de démonstration)</li>
          <li>Recherche par numéro de balle</li>
          <li>Filtrage par emplacement (Zone A, B, C, D)</li>
          <li>Filtrage par étage (A, B, C, D, E)</li>
          <li>Affichage : Numéro, Emplacement, Étage, Quantité totale, Articles contenus</li>
        </ol>

        <p><strong>UserFlow - Création de balle :</strong></p>
        <ol>
          <li>Clic sur "Ajouter une balle"</li>
          <li>Modal/Dialog d'ajout :
            <ul>
              <li>Numéro de balle (ex: BALLE-001)</li>
              <li>Sélection emplacement (Zone A/B/C/D)</li>
              <li>Sélection étage (A/B/C/D/E)</li>
              <li>Sélection des articles à inclure (avec quantités)</li>
            </ul>
          </li>
          <li>Validation → Balle créée et visible dans la liste</li>
        </ol>

        <p><strong>UserFlow - Modification/Suppression :</strong></p>
        <ol>
          <li>Bouton "Modifier" sur une balle → Ouvre le formulaire pré-rempli</li>
          <li>Modification des informations possibles</li>
          <li>Validation → Mise à jour</li>
          <li>Bouton "Supprimer" → Confirmation → Suppression</li>
        </ol>

        {/* 3.4 Statistiques et Suivi */}
        <h3 style={{ fontSize: '18px', marginTop: '30px', marginBottom: '15px', textDecoration: 'underline' }}>
          3.4 STATISTIQUES ET SUIVI
        </h3>

        <h4 style={{ fontSize: '16px', marginTop: '20px', marginBottom: '10px' }}>
          3.4.1 Page Statistique
        </h4>
        <p>
          <strong>Route :</strong> /statistique<br />
          <strong>Description :</strong> Analyse des ventes par catégorie et période.
        </p>
        <p><strong>UserFlow :</strong></p>
        <ol>
          <li>Sélection de période (Aujourd'hui, Cette semaine, Ce mois, Cette année)</li>
          <li>Recherche par article</li>
          <li>Filtrage par catégorie</li>
          <li>Affichage des cartes d'articles vendus avec :
            <ul>
              <li>Nom et référence</li>
              <li>Quantité vendue</li>
              <li>Prix unitaire</li>
              <li>Total (quantité × prix)</li>
            </ul>
          </li>
          <li>Calcul des totaux globaux</li>
        </ol>

        <h4 style={{ fontSize: '16px', marginTop: '20px', marginBottom: '10px' }}>
          3.4.2 Page GraphStats
        </h4>
        <p>
          <strong>Route :</strong> /graph-stats<br />
          <strong>Description :</strong> Graphiques de ventes (bar charts, line charts).
        </p>
        <p><strong>UserFlow :</strong></p>
        <ol>
          <li>Sélection de type de graphique (Ventes par jour, par catégorie, par mois)</li>
          <li>Sélection de période</li>
          <li>Affichage du graphique avec données simulées</li>
          <li>Légende et statistiques clés</li>
        </ol>

        <h4 style={{ fontSize: '16px', marginTop: '20px', marginBottom: '10px' }}>
          3.4.3 Page Mouvement
        </h4>
        <p>
          <strong>Route :</strong> /mouvement<br />
          <strong>Description :</strong> Suivi des transferts de marchandises (surplus reçu/donné).
        </p>
        <p><strong>UserFlow :</strong></p>
        <ol>
          <li>Onglets : "Surplus Reçu" / "Surplus Donné"</li>
          <li>Liste des mouvements avec :
            <ul>
              <li>Article</li>
              <li>Quantité</li>
              <li>Magasin source/destination</li>
              <li>Date de transfert</li>
              <li>Catégorie</li>
            </ul>
          </li>
          <li>Recherche et filtrage par catégorie et magasin</li>
          <li>Pagination</li>
        </ol>

        <h4 style={{ fontSize: '16px', marginTop: '20px', marginBottom: '10px' }}>
          3.4.4 Pages Tracking et ProductCheck
        </h4>
        <p>
          <strong>Route :</strong> /tracking et /product-check<br />
          <strong>Description :</strong> Outils de suivi et vérification des produits.
        </p>
        <p><strong>UserFlow Tracking :</strong></p>
        <ol>
          <li>Saisie d'une référence ou numéro de commande</li>
          <li>Affichage de l'historique complet</li>
          <li>Statut actuel et localisation</li>
        </ol>
        <p><strong>UserFlow ProductCheck :</strong></p>
        <ol>
          <li>Vérification rapide de disponibilité</li>
          <li>Recherche par référence</li>
          <li>Affichage stock, prix, emplacement</li>
        </ol>
      </section>

      <hr style={{ margin: '40px 0' }} />

      {/* 4. MODULE EMPLOYÉS */}
      <section style={{ marginBottom: '50px' }}>
        <h2 style={{ fontSize: '22px', marginBottom: '20px', borderBottom: '2px solid #333', paddingBottom: '10px' }}>
          4. MODULES SPÉCIFIQUES PAR TYPE D'EMPLOYÉ
        </h2>

        {/* 4.1 Point de Vente */}
        <h3 style={{ fontSize: '18px', marginTop: '30px', marginBottom: '15px', textDecoration: 'underline' }}>
          4.1 POINT DE VENTE (EMPLOYÉS MAGASIN)
        </h3>

        <div style={{ padding: '15px', backgroundColor: '#e7f3ff', border: '1px solid #2196F3', marginTop: '15px', marginBottom: '15px' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>🏪 MODULE MAGASIN</p>
          <p><strong>Lieu :</strong> Magasins/Points de vente clients</p>
          <p><strong>Personnel :</strong> Employés magasin (vendeurs)</p>
          <p><strong>Fonction :</strong> Enregistrement des ventes aux clients finaux</p>
        </div>

        <h4 style={{ fontSize: '16px', marginTop: '20px', marginBottom: '10px' }}>
          4.1.1 Page Vente
        </h4>
        <p>
          <strong>Route :</strong> /vente<br />
          <strong>Accès :</strong> Employés magasin (vendeurs) + Administrateur<br />
          <strong>Lieu d'utilisation :</strong> Dans les magasins/points de vente<br />
          <strong>Description :</strong> Système de caisse pour enregistrer les ventes aux clients.
        </p>
        <p><strong>UserFlow Complet :</strong></p>

        <p style={{ fontWeight: 'bold', marginTop: '15px' }}>ÉTAPE 1 - Sélection de Catégorie :</p>
        <ol>
          <li>Affichage des catégories avec checkboxes de filtrage (identique à Commande)</li>
          <li>Utilisateur filtre les catégories visibles</li>
          <li>Sélection d'une catégorie → Passage à l'étape 2</li>
        </ol>

        <p style={{ fontWeight: 'bold', marginTop: '15px' }}>ÉTAPE 2 - Sélection de Quantité :</p>
        <ol>
          <li>Quantités prédéfinies avec checkboxes : 1, 2, 3, 5, 10</li>
          <li>Possibilité de saisir quantité personnalisée</li>
          <li>Sélection → Passage à l'étape 3</li>
        </ol>

        <p style={{ fontWeight: 'bold', marginTop: '15px' }}>ÉTAPE 3 - Panier et Encaissement :</p>
        <ol>
          <li>Affichage du panier avec articles et prix</li>
          <li>Calcul automatique du total</li>
          <li>Possibilité d'ajouter/retirer des articles</li>
          <li>Bouton "Encaisser" → Enregistrement de la vente</li>
          <li>Impression de ticket (simulation)</li>
          <li>Réinitialisation du panier</li>
        </ol>

        <div style={{ padding: '15px', backgroundColor: '#f9f9f9', border: '1px solid #ddd', marginTop: '15px', marginBottom: '15px' }}>
          <p><strong>Note :</strong> Contrairement aux commandes, la vente n'a pas de plafond budgétaire.</p>
        </div>

        {/* 4.2 Inventaire */}
        <h3 style={{ fontSize: '18px', marginTop: '30px', marginBottom: '15px', textDecoration: 'underline' }}>
          4.2 INVENTAIRE (EMPLOYÉS D'ENTREPÔT)
        </h3>

        <div style={{ padding: '15px', backgroundColor: '#fff3cd', border: '2px solid #ffc107', marginTop: '15px', marginBottom: '20px' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>⚠️ IMPORTANT - CONTEXTE INVENTAIRE :</p>
          <p style={{ marginBottom: '10px' }}>
            <strong>L'inventaire se fait SYSTÉMATIQUEMENT au niveau de l'ENTREPÔT.</strong>
          </p>
          <ul style={{ marginLeft: '20px' }}>
            <li><strong>Lieu :</strong> Entrepôt central (pas les magasins)</li>
            <li><strong>Personnel :</strong> Employés d'entrepôt affectés au comptage</li>
            <li><strong>Processus :</strong> L'administrateur d'entrepôt dispatch l'application aux employés</li>
            <li><strong>Organisation :</strong> Chaque employé reçoit une catégorie à compter physiquement dans l'entrepôt</li>
            <li><strong>Objectif :</strong> Vérifier la concordance entre le stock théorique (système) et le stock physique (entrepôt)</li>
          </ul>
        </div>

        <h4 style={{ fontSize: '16px', marginTop: '20px', marginBottom: '10px' }}>
          4.2.1 Page Sélection Inventaire (Dispatch)
        </h4>
        <p>
          <strong>Route :</strong> /selection-inventaire<br />
          <strong>Accès :</strong> Employés d'entrepôt + Administrateur d'entrepôt<br />
          <strong>Description :</strong> Dispatch et attribution des catégories à compter à chaque employé d'entrepôt.
        </p>
        <p><strong>UserFlow Administrateur d'Entrepôt (Dispatch) :</strong></p>
        <ol>
          <li>Affichage des catégories d'inventaire :
            <ul>
              <li>Hauts (notation en étoiles selon quantité totale)</li>
              <li>Bas</li>
              <li>Vestes</li>
              <li>Robes</li>
            </ul>
          </li>
          <li>Clic sur une catégorie → Dialog d'assignation</li>
          <li>Saisie du nom du responsable</li>
          <li>Validation → Catégorie assignée avec badge du responsable</li>
          <li>Catégorie bloquée pour les autres tant qu'elle n'est pas terminée</li>
        </ol>

        <p><strong>UserFlow Employé d'Entrepôt (Réception du dispatch) :</strong></p>
        <ol>
          <li>L'employé reçoit l'application dispatchée sur son terminal/tablette</li>
          <li>Visualisation de la catégorie qui lui a été assignée par l'administrateur</li>
          <li>Sélection de sa catégorie → Redirection vers /inventaire</li>
          <li>L'employé se déplace physiquement dans l'entrepôt pour compter</li>
        </ol>

        <div style={{ padding: '15px', backgroundColor: '#d1ecf1', border: '1px solid #bee5eb', marginTop: '15px', marginBottom: '15px' }}>
          <p><strong>💡 PROCESSUS ORGANISATIONNEL :</strong></p>
          <ol>
            <li><strong>Planification :</strong> L'administrateur planifie l'inventaire (date)</li>
            <li><strong>Dispatch :</strong> Attribution des catégories aux employés d'entrepôt</li>
            <li><strong>Distribution :</strong> Chaque employé reçoit l'application avec sa catégorie assignée</li>
            <li><strong>Comptage physique :</strong> Les employés comptent dans l'entrepôt avec l'application</li>
            <li><strong>Saisie :</strong> Enregistrement des quantités physiques dans l'application</li>
            <li><strong>Validation :</strong> Comparaison automatique avec les stocks théoriques</li>
            <li><strong>Rapport :</strong> Génération des écarts pour correction</li>
          </ol>
        </div>

        <h4 style={{ fontSize: '16px', marginTop: '20px', marginBottom: '10px' }}>
          4.2.2 Page Inventaire (Comptage dans l'Entrepôt)
        </h4>
        <p>
          <strong>Route :</strong> /inventaire<br />
          <strong>Description :</strong> Interface de comptage physique des articles dans l'entrepôt.
        </p>
        <p>
          <strong>Contexte d'utilisation :</strong> L'employé d'entrepôt se déplace physiquement dans les
          zones de stockage avec son terminal pour compter les articles de sa catégorie.
        </p>
        <p><strong>UserFlow Complet :</strong></p>
        <ol>
          <li><strong>Initialisation :</strong>
            <ul>
              <li>L'employé ouvre l'application dispatchée sur son terminal</li>
              <li>Récupération de la catégorie assignée (ex: "Hauts")</li>
              <li>Chargement des articles de cette catégorie (12 articles de démo)</li>
              <li>Affichage du nom de l'employé et de la date d'inventaire</li>
            </ul>
          </li>
          <li><strong>Onglets de filtrage :</strong>
            <ul>
              <li>Tous : Tous les articles</li>
              <li>À compter : Articles non encore comptés (stockComptage = null)</li>
              <li>Vérifiés : Articles validés (estVerifie = true)</li>
              <li>En erreur : Articles avec écarts (estEnErreur = true)</li>
            </ul>
          </li>
          <li><strong>Processus de comptage par article :</strong>
            <ol type="a">
              <li>Affichage de la carte article avec :
                <ul>
                  <li>Image, nom, référence</li>
                  <li>Stock prédéfini (base de données théorique)</li>
                  <li>Stock compté (vide au départ)</li>
                  <li>Notation en étoiles selon quantité</li>
                </ul>
              </li>
              <li>Clic sur article → Modal de comptage :
                <ul>
                  <li>L'employé se rend physiquement à l'emplacement dans l'entrepôt</li>
                  <li>Compte manuellement les articles (comptage physique)</li>
                  <li>Champ de saisie : Quantité comptée physiquement dans l'entrepôt</li>
                  <li>Champ : Remarque (ex: "Articles endommagés", "Mauvais emplacement")</li>
                  <li>Bouton "Valider le comptage"</li>
                </ul>
              </li>
              <li>Validation :
                <ul>
                  <li>Si quantité comptée = stock prédéfini → Badge vert "Conforme"</li>
                  <li>Si quantité comptée ≠ stock prédéfini → Badge rouge "Écart détecté"</li>
                  <li>Article passe en statut "vérifié" ou "en erreur"</li>
                  <li>Possibilité de recompter (max 3 tentatives)</li>
                </ul>
              </li>
            </ol>
          </li>
          <li><strong>Suivi de progression :</strong>
            <ul>
              <li>Barre de progression : X/12 articles comptés</li>
              <li>Statistiques en temps réel : Conformes, Écarts, Restants</li>
            </ul>
          </li>
          <li><strong>Finalisation :</strong>
            <ul>
              <li>Lorsque tous les articles de la catégorie sont comptés physiquement</li>
              <li>Bouton "Terminer l'inventaire"</li>
              <li>Génération automatique d'un rapport d'écarts (simulation)</li>
              <li>Mise à jour du statut de la catégorie (terminée)</li>
              <li>Synchronisation des données avec le système central</li>
              <li>Redirection vers /selection-inventaire</li>
            </ul>
          </li>
        </ol>

        <div style={{ padding: '15px', backgroundColor: '#f0f8ff', border: '1px solid #4682b4', marginTop: '15px', marginBottom: '15px' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>📱 UTILISATION PRATIQUE DANS L'ENTREPÔT :</p>
          <p style={{ marginBottom: '10px' }}>Exemple concret - Employé comptant la catégorie "Hauts" :</p>
          <ol>
            <li>L'employé reçoit son terminal avec la catégorie "Hauts" assignée</li>
            <li>Il se déplace dans la Zone B, Étage C de l'entrepôt (emplacement des hauts)</li>
            <li>Il consulte la première carte : "T-shirt Premium" (Stock théorique : 45)</li>
            <li>Il compte physiquement les T-shirts dans les cartons/rayonnages</li>
            <li>Il trouve 43 T-shirts (2 manquants)</li>
            <li>Il saisit "43" et note "2 articles défectueux mis au rebut"</li>
            <li>Il passe à l'article suivant : "Chemise Blanche"</li>
            <li>Répète le processus pour tous les articles de la catégorie</li>
            <li>Une fois terminé, le système génère le rapport d'écarts</li>
            <li>L'administrateur peut ensuite ajuster les stocks théoriques</li>
          </ol>
        </div>

        <div style={{ padding: '15px', backgroundColor: '#d1ecf1', border: '1px solid #bee5eb', marginTop: '15px', marginBottom: '15px' }}>
          <p><strong>💡 LOGIQUE MÉTIER - Système de notation en étoiles :</strong></p>
          <ul>
            <li>⭐ (Gris) : 1-4 unités - Très peu de stock</li>
            <li>⭐⭐ (Bleu) : 5-14 unités - Stock faible</li>
            <li>⭐⭐⭐ (Jaune) : 15-29 unités - Stock moyen</li>
            <li>⭐⭐⭐⭐ (Orange) : 30-49 unités - Stock élevé</li>
            <li>⭐⭐⭐⭐⭐ (Rouge) : 50+ unités - Beaucoup de stock</li>
          </ul>
          <p>Ce système permet d'identifier rapidement les articles en surstockage ou rupture.</p>
        </div>
      </section>

      <hr style={{ margin: '40px 0' }} />

      {/* 5. FLUX DE DONNÉES */}
      <section style={{ marginBottom: '50px' }}>
        <h2 style={{ fontSize: '22px', marginBottom: '20px', borderBottom: '2px solid #333', paddingBottom: '10px' }}>
          5. FLUX DE DONNÉES ET INTÉGRATIONS
        </h2>

        <h3 style={{ fontSize: '18px', marginTop: '25px', marginBottom: '15px' }}>5.1 Stockage des données</h3>
        <p>
          Toutes les données sont stockées en <strong>localStorage</strong> pour simulation :
        </p>
        <ul>
          <li><strong>inventaireArticles :</strong> Liste des articles avec stocks</li>
          <li><strong>inventaireAssignments :</strong> Assignations des catégories aux employés</li>
          <li><strong>inventaireCurrentCategory :</strong> Catégorie en cours de comptage</li>
          <li><strong>inventaireCurrentResponsable :</strong> Nom de l'employé comptant</li>
          <li><strong>inventaireDate :</strong> Date de l'inventaire</li>
          <li><strong>commandeStock :</strong> Commandes de stock enregistrées</li>
          <li><strong>ventes :</strong> Historique des ventes</li>
        </ul>

        <h3 style={{ fontSize: '18px', marginTop: '25px', marginBottom: '15px' }}>5.2 Navigation et liens</h3>
        <p>Architecture de navigation :</p>
        <ul>
          <li>/ → /unlock</li>
          <li>/unlock → /home (après authentification)</li>
          <li>/home → Tous les modules accessibles selon le rôle</li>
          <li>Bouton "Accueil" présent sur toutes les pages → /home</li>
          <li>Gestion de l'état via React hooks et localStorage</li>
        </ul>

        <h3 style={{ fontSize: '18px', marginTop: '25px', marginBottom: '15px' }}>5.3 Composants partagés</h3>
        <ul>
          <li><strong>HomeButton :</strong> Bouton de retour à l'accueil réutilisable</li>
          <li><strong>DepassementContent :</strong> Modal de gestion du dépassement budgétaire</li>
          <li><strong>UI Components :</strong> Card, Button, Input, Dialog, Tabs, etc. (shadcn/ui)</li>
        </ul>
      </section>

      <hr style={{ margin: '40px 0' }} />

      {/* 6. SCÉNARIOS D'USAGE */}
      <section style={{ marginBottom: '50px' }}>
        <h2 style={{ fontSize: '22px', marginBottom: '20px', borderBottom: '2px solid #333', paddingBottom: '10px' }}>
          6. SCÉNARIOS D'USAGE DÉTAILLÉS
        </h2>

        <h3 style={{ fontSize: '18px', marginTop: '25px', marginBottom: '15px' }}>
          Scénario 1 : Administrateur créant une commande avec dépassement
        </h3>
        <ol>
          <li>Administrateur se connecte via /unlock</li>
          <li>Accède à /home → Sélectionne "Commande"</li>
          <li>Choisit "Commande de Stock" → /commande-stock</li>
          <li>Ajoute plusieurs articles au panier :
            <ul>
              <li>10 T-shirts (250 000 Ar)</li>
              <li>15 Chemises (600 000 Ar)</li>
              <li>8 Blousons (400 000 Ar)</li>
              <li><strong>Total = 1 250 000 Ar {'>'} 1 000 000 Ar</strong></li>
            </ul>
          </li>
          <li>Message d'erreur : "Limite atteinte"</li>
          <li>Clic sur "Permettre le dépassement" → /depassement</li>
          <li>Saisit le code "0101" → Validé</li>
          <li>Indique 45 jours de délai de remboursement</li>
          <li>Retour à /commande-stock en mode dépassement</li>
          <li>Peut désormais valider la commande de 1 250 000 Ar</li>
          <li>Génération du bon de commande avec mention du dépassement</li>
        </ol>

        <h3 style={{ fontSize: '18px', marginTop: '25px', marginBottom: '15px' }}>
          Scénario 2 : Employé d'entrepôt réalisant un inventaire
        </h3>
        <ol>
          <li>L'administrateur d'entrepôt planifie un inventaire et dispatch l'application</li>
          <li>L'employé d'entrepôt reçoit son terminal avec la catégorie "Hauts" assignée</li>
          <li>Il ouvre l'application → /selection-inventaire</li>
          <li>Voit sa catégorie "Hauts" assignée</li>
          <li>Clique sur la catégorie → /inventaire avec filtrage "Hauts"</li>
          <li>Voit 4 articles à compter physiquement dans l'entrepôt</li>
          <li>Se déplace dans l'entrepôt (Zone B, Étage C) avec son terminal</li>
          <li>Commence par le T-shirt :
            <ul>
              <li>Stock prédéfini : 45 unités</li>
              <li>Compte physiquement : 43 unités</li>
              <li>Saisit 43 → Badge rouge "Écart détecté"</li>
              <li>Ajoute remarque : "2 articles défectueux mis de côté"</li>
            </ul>
          </li>
          <li>Continue avec Chemise :
            <ul>
              <li>Stock prédéfini : 52 unités</li>
              <li>Compte : 52 unités</li>
              <li>Badge vert "Conforme"</li>
            </ul>
          </li>
          <li>Après tous les articles → Barre 4/4</li>
          <li>Clic "Terminer l'inventaire"</li>
          <li>Rapport généré avec 1 écart et 3 conformes</li>
          <li>Retour à /selection-inventaire avec catégorie marquée terminée</li>
        </ol>

        <h3 style={{ fontSize: '18px', marginTop: '25px', marginBottom: '15px' }}>
          Scénario 3 : Employé magasin effectuant une vente
        </h3>
        <ol>
          <li>L'employé magasin (vendeur) est dans son magasin/point de vente</li>
          <li>Il accède à l'application de vente → /vente</li>
          <li>Un client se présente et souhaite acheter :
            <ul>
              <li>2 T-shirts</li>
              <li>1 Jean</li>
              <li>1 Veste</li>
            </ul>
          </li>
          <li>Étape 1 : Sélectionne "T-shirt" → Étape 2</li>
          <li>Étape 2 : Sélectionne quantité "2" → Ajouté au panier</li>
          <li>Répète pour Jean (quantité 1) et Veste (quantité 1)</li>
          <li>Étape 3 : Panier affiche :
            <ul>
              <li>2 T-shirts : 50 000 Ar</li>
              <li>1 Jean : 45 000 Ar</li>
              <li>1 Veste : 120 000 Ar</li>
              <li><strong>Total : 215 000 Ar</strong></li>
            </ul>
          </li>
          <li>Clic "Encaisser" → Vente enregistrée</li>
          <li>Ticket imprimé (simulation)</li>
          <li>Stocks mis à jour automatiquement</li>
          <li>Panier réinitialisé pour client suivant</li>
        </ol>

        <h3 style={{ fontSize: '18px', marginTop: '25px', marginBottom: '15px' }}>
          Scénario 4 : Administrateur ajoutant un nouvel article
        </h3>
        <ol>
          <li>Accède à /enregistrement</li>
          <li>Clic "Ajouter Article" → /ajouter-article</li>
          <li>Wizard de 8 étapes :
            <ol type="a">
              <li>Genre : Sélectionne "Femmes"</li>
              <li>Classe : Sélectionne "Robe"</li>
              <li>Matière : Sélectionne "Lin"</li>
              <li>Motif : Sélectionne "Floral"</li>
              <li>Dessin : Sélectionne un motif spécifique</li>
              <li>Pointure : Non applicable pour robe</li>
              <li>Couleur : Sélectionne "Bleu ciel"</li>
              <li>Informations finales :
                <ul>
                  <li>Référence générée : #789012</li>
                  <li>Prix : 65 000 Ar</li>
                  <li>Quantité : 30 unités</li>
                  <li>Description : "Robe légère en lin, motif floral, idéale pour l'été"</li>
                  <li>Emplacement : Zone B, Étage C</li>
                </ul>
              </li>
            </ol>
          </li>
          <li>Récapitulatif → /recapitulatif-article</li>
          <li>Validation → Article sauvegardé</li>
          <li>Retour /enregistrement → Nouvel article visible</li>
        </ol>
      </section>

      <hr style={{ margin: '40px 0' }} />

      {/* CONCLUSION */}
      <section style={{ marginBottom: '50px' }}>
        <h2 style={{ fontSize: '22px', marginBottom: '20px', borderBottom: '2px solid #333', paddingBottom: '10px' }}>
          CONCLUSION
        </h2>
        <p>
          MagasyManager est un système complet de gestion d'entrepôt offrant :
        </p>
        <ul>
          <li>Une gestion fine des articles avec système de catégorisation avancé</li>
          <li>Un système de commandes avec contrôle budgétaire et mécanisme de dépassement sécurisé</li>
          <li>Une organisation physique via le système de balles</li>
          <li>Des outils dédiés pour les employés (vente et inventaire)</li>
          <li>Des statistiques et suivis complets pour la prise de décision</li>
        </ul>
        <p>
          Le système utilise des données statiques pour la simulation, permettant de tester
          tous les parcours utilisateurs sans backend. Les mécanismes de plafond budgétaire,
          de dépassement avec code, et le système de notation en étoiles pour l'inventaire
          représentent des fonctionnalités métier essentielles pour la gestion d'un entrepôt réel.
        </p>
      </section>

      <hr style={{ margin: '40px 0' }} />

      <div style={{ textAlign: 'center', padding: '30px', backgroundColor: '#f9f9f9', border: '1px solid #ddd' }}>
        <p style={{ fontSize: '14px', color: '#666' }}>
          Document généré par MagasyManager<br />
          Version 1.0 - {new Date().getFullYear()}<br />
          © Tous droits réservés
        </p>
      </div>
    </div>
  );
}
