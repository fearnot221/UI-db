import { categories, collections } from './collections.js'
import textMotion40 from './items/text-motion-40.js'

// 新增收藏集：import 項目檔後加進這個陣列
export const items = [...textMotion40]

export { categories, collections }

export const collectionById = Object.fromEntries(collections.map((c) => [c.id, c]))
