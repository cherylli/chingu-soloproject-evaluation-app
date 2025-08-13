# Changelog

## [1.10.0](https://github.com/cherylli/chingu-soloproject-evaluation-app/compare/v1.9.0...v1.10.0) (2025-08-11)


### Features

* **ui:** add `AirtableLinkButton` and `BackButton`, integrate into admin pages and components ([5578893](https://github.com/cherylli/chingu-soloproject-evaluation-app/commit/55788935868916252af3786302341606a01907b5))
* add Voyage Schedule page which links to each voyage (signups) ([371c5fe](https://github.com/cherylli/chingu-soloproject-evaluation-app/commit/371c5fe3b0278d51de0e781e93dd25e3e6b0f814))

## [1.9.0](https://github.com/cherylli/chingu-soloproject-evaluation-app/compare/v1.8.0...v1.9.0) (2025-08-09)

### Features

- **admin/voyage-signups:** enhance soloProjectTable with GitHub links, status indicator, and role coloring ([7d373c6](https://github.com/cherylli/chingu-soloproject-evaluation-app/commit/7d373c63732ed4ec6d29aeac99a122dcfc3a6e3d))

## [1.8.0](https://github.com/cherylli/chingu-soloproject-evaluation-app/compare/v1.7.0...v1.8.0) (2025-08-04)

### Features

- **solo-projects:** add admin-only Airtable link and role-check hook ([1194e3e](https://github.com/cherylli/chingu-soloproject-evaluation-app/commit/1194e3e82da93252ab2bedef0892c0f633c5b38a))
- **solo-projects:** add Airtable link column and support base URL in SoloProjectTable ([4e69047](https://github.com/cherylli/chingu-soloproject-evaluation-app/commit/4e69047f55fe3a886266b9e2de3472f93c19b601))

## [1.7.0](https://github.com/cherylli/chingu-soloproject-evaluation-app/compare/v1.6.0...v1.7.0) (2025-08-01)

### Features

- **admin/solo-projects:** force dynamic rendering on TierMismatch page ([791223f](https://github.com/cherylli/chingu-soloproject-evaluation-app/commit/791223fbca3531e93bf9c53126afc1a8e3683644))

## [1.6.0](https://github.com/cherylli/chingu-soloproject-evaluation-app/compare/v1.5.0...v1.6.0) (2025-07-31)

### Miscellaneous Chores

- release 1.6.0 ([e70ef94](https://github.com/cherylli/chingu-soloproject-evaluation-app/commit/e70ef94e79f32ef8b00ca224e2a53b48a9268cc0))

## [1.5.0](https://github.com/cherylli/chingu-soloproject-evaluation-app/compare/v1.4.0...v1.5.0) (2025-07-17)

### Features

- add solo project tier suggestion and admin interface ([#65](https://github.com/cherylli/chingu-soloproject-evaluation-app/issues/65)) ([ab8b4ab](https://github.com/cherylli/chingu-soloproject-evaluation-app/commit/ab8b4ab069877c91498774fa6477c73acbe12a1b))

## [1.4.0](https://github.com/cherylli/chingu-soloproject-evaluation-app/compare/v1.3.0...v1.4.0) (2025-07-09)

### Features

- add auto refresh to solo project page ([f8c3438](https://github.com/cherylli/chingu-soloproject-evaluation-app/commit/f8c3438b755c18fce7183b5d39b21bfe5929a971))

## [1.3.0](https://github.com/cherylli/chingu-soloproject-evaluation-app/compare/v1.2.0...v1.3.0) (2025-06-10)

### Features

- add last login ([13e411f](https://github.com/cherylli/chingu-soloproject-evaluation-app/commit/13e411f849341657e824d6fed36f38f43208c0b6))

## [1.2.0](https://github.com/cherylli/chingu-soloproject-evaluation-app/compare/v1.1.2...v1.2.0) (2025-04-26)

### Features

- upgrade Next.js to v15 and React to v19, add resizable component, and fix UI issues ([c557bae](https://github.com/cherylli/chingu-soloproject-evaluation-app/commit/c557bae18daf94e8573729b6f5c82eaaf0912319))

## [1.1.2](https://github.com/cherylli/chingu-soloproject-evaluation-app/compare/v1.1.1...v1.1.2) (2025-04-12)

### Features

- admin voyage checkin ([#54](https://github.com/cherylli/chingu-soloproject-evaluation-app/issues/54)) ([dc99213](https://github.com/cherylli/chingu-soloproject-evaluation-app/commit/dc99213b57d42859c8ba500029954e7edce824e7))

## [1.1.1](https://github.com/cherylli/chingu-soloproject-evaluation-app/compare/v1.1.0...v1.1.1) (2025-03-15)

### Features

- {auth) update app to deny inactive users ([#44](https://github.com/cherylli/chingu-soloproject-evaluation-app/issues/44)) ([23e725b](https://github.com/cherylli/chingu-soloproject-evaluation-app/commit/23e725bbc0b3968376e7a2d72877a39795288956))

## [1.1.0](https://github.com/cherylli/chingu-soloproject-evaluation-app/compare/v1.0.0...v1.1.0) (2025-03-07)

### Features

- **FetchProjects.tsx:** create FetchProjects component to handle project fetching and display logic ([59f8eb6](https://github.com/cherylli/chingu-soloproject-evaluation-app/commit/59f8eb62dfba9e278fe4180b3410a8ea5c80ecdd))
- **layout.tsx:** wrap children in a main tag for better semantic structure ([21cc0de](https://github.com/cherylli/chingu-soloproject-evaluation-app/commit/21cc0de79e885da25912b98f7265b48565be4c9e))
- **List.tsx:** add ProjectSubmissionListSkeleton for loading state representation while fetching projects ([59f8eb6](https://github.com/cherylli/chingu-soloproject-evaluation-app/commit/59f8eb62dfba9e278fe4180b3410a8ea5c80ecdd))
- **page.tsx:** add aria-labels to links for improved accessibility and screen reader support ([21cc0de](https://github.com/cherylli/chingu-soloproject-evaluation-app/commit/21cc0de79e885da25912b98f7265b48565be4c9e))
- **page.tsx:** refactor project submission display to use FetchProjects component for better code organization and reusability ([59f8eb6](https://github.com/cherylli/chingu-soloproject-evaluation-app/commit/59f8eb62dfba9e278fe4180b3410a8ea5c80ecdd))
- **skeleton.tsx:** implement Skeleton component for loading placeholders in the UI ([59f8eb6](https://github.com/cherylli/chingu-soloproject-evaluation-app/commit/59f8eb62dfba9e278fe4180b3410a8ea5c80ecdd))
