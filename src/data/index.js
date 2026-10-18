import { categories, collections } from './collections.js'
import textMotion40 from './items/text-motion-40.js'
import micro12 from './items/micro-12.js'
import loading12 from './items/loading-12.js'
import background12 from './items/background-12.js'
import scroll12 from './items/scroll-12.js'

// 新增收藏集：import 項目檔後加進這個陣列
export const items = [...textMotion40, ...micro12, ...loading12, ...background12, ...scroll12]

export { categories, collections }

export const collectionById = Object.fromEntries(collections.map((c) => [c.id, c]))
