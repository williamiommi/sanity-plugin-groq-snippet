// code taken from sanity vision plugin https://github.com/sanity-io/sanity/blob/next/packages/%40sanity/vision/src/codemirror/extensions.ts
import {closeBrackets} from '@codemirror/autocomplete'
import {defaultKeymap, history, historyKeymap} from '@codemirror/commands'
import {javascriptLanguage} from '@codemirror/lang-javascript'
import {
  bracketMatching,
  defaultHighlightStyle,
  indentOnInput,
  syntaxHighlighting,
} from '@codemirror/language'
import {highlightSelectionMatches} from '@codemirror/search'
import {
  drawSelection,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  keymap,
  lineNumbers,
} from '@codemirror/view'

export const codemirrorExtensions = [
  [javascriptLanguage],
  lineNumbers(),
  highlightActiveLine(),
  highlightActiveLineGutter(),
  highlightSelectionMatches(),
  highlightSpecialChars(),
  indentOnInput(),
  bracketMatching(),
  closeBrackets(),
  history(),
  drawSelection(),
  syntaxHighlighting(defaultHighlightStyle, {fallback: true}),
  keymap.of([defaultKeymap, historyKeymap].flat().filter(Boolean)),
]
