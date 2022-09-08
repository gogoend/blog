import axios, { AxiosRequestConfig } from 'axios'

const Axios: ClassDecorator = (target) => {
  Object.keys(target.prototype).forEach(key => {
    const rawAxiosConfig: AxiosRequestConfig = target.prototype[key]
    target.prototype[key] = () => {
      return axios(rawAxiosConfig)
    }
  })
}
export default Axios