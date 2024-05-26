import moment from 'moment'
import getElement from '@/js/getElement'
import styles from './Comment.module.css'

export const Comment = ({ id, author, avatar, content, created }) => {
  const commentElement = getElement({
    tag: 'div',
    classes: styles.comment,
    data: { id },
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

  const contentElement = getElement({
    tag: 'div',
    classes: styles.content,
    textContent: content,
  })

  authorWrapper.append(authorElement, contentElement)
  commentElement.append(avatarElement, authorWrapper, createdElement)

  return commentElement
}

export default Comment
