// Motion Library 重製：no 沿用原站編號，ml 用來對應原站那一招
import { defineItems } from '../define.js'
import cursor from './cursor.js'
import ui from './ui.js'
import cards from './cards.js'
import visual from './visual.js'
import layout from './layout.js'
import text from './text.js'

export default defineItems('rm', 'remake', [...cursor, ...ui, ...cards, ...visual, ...layout, ...text].map((it) => ({ ...it, no: it.ml, group: 'rm' })))
