import axios, { AxiosRequestConfig } from 'axios'

const Url: (url: string) => PropertyDecorator = function(url: string) {
  return (target: AxiosRequestConfig, propKey: string | symbol) => {
    if (!target[propKey]) { target[propKey] = {} }
    Object.assign(
      target[propKey],
      {
        url
      }
    )
  }
}
export default Url