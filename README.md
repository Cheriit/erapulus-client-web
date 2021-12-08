

# Erapulus

Frontend application for Erapulus project, made as an Engineer Thesis for Poznan University of Technology.

## Installation project
Requirements:
```
node == 14.15.5
```
Installation
```
npm install
```

## Run commands
 - `npm rum start` - runs default application (currently `management-panel`)
 - `npm run start management-panel` - runs `management-panel` application

## Build commands
- `npm run build` - builds default application (currently `management-panel`)
- `npm run build-prod` - builds default application for production (currently `management-panel`)
- `npm run build manatement-panel` - builds `management-panel` for.

## Generators
- `npx nx workspace-generator compoenent` - generates component
- `npx nx workspace-generator ui-compoenent` - generates UI component
- `npx nx workspace-generator directive` - generates directive
- `npx nx workspace-generator guard` - generates guard
- `npx nx workspace-generator interceptor` - generates interceptor
- `npx nx workspace-generator library` - generates library
- `npx nx workspace-generator module` - generates module
- `npx nx workspace-generator service` - generates service
- `npx nx workspace-generator store` - generates store

## Utils
- `npm run lint` - lints project
- `npm run test` - runs tests from the affected libraries
- `npm run e2e` - runs e2e tests from the affected libraries
