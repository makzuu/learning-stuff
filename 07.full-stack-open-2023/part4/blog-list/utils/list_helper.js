const dummy = blogs => 1

const totalLikes = blogs => blogs.reduce((acc, el) => acc + el.likes, 0)

const favoriteBlog = blogs => (
    blogs
        .map(({ title, author, likes }) => ({ title, author, likes }))
        .reduce((favorite, blog) => {
            if (favorite === null)
                return blog
            if (blog.likes > favorite.likes)
                return blog
            return favorite
        }, null)
)

// TODO: use lodash to do this more compact and readable
// or just write better code xd
const mostBlogs = blogs => {
    if (blogs.length === 0) return null

    const seenAuthors = []

    return blogs
        .map(({ author }) => ({ author, blogs: 1 }))
        .filter((author, index, authors) => {
            if (seenAuthors.includes(author.author)) {
                const target = authors.find(ael => ael.author === author.author)
                target.blogs++
                return false
            }
            seenAuthors.push(author.author)
            return true
        }).reduce((mostBlogs, author) => {
            if (author.blogs > mostBlogs.blogs)
                return author
            return mostBlogs
        })
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }
