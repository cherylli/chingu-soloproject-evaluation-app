# Changelog

## [1.13.0](https://github.com/chingu-x/chingu-soloproject-evaluation-app/compare/v1.12.0...v1.13.0) (2025-09-24)


### Features

* [SPA-48] Add new links page ([699f9dd](https://github.com/chingu-x/chingu-soloproject-evaluation-app/commit/699f9ddcc87aeb381e3aa48acba0a8ab2bcb2465))
* [SPA-53] Add button to directly send the pass message to ring the bell ([b104eb9](https://github.com/chingu-x/chingu-soloproject-evaluation-app/commit/b104eb9740a408719405e8c87cf2fdad680a0f81))


### Bug Fixes

* [SPA-59] remove blocking error on solo project page if past project failed to fetch ([3e211b7](https://github.com/chingu-x/chingu-soloproject-evaluation-app/commit/3e211b7b5c77720958390cb8b19ba762eae20b3c))

## [1.12.0](https://github.com/chingu-x/chingu-soloproject-evaluation-app/compare/v1.11.0...v1.12.0) (2025-09-19)


### Features

* [SPA-22] (solo-project) add URL parser utility and apply for external links across solo project details ([ad09733](https://github.com/chingu-x/chingu-soloproject-evaluation-app/commit/ad09733e9507386fb9f1db2f748a6023a3fb501b))
* **admin-ui:** add reusable components for error and no-record states, refactor member details and check-in flows ([3292254](https://github.com/chingu-x/chingu-soloproject-evaluation-app/commit/3292254175449208e594a36f995594342f488f76))
* **memberProfile:** Complete Solo project table ([ef63366](https://github.com/chingu-x/chingu-soloproject-evaluation-app/commit/ef63366a4aaaf6af37d7a93dda81a870422edb46))


### Bug Fixes

* [SPA-50] (solo project) fix compact list not fetching all solo projects ([647e927](https://github.com/chingu-x/chingu-soloproject-evaluation-app/commit/647e9272f11d0401e35c676a9f6d35a1422f5d61))
* [SPA-52](voyage signup) fix voyage team github url ([538d01a](https://github.com/chingu-x/chingu-soloproject-evaluation-app/commit/538d01a2c4e7c607890bee2bbed0ba70a9f28786))

## [1.11.0](https://github.com/chingu-x/chingu-soloproject-evaluation-app/compare/v1.10.0...v1.11.0) (2025-08-18)


### Features

* **member-profile:** introduce `MemberProfile` component, refactor `MemberDetails`, and add column visibility options for voyage signups ([2640874](https://github.com/chingu-x/chingu-soloproject-evaluation-app/commit/2640874f695d86e5b38e3dca856d4caf85de3eea))
* **voyage-signups:** add `HoverCardCell` for status and info columns, update sorting and column definitions ([af1ec19](https://github.com/chingu-x/chingu-soloproject-evaluation-app/commit/af1ec190de21ab9449804dce83ed58b69d8e7982))
* **voyage-signups:** add `TooltipWithLink` component and integrate tooltip-enhanced voyage links in column definitions ([d107b40](https://github.com/chingu-x/chingu-soloproject-evaluation-app/commit/d107b401fa7fa60b2b0cbb8f5a3ee93bf6f145ff))
* **voyage-status:** add `VoyageStatus` component and color mappings, update column definitions for voyage signups ([7b015e3](https://github.com/chingu-x/chingu-soloproject-evaluation-app/commit/7b015e3b6c69defd88350c17cadce70b8498b58f))
* **voyage-teams:** add `VoyageTeamPage` and tooltip-enhanced column definitions with dynamic team links ([fed905b](https://github.com/chingu-x/chingu-soloproject-evaluation-app/commit/fed905b678203b6907a1f1954bab5e79e53e6c57))

## [1.10.0](https://github.com/cherylli/chingu-soloproject-evaluation-app/compare/v1.9.0...v1.10.0) (2025-08-11)

### Features

- **ui:** add `AirtableLinkButton` and `AirtableLinkButton`, integrate into admin pages and components ([5578893](https://github.com/cherylli/chingu-soloproject-evaluation-app/commit/55788935868916252af3786302341606a01907b5))
- add Voyage Schedule page which links to each voyage (signups) ([371c5fe](https://github.com/cherylli/chingu-soloproject-evaluation-app/commit/371c5fe3b0278d51de0e781e93dd25e3e6b0f814))

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
