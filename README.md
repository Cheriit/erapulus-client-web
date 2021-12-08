

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
- `npx workspace-generators compoenent` - generates component
- `npx workspace-generators directive` - generates directive
- `npx workspace-generators guard` - generates guard
- `npx workspace-generators interceptor` - generates interceptor
- `npx workspace-generators library` - generates library
- `npx workspace-generators module` - generates module
- `npx workspace-generators service` - generates service
- `npx workspace-generators store` - generates store

## Utils
- `npm run lint` - lints project
- `npm run test` - runs tests from the affected libraries
- `npm run e2e` - runs e2e tests from the affected libraries
