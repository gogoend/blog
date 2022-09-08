import axios, { AxiosRequestConfig } from 'axios'

const Get: () => PropertyDecorator = function() {
  return (target: AxiosRequestConfig, propKey: string | symbol) => {
    if (!target[propKey]) { target[propKey] = {} }
    Object.assign(
      target[propKey],
      {
        method: 'get'
      }
    )
  }
}
export default Get