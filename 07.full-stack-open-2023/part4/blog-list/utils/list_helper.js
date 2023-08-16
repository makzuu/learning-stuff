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

    const mostBlogs = { author: '', blogs: 0 }
    const authors = {}

    blogs.forEach(({ author }) => {
        if (authors[author] === undefined)
            authors[author] = 1
        else authors[author]++
    })

    for (const author in authors) {
        if (mostBlogs.author === '') {
            mostBlogs.author = author
            mostBlogs.blogs = authors[author]
        } else {
            if (authors[author] > mostBlogs.blogs) {
                mostBlogs.author = author
                mostBlogs.blogs = authors[author]
            }
        }
    }

    return mostBlogs
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }
