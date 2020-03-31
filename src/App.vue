<template>
  <div id="app">
    <div class="input-container">
      <a-input
        class="task-input"
        placeholder="请输入待办事项"
        :value="inputVal"
        @change="handleInputChange"
      ></a-input>
      <a-button
        class="task-btn"
        type="primary"
        @click="handelAdd"
      >添加事项</a-button>
    </div>
    <a-list
      itemLayout="horizontal"
      :dataSource="info"
      bordered
    >
      <a-list-item
        slot="renderItem"
        slot-scope="item"
      >
        <a-checkbox
          class="task-checkbox"
          :checked="item.done"
          @change="handleTaskDone(item.id,$event)"
        >{{item.info}}</a-checkbox>

        <a-button
          type="link"
          size="small"
          class="del-btn"
          @click="handleDel(item.id)"
        >删除</a-button>
      </a-list-item>
      <template v-slot:footer>
        <div :class="'list-footer'">
          <span>{{undoneCnt}}条剩余</span>
          <a-button-group>
            <a-button
              @click="handleListChange('all')"
              :type="viewKey==='all'?'primary':'default'"
            >全部</a-button>
            <a-button
              @click="handleListChange('undone')"
              :type="viewKey==='undone'?'primary':'default'"
            >未完成</a-button>
            <a-button
              @click="handleListChange('done')"
              :type="viewKey==='done'?'primary':'default'"
            >已完成</a-button>
          </a-button-group>
          <a @click="handleClearDone">清除已完成</a>
        </div>
      </template>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  data () {
    return {

    }
  },
  created () {
    this.$store.dispatch('getList')
  },
  computed: {
    ...mapState(['list', 'inputVal', 'viewKey']),
    ...mapGetters(['undoneCnt', 'info'])
  },
  methods: {
    ...mapMutations(['setInputVal', 'removeItem']),
    handleInputChange (event) {
      this.setInputVal(event.target.value.trim())
    },
    // 向列表中添加item
    handelAdd () {
      if (this.inputVal === '') return this.$message.warning('文本框内容为空')
      this.$store.commit('addItem')
    },
    handleDel (id) {
      this.removeItem(id)
    },
    handleTaskDone (id, event) {
      console.log(id, event.target.checked)
      this.$store.commit('changeStatus', {
        id, status: event.target.checked
      })
    },
    handleClearDone () {
      this.$store.commit('clearDone')
    },
    handleListChange (vk) {
      this.$store.commit('viewChange', vk)
    }
  }
}
</script>

<style lang="less" scoped>
#app {
  box-sizing: content-box;
  width: 30%;
  margin: 15px;
  .input-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-bottom: 15px;
    .task-input {
      box-sizing: border-box;
      margin-right: 10px;
    }
  }

  .del-btn {
    justify-self: self-end;
    margin-right: 15px;
  }
  .list-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    line-height: 32px;
  }
}
</style>
