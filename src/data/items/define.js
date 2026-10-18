// 補上 id / collection / demo key：demo key 由英文名轉成 kebab-case
export const defineItems = (prefix, collection, list) =>
  list.map((item) => ({
    ...item,
    id: `${prefix}-${String(item.no).padStart(2, '0')}`,
    collection,
    demo: item.en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
  }))
