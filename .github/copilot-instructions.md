# Instructions Copilot — PW Starterkit

Les instructions techniques complètes du projet sont dans **[.ai/INDEX.md](../.ai/INDEX.md)**.
Lis ce fichier en premier, puis les fichiers du domaine concerné par ta tâche.

---

## Messages de commit

**Toujours rédiger les messages de commit en français**, au format **Conventional Commits**.

### Format

```
type(scope): description

Corps optionnel expliquant le pourquoi du changement.
```

### Règles

| Élément | Règle |
|---|---|
| Langue | **français** — toujours |
| Type | obligatoire, en minuscules |
| Scope | optionnel, entre parenthèses, en minuscules |
| Description | à l'impératif ou à l'infinitif, minuscule initiale, **sans point final** |
| Longueur du sujet | 72 caractères maximum |
| Corps | séparé du sujet par une ligne vide, explique **pourquoi**, pas **comment** |

### Types autorisés

| Type | Usage |
|---|---|
| `feat` | Nouvelle fonctionnalité |
| `fix` | Correction de bug |
| `refactor` | Refonte de code sans changement de comportement |
| `chore` | Tâches diverses (dépendances, config, nettoyage) |
| `docs` | Documentation uniquement |
| `style` | Mise en forme, CSS/LESS, indentation — sans impact fonctionnel |
| `test` | Ajout ou modification de tests |
| `perf` | Amélioration des performances |
| `ci` | Intégration continue |
| `build` | Build, webpack, npm, composer |
| `revert` | Annulation d'un commit précédent |

Aucun autre type n'est autorisé.

### Scopes courants dans ce projet

`security`, `ux`, `admin`, `bo`, `front`, `less`, `js`, `php`, `bdd`, `mails`, `upload`,
`i18n`, `captcha`, `sqldump`, `routes`, `doc`

Le scope reste libre : utiliser le nom du module, de la classe ou du fichier concerné
(ex. `refactor(sendMailStock)`, `fix(sqldump)`). L'omettre si le changement est transversal.

### Exemples valides

```
feat: ajout de la protection CSRF sur les formulaires et actions
fix(security): remplacer les redirections GET par des soumissions POST
fix: corriger le chemin du répertoire de téléchargement
refactor: simplifier la logique d'ajout des templates de mail
chore: supprimer les fonctions de cryptage et décryptage obsolètes
docs: mise à jour de la documentation sur les requêtes PDO
style: ajuster le style de la popup pour les écrans mini-laptop
```

Avec corps explicatif :

```
fix(security): déclencher l'événement submit jQuery pour injecter le jeton CSRF

Le submit natif du DOM ne déclenche pas l'événement 'submit', donc le
handler global de inc_footlinks.php n'injectait jamais le champ _csrf
et l'enregistrement des traductions échouait en 403 (csrf_check).
```

### À éviter

```
update fichiers                      ← pas de type, pas en français structuré
Fix: Corrige Le Bug.                 ← type capitalisé, description capitalisée, point final
feat(Security): add CSRF protection  ← scope capitalisé, description en anglais
divers                               ← non descriptif
```

### Commits multiples

Un commit = un changement cohérent. Ne pas mélanger un `feat` et un `fix` dans le
même commit — les séparer.

---

## Rappel des règles de code

Détail complet dans [.ai/INDEX.md](../.ai/INDEX.md) — en résumé :

- **PHP natif uniquement** — jamais de framework
- **PDO uniquement** — requêtes préparées obligatoires
- **jQuery uniquement** — jamais React, Vue, Angular ni Vanilla JS
- **LESS uniquement** — jamais de SASS
- `const` / `let` en JS — jamais `var`
- Code et commentaires en **français**
- Ne jamais éditer `dist/`, `vendor/`, `node_modules/`
- Ne jamais toucher `admin/pweditor/` ni `admin/pwfiles/`
- Dossiers préfixés `_` = dev **local** uniquement, jamais déployés
- Indentation : 4 espaces, fins de ligne `lf`, UTF-8 (voir `.editorconfig`)
