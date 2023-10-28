[![CI](https://github.com/kaisergeX/fptlibrary/actions/workflows/ci.yml/badge.svg)](https://github.com/kaisergeX/fptlibrary/actions/workflows/ci.yml)

# F3 Library

[![React](https://img.shields.io/badge/React-000?style=for-the-badge&logo=react&logoColor=fff)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-fff?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Mantine](https://img.shields.io/badge/Mantine-000?style=for-the-badge&logo=mantine&logoColor=fff)](https://mantine.dev/)

## Engines Requirements

`node@18.0.0` or later

`pnpm@6.34.0` or later

## Environment Variables

Generate env file.

```bash
cp .env-example .env
```

## Installation

```bash
pnpm i
```

## Development server

```bash
pnpm dev
```

## Coding convention

Check lint and format.

```bash
pnpm lint
```

To fix all "auto-fixable" issues.

```bash
pnpm lint--fix
```

## Build

<sup>
By default, this command will apply environment variables from .env and exec. build for production.
The build artifacts will be stored in the dist/ directory.
</sup>

```bash
pnpm build
```

Preview lastest build on local.

```bash
pnpm preview
```
