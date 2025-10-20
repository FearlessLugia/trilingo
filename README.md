# Trilingo

A React Native mobile application of trilingual dictionary for English · French · Spanish.

Created by: Kiiro Huang (1011781957)

E-mail: kiiro.huang@mail.utoronto.ca

## Motivation

In today’s globalized world, multilingual communication has become increasingly important. Many learners are interested
in mastering multiple related languages, such as English, French, and Spanish, which share linguistic roots and
vocabulary similarities. However, most existing dictionary applications are designed for bilingual usage only, limiting
users’ ability to explore cross-language relationships.

_Trilingo_ aims to bridge this gap by providing a trilingual dictionary app that supports English, French, and Spanish
simultaneously. Users can search for a word in any of the three languages and instantly view aligned meanings, synsets,
and example usages in all supported languages. This allows learners to better understand linguistic patterns and deepen
their comparative language skills.

### Target Users

- Multilingual learners fluent in English and French who wish to expand into Spanish (or vice versa).
- Language enthusiasts interested in comparative linguistics and multilingual semantics.
- Travelers who frequently switch between multiple languages.

### Existing Solutions and Limitations

While some web-based resources (e.g., [Logos Dictionary](https://www.logos.it/)) offer multilingual search, they often
lack mobile accessibility and modern UI design. _Trilingo_ will address these limitations with a cross-platform mobile
interface and modern React Native UI.

## Objectives

The primary goal of _Trilingo_ is to create an interactive English-French-Spanish dictionary application that helps
users explore and compare meanings across languages. It enables learners to discover equivalent words and semantic
relationships in a unified trilingual view.

The mobile-end is developed in **React Native** with **Expo**, using **TypeScript** for type safety and modular design.

## Key Features

### Navigation and Screen Structure

This project uses **Expo Router** for file-based navigation. Screens are defined by their file paths, which enables
shared layouts and improves maintainability. Tabs (Search/Saved/Me) are organized using a router group (tabs), and
navigation between screens is handled through dynamic routes.

#### Main Screen / Search Screen

URL: `/(tabs)/`

Main screen contains a search bar on the top for users to input a word.

Once clicked the enter, if this word only exists in one language, it will navigate to the Word screen to display all
synsets of this word in that language. If this word exists in multiple languages, it will appear a selection drop-down
for users to choose the pivot language. After that, it will navigate to the Word screen.

The main screen also displays recently searched words below the search bar for quick access.

```text
+---------------------------------+
| animal                          |     <-- Search Bar
+---------------------------------+
| animal                    [ENG] |     <-- Drop-down for Pivot Language Selection
| animal                    [FRA] |         Each selection is pressable
| animal                    [SPA] |
+---------------------------------+
| bank                      [ENG] |     <-- Recently Searched Words
| apple                     [ENG] |         Each word is pressable
| banane                    [FRA] |
+---------------------------------+
| [Search]    [Saved]     [Me]    |     <-- Tab Bar
+---------------------------------+
```

#### Word Screen

URL: `/word/[headword]?pivot=eng|fra|spa`

Word screen shows all synsets of the searched word in different languages.

The header shows the headword and pivot language. Below the header, it shows a list of synset cards, each card displays
the synset ID, gloss, and lemmas in different languages.

Users can click on a synset card to navigate to the Synset screen to see the detail of this synset. Users can also click
on a lemma to search this word in this pivot language.

Use can also save a word to their saved list by clicking the star icon in the header. If the word is already saved, the
star will be filled, and user can click again to remove it from the saved list.

```text
+---------------------------------+
| Bank 🌟                   [ENG] |     <-- Headerword, star, and pivot language
+---------------------------------+
| bank.n.01                       |     <-- Synset ID and part of speech
| sloping land                    |     <-- Gloss in pivot language
| [bank]    [banque]  [margen]    |     <-- Lemmas in different languages (English, French, Spanish)
|           [rive]    [orilla]    |         Each lemma is pressable
|                     [vera]      |     
+---------------------------------+
| deposit.v.02                    |     <-- Another Synset card
| put into a bank account         |         Each synset card is pressable
| [deposit] [banque]  [depositar] |
| [bank]    [déposer] [ingresar]  |
+---------------------------------+
| [Search]    [Saved]     [Me]    |
+---------------------------------+
```

#### Synset Screen

URL: `/synset/[id]`

Synset screen shows the detail of a synset.

The header shows the synset ID and part of speech. Below the header, it shows the gloss, lemmas in different languages,
and example sentences in different languages.

```text
+---------------------------------+
| bank.n.01                       |     <-- Synset ID
+---------------------------------+
| sloping land                    |     <-- Gloss
+---------------------------------+
| [bank]    [banque]  [margen]    |     <-- Lemmas in different languages (English, French, Spanish)
|           [rive]    [orilla]    |         Each lemma is pressable
|                     [vera]      |     
+---------------------------------+
| they pulled the canoe up on the |     <-- Example sentences
|   bank                          |    
| he sat on the bank of the river |
|   and watched the currents      | 
+---------------------------------+
| [Search]    [Saved]     [Me]    |
+---------------------------------+
```

#### Saved Screen

URL: `/(tabs)/saved`

Saved screen shows all saved words for offline access.

A search bar in the header is also provided for users to filter in the saved list. Below the header, it shows a list of
saved word cards, each card displays the headword, pivot language, and the gloss.

```text
+---------------------------------+
| a                               |     <-- Search Bar
+---------------------------------+
| > date                          |     <-- Word list grouped by the date when they are saved
|   animal                  [ENG] |         Each word is pressable
|   animal                  [FRA] |
|   animal                  [SPA] |
| > another date                  |
|   bank                    [ENG] |
|   apple                   [ENG] |
|   banane                  [FRA] |
+---------------------------------+
| [Search]    [Saved]     [Me]    |
+---------------------------------+
```

#### Me Screen

URL: `/(tabs)/me`

Me screen displays the user profile and settings, including notification preferences and sign-out options.

#### Sign-In Screen

URL: `/sign-in`

Sign-In screen allows users to sign in with Google OAuth.

Sign-In screen will be the first screen when users open the app if they are not signed in. Once signed in, users will be
navigated to Main screen.

### State Management

For State management, the **Context API** will be used to handle global states shared across multiple screens.

For instance, the back-end response will be stored in a centralized Context state so that both the Word and Synset
screens can access the same data without issuing redundant API requests.

The Context structure also supports other global states such as authentication, saved words, and user preferences.

### User Authentication

The app supports sign-in/sign-out through Google OAuth via **Expo AuthSession**, ensuring secure and convenient access
without storing any passwords in the application.

Authentication state is maintained in a global context that records the user’s profile and token metadata. The tokens
are securely persisted using **Expo SecureStore**, which allows sessions to be restored automatically after app
restarts.

When the user signs out, all authentication data is cleared from memory and SecureStore, and the app returns
to the guest state. If the same user signs back in later, their previous session, such as saved words, will be
automatically reloaded from local storage under their account namespace.

### Saved Word List and Persistence

The saved word set is managed within a dedicated Context and asynchronously persisted per account using a namespaced key
to **React Native Async Storage** , allowing offline access and ensuring that the user’s saved entries remain available
after app restarts.

When users sign in with a Google account, their saved data is stored under an account-specific key, such as
`saved:google:<userId>`, which isolates data between users on the same device. After signing out, the saved data remains
locally stored but inaccessible to other accounts. When the same user signs in again, their personalized list is
automatically restored from local storage. This approach ensures account-level data separation and persistent offline
availability without requiring a backend database.

### Notification

The app uses **Expo Notifications** to deliver a daily reminder prompting users to review items in their Saved list.
Notifications are locally scheduled on-device at a user-selected time (default: 8:00 PM) and respect the device’s
timezone and Do Not Disturb settings.

When the user first opens Me screen, the app requests permission to send notifications; once granted, it schedules
recurring reminders that display the number of words waiting for review, such as:

```text
Time to review
12 saved words waiting
```

Tapping the notification opens the app directly into the Saved screen, with today's date section expanded for easy
access.

Notification preferences are stored in local storage and persist across sessions. The notification system operates
entirely offline, reading the saved word count from local storage without requiring a network connection or
authentication.

### Backend Integration

A lightweight back-end is implemented via Python with FastAPI to align English/French/Spanish lemmas
using [NLTK library](https://www.nltk.org/) of WordNet. For NLTK corpora
data, [Open Multilingual Wordnet (omw-1.4)](https://www.nltk.org/nltk_data/) is used.

The server exposes a single public endpoint for the mobile client and returns normalized synset records. The following
example illustrates a typical API request and response format used by the application.

#### API Endpoint

`POST /api/align`

#### Request Body

The client sends a word (query) and a pivot language (pivot).

```json
{
  "query": "bank",
  "pivot": "eng"
}
```

#### Response Body

The server returns all synsets containing that word, including:

- **id:** synset ID

- **pos:** word type (noun, verb, etc.)

- **gloss:** definition of this synset

- **lemmas:** aligned lemmas in English, French, and Spanish

- **examples:** example sentences

```json
{
  "pivot": "eng",
  "headword": "bank",
  "synsets": [
    {
      "id": "bank.n.01",
      "pos": "noun",
      "gloss": {
        "eng": "sloping land (especially the slope beside a body of water)"
      },
      "lemmas": {
        "eng": [
          "bank"
        ],
        "fra": [
          "banque",
          "rive"
        ],
        "spa": [
          "margen",
          "orilla",
          "vera"
        ]
      },
      "examples": {
        "eng": [
          "they pulled the canoe up on the bank",
          "he sat on the bank of the river and watched the currents"
        ]
      }
    },
    {
      "id": "deposit.v.02",
      "pos": "verb",
      "gloss": {
        "eng": "put into a bank account"
      },
      "lemmas": {
        "eng": [
          "deposit",
          "bank"
        ],
        "fra": [
          "banque",
          "déposer"
        ],
        "spa": [
          "depositar",
          "ingresar"
        ]
      },
      "examples": {
        "eng": [
          "She deposits her paycheck every month"
        ]
      }
    },
    {
      "id": "trust.v.01",
      "pos": "verb",
      "gloss": {
        "eng": "have confidence or faith in"
      },
      "lemmas": {
        "eng": [
          "trust",
          "swear",
          "rely",
          "bank"
        ],
        "fra": [
          "avoir_foi",
          "compter_sur",
          "faire_confiance"
        ],
        "spa": [
          "confiar"
        ]
      },
      "examples": {
        "eng": [
          "We can trust in God",
          "Rely on your friends",
          "bank on your good education",
          "I swear by my grandmother's recipes"
        ]
      }
    }
  ]
}
```

### Deployment

The React Native app will be built and deployed via **Expo EAS Build** for testing on iOS emulators and devices. A
testable build (APK, IPA, or Expo Go link) will also be provided.

Additionally, the back-end server as well as the NLTK resources will be containerized with Docker and deployed to a
cloud platform such as DigitalOcean for public access. NLTK corpora will be pre-downloaded during the build stage to
ensure the service can run without external downloads at runtime.

## Tentative Plan

### Project Plan

Below is a 5-week project plan listed in a table:

| **Week**   | **Mobile-end**                                                                                                                                 | **Misc / Back-end**                                                                                              |
|------------|------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| **Week 1** | - Set up React Native project with Expo and TypeScript <br/> - Implement navigation structure <br/> - Implement basic UI for Word screen <br/> | - Initialize FastAPI backend <br/> - Prepare NLTK and OMW 1.4 data <br/> - Basic API response test locally <br/> |
| **Week 2** | - Integrate backend API to display aligned synsets <br/> - Refine Word and Synset screens <br/> - Implement Saved screen layout  <br/>         | - Improve API format for response and error handling <br/>                                                       |
| **Week 3** | - Add Context API for shared state <br/> - Implement user authentication <br/> - Implement logic for saved word list <br/>                     | - Back-end deployment to DigitalOcean <br/>                                                                      |
| **Week 4** | - Continue working on saved word list, including state management and persistence <br/>                                                        | - Mobile-end deployment with Expo EAS Build <br/>                                                                |
| **Week 5** | - Implement daily notification feature with Expo Notifications <br/> - Polish UI/UX and transitions <br/>                                      | - Video demo recording <br/> - Documentation <br/>                                                               |

### Responsibilities for Each Team Member

Kiiro Huang: All. 