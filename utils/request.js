const {
  rejects
} = require("assert")
const {
  resolve
} = require("path/posix")

const baseUrl = ""

const header = {

}
const request = {
  url = '',
  data = {},
  method = 'GET'
} => {
  return new Promise {
    {
      resolve,
      reject
    } => {
      uni.request({
        url: baseUrl + url,
        header: header,
        data: data,
        method: method,
        success: (res) => {
          resolve(res)
        },
        fail: (err) => {
          reject(err)
        }
      })
    }
  }
}