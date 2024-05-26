import Posts_UI from './Posts_UI'

/**
 * Class representing a posts component.
 *
 * @class
 * @property {Posts_UI} #ui - The UI instance.
 * @property {postsStore} #store - The store instance.
 * @property {ServerApi} #serverApi - The server API instance.
 */
export default class Posts {
  #ui
  #store
  #serverApi

  /**
   * Constructor.
   *
   * @param {Element} element - The element where the component will be rendered.
   * @param {postsStore} store - The store instance.
   * @param {ServerApi} ServerApi - The server API instance.
   * @param {string} url - The URL of the server.
   */
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

  /**
   * Initializes the component.
   */
  #init() {
    this.#subscribes()
  }

  /**
   * Subscribes to the necessary streams.
   */
  #subscribes() {
    this.#store.posts$.subscribe((posts) => this.#ui.render(posts))
    this.#serverApi.posts$.subscribe((posts) => this.#store.dispatch('SET_POSTS', posts))
    this.#serverApi.latestPosts$.subscribe((posts) => this.#store.dispatch('SET_POSTS', posts))
  }
}
