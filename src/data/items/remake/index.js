// Motion Library 重製：no 沿用原站編號，ml 用來對應原站那一招
import { defineItems } from '../define.js'
import cursor from './cursor.js'
import ui from './ui.js'
import cards from './cards.js'

export default defineItems('rm', 'remake', [...cursor, ...ui, ...cards].map((it) => ({ ...it, no: it.ml, group: 'rm' })))
