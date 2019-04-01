/**
 * 上传类工具方法
 */

/**
 * 上传图片
 */
export function uploadImg(event) {
  let postfix = event.postfix
  let name = `${+new Date()}${postfix}`
  let img = event.img
  let destPath = event.destPath
  return new Promise((resolve, reject) => {
    wx.cloud.uploadFile({
      cloudPath: `${destPath}/${name}`,
      filePath: img,
      success: res => {
        resolve(res.fileID)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}