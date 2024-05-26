import setTitle from './setTitle'
import Posts from '@components/Posts/Posts'
import ServerApi from './Classes/ServerApi'
import { postsStoreInstance } from '@/store/postsStore'

setTitle('Posts with comments')
new Posts('body', postsStoreInstance, ServerApi, 'http://localhost:10000/posts')
