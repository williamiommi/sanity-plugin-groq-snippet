# Sanity Groq Snippet

A Sanity plugin for selecting, managing, and customizing icons. Inspired by [sanity-plugin-icon-picker](https://github.com/christopherafbjur/sanity-plugin-icon-picker).\
Powered by [Iconify](https://iconify.design/)

- [⚡️ Features](#%EF%B8%8F-features)
- [🔌 Installation](#-installation)
- [🧑‍💻 Usage](#-usage)
- [⚙️ Plugin Configuration](#%EF%B8%8F-plugin-configuration)
- [📝 License](#-license)
- [🧪 Develop & test](#-develop--test)
  <br /><br />

## ⚡️ Features

- Sanity v3 plugin

<br /><br />

## 🔌 Installation

```sh
npm install sanity-plugin-groq-snippet
```

<br /><br />

## 🧑‍💻 Usage

Add it as a plugin in `sanity.config.ts` (or .js):

```ts
import {defineConfig} from 'sanity'
import {GroqSnippetPlugin} from 'sanity-plugin-groq-snippet'

export default defineConfig({
  //...
  plugins: [
    GroqSnippetPlugin({
      // your optional configuration here
    }),
  ],
  // ...
})
```

The plugin introduces one new object type called: `icon.manager`. You can define a new field with this type inside your documents.

<br /><br />

## ⚙️ Plugin Configuration

This is the main configuration of the plugin. The available options are:

```ts
{
  name?: string
  icon?: ComponentType
  showDocuments?: boolean
  editableFor?: string[]
}
```

<br /><br />

## 📝 License

[MIT](LICENSE) © William Iommi

## 🧪 Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.

### Release new version

Run ["CI & Release" workflow](https://github.com/williamiommi/sanity-plugin-i18n-fields/actions/workflows/main.yml).
Make sure to select the main branch and check "Release new version".

Semantic release will only release on configured branches, so it is safe to run release on any branch.
