import BaseUI from '@/js/Classes/BaseUI'
import getElement from '@/js/getElement'
import styles from './Posts.module.css'

export default class Posts_UI extends BaseUI {
  createApp() {
    const app = getElement({
      element: 'div',
      classes: styles.posts,
    })

    this.postsContent = getElement({
      element: 'div',
      classes: styles.postsContent,
    })

    app.append(this.postsContent)

    return app
  }

  render(posts) {
    console.log('🚀 ~ posts:', posts)
    this.#clear()
  }

  #clear() {
    this.postsContent.innerHTML = ''
  }
}
