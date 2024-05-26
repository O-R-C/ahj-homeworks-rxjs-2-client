import { postsReducer } from '@/reducers/postsReducer'
import { Subject, scan, share, startWith } from 'rxjs'

/**
 * Class representing a posts store.
 *
 * @class
 * @property {Subject} actions$ - the actions subject.
 * @property {Observable} state$ - the state observable.
 */
export default class postsStore {
  constructor() {
    this.actions$ = new Subject()
    this.state$ = this.actions$.asObservable().pipe(
      startWith({
        type: 'INIT',
      }),
      scan((state, action) => postsReducer(state, action), { posts: [] }),
      share(),
    )
  }

  /**
   * Dispatches an action with a payload.
   *
   * @param {string} action - the action type.
   * @param {Object} payload - the action payload.
   */
  dispatch = (action, payload = null) => this.actions$.next({ type: action, payload })
}

export const postsStoreInstance = new postsStore()
