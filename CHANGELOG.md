# [4.0.0-beta.2](https://github.com/ArtemKlyuev/esbuild-plugin-d-ts-path-alias/compare/v4.0.0-beta.1...v4.0.0-beta.2) (2023-05-01)


### Bug Fixes

* `postinstall script` ([9fae936](https://github.com/ArtemKlyuev/esbuild-plugin-d-ts-path-alias/commit/9fae9367c1b65e95539ad17980ad10cf7dbfb4a5))

# [4.0.0-beta.1](https://github.com/ArtemKlyuev/esbuild-plugin-d-ts-path-alias/compare/v3.0.0...v4.0.0-beta.1) (2023-05-01)


### Bug Fixes

* `changelog` typo ([7822660](https://github.com/ArtemKlyuev/esbuild-plugin-d-ts-path-alias/commit/7822660d75cfffef8a293f514b546573364084c9))


### Features

* add `exports` field to `package.json` ([1197054](https://github.com/ArtemKlyuev/esbuild-plugin-d-ts-path-alias/commit/11970546811e18faf1f62c83fc089c0295b1c9d3))
* set `"type": "module"` for package ([fd53b41](https://github.com/ArtemKlyuev/esbuild-plugin-d-ts-path-alias/commit/fd53b41e929249da08d6de924553b62473afa02e))


### BREAKING CHANGES

* remove `main`, `module`, `typings` fields from `package.json`

# [3.0.0](https://github.com/ArtemKlyuev/esbuild-plugin-d-ts-path-alias/compare/v2.0.0...v3.0.0) (2023-04-30)


### breaking

* update dependencies ([c56c559](https://github.com/ArtemKlyuev/esbuild-plugin-d-ts-path-alias/commit/c56c5595e2bce29cab098a5d6607a51aa8369baa))


### BREAKING CHANGES

- update required `typescript version` to `>=5`
- update required `esbuild` version to `^0.17.0`
- update required `nodejs` version to `>=16.10.0`

# [2.0.0](https://github.com/ArtemKlyuev/esbuild-plugin-d-ts-path-alias/compare/v1.1.0...v2.0.0) (2022-09-09)


### Bug Fixes

* restrict maximum `typescript` version as less than `4.8` ([97e0c0f](https://github.com/ArtemKlyuev/esbuild-plugin-d-ts-path-alias/commit/97e0c0fefe115545a41f5c2ed2159fbc97919eea))


### BREAKING CHANGES

* maximum `typescript` version should not be `4.8` or higher

# [1.1.0](https://github.com/ArtemKlyuev/esbuild-plugin-d-ts-path-alias/compare/v1.0.1...v1.1.0) (2022-08-18)


### Features

* add additional info in debug logs, set `noEmit` to `false` ([0268fe6](https://github.com/ArtemKlyuev/esbuild-plugin-d-ts-path-alias/commit/0268fe61b4ce92d91e409fccdf231eb430e93967))
* add logger `success` method ([800dc91](https://github.com/ArtemKlyuev/esbuild-plugin-d-ts-path-alias/commit/800dc910ced058e676d70d11f893449c0832963c))

## [1.0.1](https://github.com/ArtemKlyuev/esbuild-plugin-d-ts-path-alias/compare/v1.0.0...v1.0.1) (2022-08-18)


### Bug Fixes

* empty build in npm registry ([c0671e9](https://github.com/ArtemKlyuev/esbuild-plugin-d-ts-path-alias/commit/c0671e96b32332b868b117749eafcf645d3b9ff7))

# 1.0.0 (2022-08-17)


### Bug Fixes

* add proper `searchPath` ([9b6c87a](https://github.com/ArtemKlyuev/esbuild-plugin-d-ts-path-alias/commit/9b6c87a3ecfa06564f56858688bb3384d9fe4643))
* display debug logs ([5579f80](https://github.com/ArtemKlyuev/esbuild-plugin-d-ts-path-alias/commit/5579f80f556deb2ce351e1173efe3703cd1d7659))
* typecheck error ([483f785](https://github.com/ArtemKlyuev/esbuild-plugin-d-ts-path-alias/commit/483f785b467ebea2f8f310854c1831c21c94247b))


### Features

* add typescript utilities ([d19c363](https://github.com/ArtemKlyuev/esbuild-plugin-d-ts-path-alias/commit/d19c3637bca22e545249af8c4705dedd59b0d93f))
* add utils ([c395317](https://github.com/ArtemKlyuev/esbuild-plugin-d-ts-path-alias/commit/c395317f281ead9ce9307c7e6ab8acc99ea7d620))
* plugin ([e22f57b](https://github.com/ArtemKlyuev/esbuild-plugin-d-ts-path-alias/commit/e22f57b4cc01c9a3475327d8fca7bb32b39ac093))
