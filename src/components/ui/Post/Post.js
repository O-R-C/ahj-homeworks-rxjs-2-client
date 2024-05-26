import moment from 'moment'
import getElement from '@/js/getElement'
import styles from './Post.module.css'

/**
 * Creates a post element with the given title, author, avatar, image, and creation date.
 *
 * @param {Object} props - The properties of the post.
 * @param {string} props.id - The ID of the post.
 * @param {string} props.title - The title of the post.
 * @param {string} props.author - The author of the post.
 * @param {string} props.avatar - The URL of the author's avatar.
 * @param {string} props.image - The URL of the post's image.
 * @param {Date} props.created - The creation date of the post.
 * @return {HTMLElement} The post element.
 */
export const Post = ({ id, title, author, avatar, image, created }) => {
  const postElement = getElement({
    tag: 'div',
    classes: styles.post,
    data: { id },
  })

  const postContent = getElement({
    tag: 'div',
    classes: styles.postContent,
  })

  const authorWrapper = getElement({
    tag: 'div',
    classes: styles.authorWrapper,
  })

  const avatarElement = getElement({
    tag: 'img',
    classes: styles.avatar,
    src: avatar,
    alt: author,
  })

  const authorElement = getElement({
    tag: 'div',
    classes: styles.author,
    textContent: author,
  })

  const createdElement = getElement({
    tag: 'div',
    classes: styles.created,
    textContent: moment(created).format('HH:mm DD.MM.YYYY'),
  })

  const imageElement = getElement({
    tag: 'img',
    classes: styles.image,
    src: image,
    alt: title,
  })

  const latestCommentsElement = getElement({
    tag: 'div',
    classes: styles.latestComments,
    textContent: 'Latest comments',
  })

  authorWrapper.append(authorElement, createdElement)
  postContent.append(avatarElement, authorWrapper)
  postElement.append(postContent, imageElement, latestCommentsElement)

  return postElement
}

export default Post
