import Posts_UI from './Posts_UI'
import { map } from 'rxjs/operators'

export default class Posts {
  #ui
  #store
  #serverApi

  constructor(element, store, ServerApi, url) {
    if (!store) {
      throw new Error('store is required')
    }

    if (!ServerApi) {
      throw new Error('ServerApi is required')
    }

    if (!url) {
      throw new Error('url is required')
    }

    this.#ui = new Posts_UI(element)
    this.#serverApi = new ServerApi(url)
    this.#store = store

    this.#init()
  }

  #init() {
    this.#subscribes()
  }

  #subscribes() {
    this.#store.posts$.subscribe((posts) => this.#ui.render(posts))
    this.#serverApi.latestPosts$.subscribe((posts) => this.#store.dispatch('SET_POSTS', posts))
  }
}
