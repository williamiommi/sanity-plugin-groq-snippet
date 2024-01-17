# Sanity Groq Snippet

<p align="center">
  <img width="50%" src="https://raw.githubusercontent.com/williamiommi/sanity-plugin-groq-snippet/main/docs/images/logo.4x.png" alt="Groq Snippet"/>
</p>

A Sanity plugin that lets you store and have quick access to frequently used or complex GROQ queries within your Sanity Studio.

- [⚡️ Features](#%EF%B8%8F-features)
- [🔌 Installation](#-installation)
- [🧑‍💻 Usage](#-usage)
- [⚙️ Plugin Configuration](#%EF%B8%8F-plugin-configuration)
- [🏷️ Manage tags](#%EF%B8%8F-manage-tags)
- [🧩 Manage snippets](#-manage-snippets)
- [▶️ Load Snippet on Vision](#-load-snippet-on-vision)
- [🗃️ Data Model](#%EF%B8%8F-data-model)
- [📝 License](#-license)
- [🧪 Develop & test](#-develop--test)

<br /><br />

## ⚡️ Features

- Sanity v3 plugin
- Store your groq queries within the Sanity Studio
- Use tags to mark your queries
- v1.1.0+: Load your snippet on Vision tool

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

The plugin introduces one new tool at the top of your Studio navigation. It uses two new documents: `groq.snippet` and `groq.snippet.tag`

<br /><br />

## ⚙️ Plugin Configuration

This is the main configuration of the plugin/tool. The available options are:

```ts
{
  // You can change the name of tool, this will affect also the path of the tool.
  name?: string
  // Customize the icon of the tool with a custom component.
  icon?: ComponentType
  // This option shows the documents used by the tool within the Structure Builder. The tool will use only published documents.
  showDocuments?: boolean
  // You can define a list of roles for which this tool is not in view only mode. The '!' operator allows you to specify the opposite condition.
  editableFor?: string[]
  // If you changed the name of the Vision tool, you need to insert the same name here. This is how the plugin recognizes the correct tool to redirect to when you want to load your snippet.
  visionToolCustomName?: string
}
```

<br /><br />

## 🏷️ Manage tags

Tags allow you to categorize your queries under a specific topics. You can manage them via the dedicated call-to-action in the top-right corner.

<p align="center">
  <img width="70%" src="https://raw.githubusercontent.com/williamiommi/sanity-plugin-groq-snippet/main/docs/images/tags-modal.jpg" alt="Tags Modal"/>
</p>

<br /><br />

## 🧩 Manage snippets

A snippet is composed by the following fields:

- **Title**: Represents the name of the snippet and is mandatory.
- **Description**: You can add a short description of your snippet. It will also be visible in the results list.
- **Tags**: You can associate multiple tags with your query. This could be useful for filtering results by a specific tag.
- **Query**: This is the other mandatory field for a snippet and contains your GROQ query.
- **Query Params**: You can also store parameters within your snippet in a JSON format.

<p align="center">
  <img width="70%" src="https://raw.githubusercontent.com/williamiommi/sanity-plugin-groq-snippet/main/docs/images/snippet-modal.jpg" alt="Tags Modal"/>
</p>

<br /><br />

## ▶️ Load Snippet on Vision

It is possible to load your snippet directly on the Vision Tool. The feature, available in the 'Edit snippet' modal, will redirect you to the installed Vision tool with your query (and parameters) preloaded.
The 'Load it on Vision' CTA will be visible only if a valid Vision tool is available.
If, for any reason, you changed the name of your Vision tool, you need to provide the same name to the `visionToolCustomName` configuration option.

<br /><br />

## 🗃️ Data model

```ts
  {
    _type: 'groq.snippet',
    title: string
    description?: string
    tags: 'groq.snippet.tag'[]
    query: text
    queryParams?: text
  }
```

```ts
  {
    _type: 'groq.snippet.tag',
    name: slug
  }
```

<br /><br />

## 📝 License

[MIT](LICENSE) © William Iommi

<br /><br />

## 🧪 Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.

### Release new version

Run ["CI & Release" workflow](https://github.com/williamiommi/sanity-plugin-i18n-fields/actions/workflows/main.yml).
Make sure to select the main branch and check "Release new version".

Semantic release will only release on configured branches, so it is safe to run release on any branch.
