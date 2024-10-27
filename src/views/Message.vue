<template>
  <div>
    <Breadcrumb :current="t('menu.message')" />
    <div class="flex flex-col">
      <div class="post-header">
        <h1 class="post-title text-white uppercase">{{ t('titles.message') }}</h1>
      </div>
      <div class="main-grid">
        <div class="relative">
          <div class="post-html" v-html="`谋士以身入局<br><br>举棋胜天半子`" />
          <Comment />
        </div>
        <div class="col-span-1">
          <Sidebar>
            <Profile />
          </Sidebar>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, provide } from 'vue'
import { useI18n } from 'vue-i18n'
import { Sidebar, Profile } from '../components/Sidebar'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { Comment } from '../components/Comment'
import { useCommentStore } from '@/stores/comment'
import api from '@/api/api'
import emitter from '@/utils/mitt'

export default defineComponent({
  name: 'Message',
  components: { Breadcrumb, Comment, Sidebar, Profile },
  setup() {
    //国际化
    const { t } = useI18n()
    const commentStore = useCommentStore()
    const reactiveData = reactive({
      comments: [] as any,
      haveMore: false as any,
      isReload: false as any
    })

    // 分页
    const pageInfo = reactive({
      current: 1,
      size: 7
    })
    //获取评论类型
    commentStore.type = 2
    onMounted(() => {
      fetchComments()
    })
    provide(
      'comments',
      computed(() => reactiveData.comments)
    )

    provide(
      'haveMore',
      computed(() => reactiveData.haveMore)
    )
    // 订阅事件,执行操作
    emitter.on('messageFetchComment', () => {
      pageInfo.current = 1
      reactiveData.isReload = true
      fetchComments()
    })
    emitter.on('messageFetchReplies', (index) => {
      fetchReplies(index)
    })
    emitter.on('messageLoadMore', () => {
      fetchComments()
    })
    //抓取评论
    const fetchComments = () => {
      const params = {
        type: 2,
        topicId: null,
        current: pageInfo.current,
        size: pageInfo.size
      }
      //使用api调用后端程序获取评论
      api.getComments(params).then(({ data }) => {
        if (reactiveData.isReload) {
          reactiveData.comments = data.data.records
          reactiveData.isReload = false
        } else {
          reactiveData.comments.push(...data.data.records)
        }
        if (data.data.count <= reactiveData.comments.length) {
          reactiveData.haveMore = false
        } else {
          reactiveData.haveMore = true
        }
        pageInfo.current++
      })
    }
    //获取回复
    const fetchReplies = (index: any) => {
      api.getRepliesByCommentId(reactiveData.comments[index].id).then(({ data }) => {
        reactiveData.comments[index].replyDTOs = data.data
      })
    }
    return {
      ...toRefs(reactiveData),
      t
    }
  }
})
</script>
