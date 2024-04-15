# Chirpy SDK

This SDK contains convenient utilities to interactive with [Chirpy](https://chirpy.dev).

## Key functionalities

- Query project
- Create project
- Delete project

## Install

```sh
pnpm add @chirpy-dev/sdk

yarn add @chirpy-dev/sdk

npm i -S @chirpy-dev/sdk
```

## Usage

```js
import { ChirpySDK } from '@chirpy-dev/sdk';

// Get your SDK API Key via https://chirpy.dev/dashboard/account
const sdk = new ChirpySDK(cpk_xxxxx);

const project = await sdk.getProject('acme.com');
const peak = await sdk.createProject('peak.com', 'Peak');
await sdk.deleteProject('peak.com');
```
