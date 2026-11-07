// Motion Library 重製：no 沿用原站編號，ml 用來對應原站那一招
import { defineItems } from '../define.js'
import cursor from './cursor.js'

export default defineItems('rm', 'remake', [...cursor].map((it) => ({ ...it, no: it.ml, group: 'rm' })))
