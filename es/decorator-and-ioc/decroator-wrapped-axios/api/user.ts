import { AxiosResponse } from 'axios'
import Axios from '../decorators/Axios'
import Get from '../decorators/Get'
import Url from '../decorators/Url'

@Axios
export default class UserApi {
  @Get()
  @Url('https://api.github.com/users/gogoend')
  getUserInfo!: () => Promise<AxiosResponse<Record<string, any>>>
}