// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({env:'animal-4gkv8qdn7b4aac40'})

// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
  return db.collection(event.name).get()
}