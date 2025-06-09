const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  const reducer = (a, el) => a + el.likes
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) return

  const reducer = (acc, blog, index) => {
    if (typeof acc.likes === 'undefined' || blog.likes > acc.likes) return blog
    return acc
  }

  return blogs.map(({ title, author, likes }) => (
    { title, author, likes })
  )
    .reduce(reducer)
}

const mostBlogs = blogs => {
  const blogsCount = {}
  let authorWithMostBlogs

  blogs.forEach(blog => {
    if (!blogsCount[blog.author]) {
      blogsCount[blog.author] = 1
    } else {
      blogsCount[blog.author] += 1
    }

    if (!authorWithMostBlogs) {
      authorWithMostBlogs = {
        author: blog.author,
        blogs: blogsCount[blog.author]
      }
      return authorWithMostBlogs
    }

    if (blogsCount[blog.author] > authorWithMostBlogs.blogs) {
      authorWithMostBlogs = {
        author: blog.author,
        blogs: blogsCount[blog.author]
      }
    }
  })

  return authorWithMostBlogs
}

const mostLikes = blogs => {
  const likesCount = {}
  let authorWithMostLikes

  blogs.forEach(blog => {
    if (typeof likesCount[blog.author] === 'undefined') {
      likesCount[blog.author] = blog.likes
    } else {
      likesCount[blog.author] += blog.likes
    }

    if (!authorWithMostLikes) {
      authorWithMostLikes = {
        author: blog.author,
        likes: likesCount[blog.author]
      }
      return authorWithMostLikes
    }

    if (likesCount[blog.author] > authorWithMostLikes.likes) {
      authorWithMostLikes = {
        author: blog.author,
        likes: likesCount[blog.author]
      }
    }
  })

  return authorWithMostLikes
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
