
const articles = [
  { id: '1', title: 'title1', body: 'body 1' },
  { id: '2', title: 'title2', body: 'body 2' },
  { id: '3', title: 'title3', body: 'body 3' }
]

const libraries = [
  {
    branch: 'downtown'
  },
  {
    branch: 'riverside'
  }
]
const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
    branch: 'riverside'
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
    branch: 'downtown'
  }
]

module.exports = {
  books,
  articles,
  libraries
}
