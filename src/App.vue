<template>
  <header>
    <div class="container">
      <span>欢迎使用</span>
      <span>网页聊天室</span>
      <span>v1.0</span>
    </div>
  </header>
  <section>
    <router-view></router-view>
  </section>
  <footer>
    计科195
    <span>傅嘉润</span>
  </footer>
</template>

<style lang="less" scoped>
  header{
    font-size:36px;
    position: absolute;
    width: 100%;
    background-color: rgba(0,0,0,0.3);
    color:white;
    padding: 12px 0px;
    box-shadow: 0px 5px 5px rgba(0,0,0,0.25);
  }
  .container{
    width: 80%;
    margin: auto;
    text-align: center;
  }

  section{
    height: 800px;
    background-image: url(./images/background.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  footer{
    font-size:18px;
    background-color: darkcyan;
    color:white;
    padding:10px 0px;
    text-align: center;
    box-shadow: 0px -5px 5px rgba(0,0,0,0.25);
  }
</style>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated,
  onErrorCaptured,
  onServerPrefetch,
  onScopeDispose,
  onRenderTracked,
  onRenderTriggered,
  reactive,
  watch,
  ref,
} from 'vue';

//import { message } from 'ant-design-vue';
import login from './component/login.vue'

export default defineComponent({
  name: 'MainApp',

  components: {
  },

  computed: {
    // 计算属性
  },
  watch: {
    // 数据监听
  },
  setup() {
    onRenderTracked((e) => {
      // onRenderTracked函数——状态追踪
      // 它会追踪页面上**所有**响应式变量和方法的状态，即我们在setup中return出去的值，
      // 一旦页面有更新，他都会进行追踪，然后生成一个event对象，我们通过event对象来查找程序的问题所在
      // - key 那边变量发生了变化
      // - newValue 更新后变量的值
      // - oldValue 更新前变量的值
      // - target 目前页面中的响应变量和函数
      console.log("renderTracked")
    });

    onRenderTriggered((e) => {
      // 它不像onRenderTracked函数，这个函数不会跟踪所有值的变化，而是给你变化值的信息，并
      // 且新值和旧值都会给你明确的展示出来
      // - key 那边变量发生了变化
      // - newValue 更新后变量的值
      // - oldValue 更新前变量的值
      // - target 目前页面中的响应变量和函数
      console.log("onRenderTriggered")
    });

    onBeforeMount(() => {
      // 在挂载开始之前被调用：相关的 render 函数首次被调用。
    });

    onMounted(() => {
    });

    onBeforeUpdate(() => {
      // 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。 你可以
      // 在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
      console.log("beforeUpdate")
    });
    onUpdated(() => {
      // 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
      // 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。
      // 然而在大多数情况下，你应该避免在此期间更改状态，因为这可能会导致更新无限循环
    });
    onBeforeUnmount(() => {
      // 实例销毁之前调用。在这一步，实例仍然完全可用。
    });
    onUnmounted(() => {
      // Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事
      // 件监听器会被移除，所有的子实例也会被销毁。 该钩子在服务器端渲染期间不被调用。
    });
    onActivated(() => {
      // 激活<keep-alive>组件时
    });
    onDeactivated(() => {
      // 离开<keep-alive>组件时
    });
    onErrorCaptured(() => {
      // 当捕获一个来自子孙组件的异常时激活钩子函数
    });
    onServerPrefetch(() => {
    });
    onScopeDispose(() => {
    });
  },

  beforeCreate() {
    // 在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。
  },

  created() {
    // 实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，
    // 属性和方法的运算， watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。
  },
  methods: {
    
  },
});
</script>