import BaseUI from '@/js/Classes/BaseUI'
import getElement from '@/js/getElement'
import Post from '../ui/Post/Post'
import Comment from '../ui/Comment/Comment'
import styles from './Posts.module.css'

/**
 * Class representing the Posts UI.
 * @class
 * @extends {BaseUI}
 */
export default class Posts_UI extends BaseUI {
  /**
   * Creates the main application element and appends the posts content element to it.
   *
   * @return {HTMLElement} The main application element.
   */
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

  /**
   * Renders the given posts by clearing the current posts and adding each post to the UI.
   *
   * @param {Array} posts - An array of posts to be rendered.
   * @return {void} This function does not return anything.
   */
  render(posts) {
    if (!posts.length) {
      return
    }

    this.#clear()

    posts.forEach((item) => this.#addPost(item))
  }

  /**
   * Clears the posts content element.
   *
   * @return {void} This function does not return anything.
   */
  #clear() {
    this.postsContent.innerHTML = ''
  }

  /**
   * Adds a post to the posts content element.
   *
   * @param {Object} item - The item to be added.
   * @return {void} This function does not return anything.
   */
  #addPost(item) {
    const { post, comments } = item
    const newPost = Post(post)
    this.postsContent.append(newPost)

    const commentsContainer = newPost.querySelector(`div[class^=latest-comments]`)
    this.#addComments(comments, commentsContainer)
  }

  /**
   * Adds comments to the comments container.
   *
   * @param {Array} comments - An array of comments to be added.
   * @param {HTMLElement} commentsContainer - The comments container element.
   * @return {void} This function does not return anything.
   */
  #addComments(comments, commentsContainer) {
    comments.forEach((comment) => {
      commentsContainer.append(Comment(comment))
    })
  }
}
