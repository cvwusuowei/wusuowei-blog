import axios from 'axios'
import { app } from '@/main'

axios.interceptors.request.use((config: any) => {
  config.headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('token')
  return config
})

axios.interceptors.response.use(
  (response) => {
    switch (response.data.code) {
      case 50000:
        app.config.globalProperties.$notify({
          title: 'Error',
          message: '系统异常,请联系管理员',
          type: 'error'
        })
        break
      case 40001:
        app.config.globalProperties.$notify({
          title: 'Error',
          message: '用户未登录',
          type: 'error'
        })
        break
    }
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default {
  getTopAndFeaturedArticles: () => {
    return axios.get('/api/articles/topAndFeatured')
  },
  //获取文章
  getArticles: (params: any) => {
    return axios.get('/api/articles/all', { params: params })
  },
  //通过类型获取文章
  getArticlesByCategoryId: (params: any) => {
    return axios.get('/api/articles/categoryId', { params: params })
  },
  //通过Id获取文章
  getArticeById: (articleId: any) => {
    return axios.get('/api/articles/' + articleId)
  },
  //获取所有文章类别
  getAllCategories: () => {
    return axios.get('/api/categories/all')
  },
  //获取所有标签
  getAllTags: () => {
    return axios.get('/api/tags/all')
  },
  //获取前十条标签
  getTopTenTags: () => {
    return axios.get('/api/tags/topTen')
  },
  //通过标签Id获取文章
  getArticlesByTagId: (params: any) => {
    return axios.get('/api/articles/tagId', { params: params })
  },

  //获取所有归档
  getAllArchives: (params: any) => {
    return axios.get('/api/archives/all', { params: params })
  },
  //登录
  login: (params: any) => {
    return axios.post('/api/users/login', params)
  },
  //保存用户评论
  saveComment: (params: any) => {
    return axios.post('/api/comments/save', params)
  },
  //保存GPT评论
  saveCommentGPT: (params: any) => {
    return axios.post('/api/commentsGPT/save', params)
  },
  //获取评论
  getComments: (params: any) => {
    return axios.get('/api/comments', { params: params })
  },
  //获取前六条评论
  getTopSixComments: () => {
    return axios.get('/api/comments/topSix')
  },
  //获取关于
  getAbout: () => {
    return axios.get('/api/about')
  },
  //获取友链
  getFriendLink: () => {
    return axios.get('/api/links')
  },
  //提交用户输入
  submitUserInfo: (params: any) => {
    return axios.put('/api/users/info', params)
  },
  //通过Id获取用户输入
  getUserInfoById: (id: any) => {
    return axios.get('/api/users/info/' + id)
  },
  //更新用户订阅
  updateUserSubscribe: (params: any) => {
    return axios.put('/api/users/subscribe', params)
  },
  //发送验证码
  sendValidationCode: (username: any) => {
    return axios.get('/api/users/code', {
      params: {
        username: username
      }
    })
  },
  //绑定邮箱
  bindingEmail: (params: any) => {
    return axios.put('/api/users/email', params)
  },
  //注册
  register: (params: any) => {
    return axios.post('/api/users/register', params)
  },
  //搜索文章
  searchArticles: (params: any) => {
    return axios.get('/api/articles/search', {
      params: params
    })
  },
  //获取相册
  getAlbums: () => {
    return axios.get('/api/photos/albums')
  },
  //通过相册Id获取照片
  getPhotosByAlbumId: (albumId: any, params: any) => {
    return axios.get('/api/albums/' + albumId + '/photos', {
      params: params
    })
  },
  
  // 获取网络配置
  getWebsiteConfig: () => {
    return axios.get('/api')
  },
  //qq登录
  qqLogin: (params: any) => {
    return axios.post('/api/users/oauth/qq', params)
  },
  report: () => {
    axios.post('/api/report')
  },
  //获取说说
  getTalks: (params: any) => {
    return axios.get('/api/talks', {
      params: params
    })
  },
  //通过Id获取说说
  getTalkById: (id: any) => {
    return axios.get('/api/talks/' + id)
  },
  //退出登录
  logout: () => {
    return axios.post('/api/users/logout')
  },
  //通过评论Id获取回复
  getRepliesByCommentId: (commentId: any) => {
    return axios.get(`/api/comments/${commentId}/replies`)
  },
  //修改密码
  updatePassword: (params: any) => {
    return axios.put('/api/users/password', params)
  },
  //文章权限
  accessArticle: (params: any) => {
    return axios.post('/api/articles/access', params)
  }
}
