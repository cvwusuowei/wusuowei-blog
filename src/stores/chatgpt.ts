import { defineStore } from 'pinia'


export const useChatGptStore = defineStore('chatGptStore', {
    state: () => {
      return {
        recentComment: '' as any,
        type: '' as any
      }
    },
    actions: {}
  })
  