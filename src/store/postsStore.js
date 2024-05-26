import { postsReducer } from '@/reducers/postsReducer'
import { Subject, scan, share, startWith } from 'rxjs'
import { map } from 'rxjs/operators'

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

  get posts$() {
    return this.state$.pipe(map((state) => state.posts))
  }
}

export const postsStoreInstance = new postsStore()
