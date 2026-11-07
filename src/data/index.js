import { collections } from './collections.js'
import { organize } from './taxonomy.js'
import textMotion40 from './items/text-motion-40.js'
import micro12 from './items/micro-12.js'
import loading12 from './items/loading-12.js'
import background12 from './items/background-12.js'
import scroll12 from './items/scroll-12.js'
import motionPicks from './items/motion-picks.js'
import motionLibrary from './items/motion-library.js'

// 新增收藏集：import 項目檔後加進第一個陣列
export const items = organize([...textMotion40, ...micro12, ...loading12, ...background12, ...scroll12, ...motionPicks], motionLibrary)

export { collections }
export { types, timings } from './taxonomy.js'

export const collectionById = Object.fromEntries(collections.map((c) => [c.id, c]))
