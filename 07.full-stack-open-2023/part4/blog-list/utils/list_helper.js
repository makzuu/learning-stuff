const dummy = blogs => 1

const totalLikes = blogs => blogs.reduce((acc, el) => acc + el.likes, 0)

const favoriteBlog = blogs =>
    blogs
        .map(({ title, author, likes }) => ({ title, author, likes }))
        .reduce((favorite, blog) => {
            if (favorite === null)
                return blog
            if (blog.likes > favorite.likes)
                return blog
            return favorite
        }, null)

module.exports = { dummy, totalLikes, favoriteBlog }
