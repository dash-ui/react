# [1.1.0](https://github.com/dash-ui/react/compare/v1.0.1...v1.1.0) (2022-09-02)

### Features

- add a useCSS hook ([#13](https://github.com/dash-ui/react/issues/13)) ([5fd1ed9](https://github.com/dash-ui/react/commit/5fd1ed9790ad1828fda2bc963814713563b5f950))

## [1.0.1](https://github.com/dash-ui/react/compare/v1.0.0...v1.0.1) (2022-08-18)

### Bug Fixes

- add explicit function return types ([#12](https://github.com/dash-ui/react/issues/12)) ([6de89ee](https://github.com/dash-ui/react/commit/6de89eeddaa848a4d5bbbe39f00c72cf6b8b0a9d))

# [1.0.0](https://github.com/dash-ui/react/compare/v0.9.1...v1.0.0) (2022-06-25)

### Bug Fixes

- dont import react-dom/server directly ([c48eb5f](https://github.com/dash-ui/react/commit/c48eb5fad5d0153951e35610f027739d1b9f234d))
- fix broken tests ([0a015eb](https://github.com/dash-ui/react/commit/0a015ebe934b3d4f3b2aa1df916acdd45dd1c892))
- make server types more generalized ([874b7f8](https://github.com/dash-ui/react/commit/874b7f8593f27f33ff6789ba5bdc1575d9207483))

### Features

- allow nonce on server style tag ([92e527a](https://github.com/dash-ui/react/commit/92e527a05eb4e07423faf04b1cd0b29ce3a28b95))
- make it compatible with styles alpha ([d24e556](https://github.com/dash-ui/react/commit/d24e556d6dbf98fa402bb6bb4c37838679a95baf))
- release v1 ([5fcf22f](https://github.com/dash-ui/react/commit/5fcf22f750f6eee3137e4e2a7f11837c62c6a1eb))
- remove alpha peers ([4d99dcd](https://github.com/dash-ui/react/commit/4d99dcdeedd243428d81cf79b66640f7ea1f9f7b))
- require a styles instance as the first argument for hookks ([254bf73](https://github.com/dash-ui/react/commit/254bf73790e74c43b6a882e283cd356bb9c5c163))

### BREAKING CHANGES

- Requires that the user provide a style instance as the first argument for hooks.
  Also removes `DashProvider` and `useDash` utilities.
- Updates some types to be compatible with the latest alpha of Dash

# [1.0.0-alpha.6](https://github.com/dash-ui/react/compare/v1.0.0-alpha.5...v1.0.0-alpha.6) (2022-06-25)

### Features

- remove alpha peers ([4d99dcd](https://github.com/dash-ui/react/commit/4d99dcdeedd243428d81cf79b66640f7ea1f9f7b))

# [1.0.0-alpha.5](https://github.com/dash-ui/react/compare/v1.0.0-alpha.4...v1.0.0-alpha.5) (2021-11-07)

### Features

- allow nonce on server style tag ([92e527a](https://github.com/dash-ui/react/commit/92e527a05eb4e07423faf04b1cd0b29ce3a28b95))

# [1.0.0-alpha.4](https://github.com/dash-ui/react/compare/v1.0.0-alpha.3...v1.0.0-alpha.4) (2021-11-06)

### Bug Fixes

- dont import react-dom/server directly ([c48eb5f](https://github.com/dash-ui/react/commit/c48eb5fad5d0153951e35610f027739d1b9f234d))

# [1.0.0-alpha.3](https://github.com/dash-ui/react/compare/v1.0.0-alpha.2...v1.0.0-alpha.3) (2021-10-30)

### Bug Fixes

- make server types more generalized ([874b7f8](https://github.com/dash-ui/react/commit/874b7f8593f27f33ff6789ba5bdc1575d9207483))

# [1.0.0-alpha.2](https://github.com/dash-ui/react/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) (2021-10-29)

### Bug Fixes

- fix broken tests ([0a015eb](https://github.com/dash-ui/react/commit/0a015ebe934b3d4f3b2aa1df916acdd45dd1c892))

### Features

- require a styles instance as the first argument for hookks ([254bf73](https://github.com/dash-ui/react/commit/254bf73790e74c43b6a882e283cd356bb9c5c163))

### BREAKING CHANGES

- Requires that the user provide a style instance as the first argument for hooks.
  Also removes `DashProvider` and `useDash` utilities.

# [1.0.0-alpha.1](https://github.com/dash-ui/react/compare/v0.9.1...v1.0.0-alpha.1) (2021-10-29)

### Features

- make it compatible with styles alpha ([d24e556](https://github.com/dash-ui/react/commit/d24e556d6dbf98fa402bb6bb4c37838679a95baf))

### BREAKING CHANGES

- Updates some types to be compatible with the latest alpha of Dash

# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.9.1](https://github.com/dash-ui/react/compare/v0.9.0...v0.9.1) (2020-07-28)

### Bug Fixes

- fix DeepPartial type ([919b0b6](https://github.com/dash-ui/react/commit/919b0b6311434acf16e4c67076270f0a1de95d4f))

## [0.9.0](https://github.com/dash-ui/react/compare/v0.8.0...v0.9.0) (2020-07-27)

### ⚠ BREAKING CHANGES

- Drops support for @dash-ui/styles@<0.8.0

- rename "variables" to "tokens" ([4d84fd8](https://github.com/dash-ui/react/commit/4d84fd8e45c23cba9790348d3a8a8963ffe921c3))

## [0.8.0](https://github.com/dash-ui/react/compare/v0.7.0...v0.8.0) (2020-07-25)

### ⚠ BREAKING CHANGES

- The `dash` prop in `<DashProvider>` has been renamed to `styles` and `useDash()`
  now returns an object instead of just the styles instance

- refactor context ([cf6052a](https://github.com/dash-ui/react/commit/cf6052aa3c88a6f424b5967b2e2698e86fc12dcb))

## [0.7.0](https://github.com/dash-ui/react/compare/v0.6.1...v0.7.0) (2020-07-22)

### ⚠ BREAKING CHANGES

- Removes `useStyle()` and `useStyles()` hooks

- remove useStyle() and useStyles() hooks ([c45d458](https://github.com/dash-ui/react/commit/c45d4586bc3bf674aa7168024ec1c055ec94605a))

### [0.6.1](https://github.com/dash-ui/react/compare/v0.6.0...v0.6.1) (2020-07-22)

## [0.6.0](https://github.com/dash-ui/react/compare/v0.5.1...v0.6.0) (2020-07-16)

### ⚠ BREAKING CHANGES

- **deps-peer:** No longer compatible with @dash-ui/styles@<0.6.0

- **deps-peer:** upgrade styles to v0.6.0 ([8b573b4](https://github.com/dash-ui/react/commit/8b573b416cfb90c078d293666d0e9dcd069a72ab))

### [0.5.1](https://github.com/dash-ui/react/compare/v0.5.0...v0.5.1) (2020-07-04)

## 0.5.0 (2020-07-04)
