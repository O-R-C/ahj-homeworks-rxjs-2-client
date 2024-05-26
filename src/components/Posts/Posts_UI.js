import BaseUI from '@/js/Classes/BaseUI'
import getElement from '@/js/getElement'
import Post from '../ui/Post/Post'
import Comment from '../ui/Comment/Comment'
import styles from './Posts.module.css'

export default class Posts_UI extends BaseUI {
  createApp() {
    const app = getElement({
      tag: 'div',
      classes: styles.posts,
    })

    this.postsContent = getElement({
      tag: 'div',
      classes: styles.postsContent,
    })

    app.append(this.postsContent)

    return app
  }

  render(posts) {
    if (!posts.length) {
      return
    }

    this.#clear()

    posts.forEach((item) => this.#addPost(item))
  }

  #clear() {
    this.postsContent.innerHTML = ''
  }

  #addPost(item) {
    const { post, comments } = item
    const newPost = Post(post)
    this.postsContent.append(newPost)

    const commentsContainer = newPost.querySelector(`div[class^=latest-comments]`)

    comments[0].forEach((comment) => {
      commentsContainer.append(Comment(comment))
    })
  }
}
