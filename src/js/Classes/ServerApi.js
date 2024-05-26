import { ajax } from 'rxjs/ajax'
import { catchError, of, interval, switchMap, forkJoin } from 'rxjs'
import { map } from 'rxjs/operators'

/**
 * This class is responsible for making API calls to the server.
 *
 * @class
 * @constructor
 * @param {string} url - The URL of the server.
 */
export default class ServerApi {
  #url

  constructor(url) {
    this.#url = url
  }

  /**
   * Creates an observable that will make an AJAX request to the server every 5 seconds.
   * @returns {Observable<any>} An observable that will make an AJAX request to the server every 5 seconds.
   */
  #createInterval() {
    return interval(5000).pipe(switchMap(() => this.#createAjax()))
  }

  #createAjax() {
    return ajax.getJSON(this.#url + '/latest').pipe(
      map((data) => JSON.parse(data.posts)),
      catchError(() => of([])),
      switchMap((posts) =>
        forkJoin(
          posts.map((post) =>
            ajax
              .getJSON(this.#url + `/${post.id}/comments/latest`)
              .pipe(map((data) => ({ post: post, comments: JSON.parse(data.comments) }))),
          ),
        ),
      ),
    )
  }

  /**
   * Starts listening for server messages.
   *
   * @param {function} listener - The listener function that will receive the server messages.
   */
  get latestPosts$() {
    return this.#createInterval()
  }

  get posts$() {
    return this.#createAjax()
  }
}
