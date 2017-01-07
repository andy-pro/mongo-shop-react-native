export const getCategoryBySlug = (path, list) =>
  path
  .split('/')
  .map(slug => {
    let c = list.find(item => {
      let result = slug === item.slug
      if (result) {
        list = item.sub
      }
      return result
    })
    return c ? c.title : 'ERROR!---' + slug + '---'
  })
  .join(' / ')
