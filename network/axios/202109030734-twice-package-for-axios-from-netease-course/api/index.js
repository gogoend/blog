import login from './login.js'
import biz from './biz.js'

import myServer from '../request/get-request.js'

myServer.parseRouter('login', login)
myServer.parseRouter('biz', biz)

export default myServer