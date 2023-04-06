<template>
    <div id="friends">
      <div id="me">
        <img :src="getimg(myAvatar)" class="avatar">
        <span class="uname">{{myName}}</span>
        <span class="uemail">{{myEmail}}</span>
      </div>
      <template  v-for="group,index in groupList" :key="index">
        <div v-on:click="changeChat(group['name'],group['gid'],group['gid'],index)" v-bind:class="['else',{ active: currendGroup === group['name'] }]">
          <img :src="getimg(group['avatar'])" class="avatar">
          <span class="uname">{{group['name']}}</span>
        </div>
      </template>
    </div>
    <chat 
    :conn="conn"
    method="group"
    :des-uid="desUid"
    :cid="cid"
    :src-uid="uid"
    :chat-msg="groupChat[index]"
    :user-list="groupList"
    :group-users="groupUsers[index]"
    :my-name="myName"
    :my-avatar="myAvatar"
    @send="send"
    v-if="currendGroup!=''"
    >
    </chat>
</template>

<style lang="less" scoped>
*{
  overflow: hidden;
}
#friends {
    height: 100%;
    width: 20%;
    background-color:rgba(91, 91, 91, 0.8);
    float: left;
    line-height: 22px;
    box-shadow: 0 10px 10px rgba(0,0,0,0.19), 0 6px 3px rgba(0,0,0,0.23);
    #me{
      width: 100%;
      height:10%;
      padding: 6px;
      background-color: rgb(44, 44, 44, 0.9);
    }
    .else{
      width: 100%;
      height:10%;
      padding: 6px;
      border-bottom: 2px solid rgb(110, 110, 110);
    }
    .else:hover{
      background: #B71C1C;
      cursor: pointer;
    }
    .else.active{
      background: #F44336;
    }
    .avatar{
      height: 48px;
      width: 48px;
      border-radius: 50%;
      border: 2px solid #F44336;
      float: left;
    }
    .uname{
      float: left;
      margin-left: 10px;
      font-size: 20px;
      color: rgb(203, 203, 203);
    }
    .uemail{
      float: left;
      margin-left: 10px;
      color: rgb(110, 110, 110);
    }
}
#interface{
    height: 100%;
    width: 55%;
    background: rgba(255, 255, 255, 0.84);
    float: left;
    #log {
        height: 80%;
        padding: 0.5em 0.5em 0.5em 0.5em;
        top: 0.5em;
        left: 0.5em;
        right: 0.5em;
        bottom: 3em;
        overflow: auto;
        border-bottom: 2px solid rgb(176, 176, 176);
        div{
          font-size: 20px;
        }
    }
    #form {
        width: 100%;
        height: 100px;
        padding: 0.2em 0.2em 0.2em 0.2em;
        float: left;
        overflow: auto;
        #msg {
            width: 100%;
            height: 65px;
            font-size: 24px;
        }
        #button{
            background-color: #e8491d; 
            color: white;
            text-align: center;
            font-size: 16px;
            width: 25%;
            float:right;
        }
    }
}
#members{
    height: 100%;
    width: 20%;
    background-color:rgba(255, 255, 255, 0.84);
    border-left: 2px solid rgb(176, 176, 176);
    float: left;
}
</style>

<script lang="ts">
import {
  defineComponent,
  reactive,
} from 'vue';
import chat from "./chat.vue"
interface chatInfo{
  name: string,
  avatar: string,
  email?: string,
  uid: number,
  cid: number,
  fid: number,
  gid: number,
}
interface msg{
  Date: number|string,
  Src: number,
  Des?: number,
  Cid?: number,//对应fid或者gid
  Value: string,
  Type?: string,
  Method?: string,
}
export default defineComponent({
  inheritAttrs: false,
  name: 'groups',
  components: {
      chat
  },
  props:{
      conn: WebSocket,
      myEmail: String,
      myName: String,
      myAvatar: {
        type: String,
        default: "../images/avatar/default.png"
      },
      uid: Number,
      groupList: Array as () => chatInfo[],
      groupUsers:{
        type:Array as () => chatInfo[][],
        default:Array as () => chatInfo[][]
      },
      groupChat:{
        type:Array as () => msg[][],
        default:Array<msg[]>()
      },
  },
  emits:[
    "send"
  ],
  setup(props) {
    return reactive({
      currendGroup:"",
      desUid:0,
      cid:0,
      index:0,
      myAvatar:props.myAvatar
    })
  },
  methods: {
    changeChat(name: string,uid:number,cid: number,index: number){
      this.currendGroup = name
      this.desUid = uid
      this.cid = cid
      this.index = index
    },
    send(Msg:msg){
      this.$emit('send',Msg)
    },
    getimg(img:string) {
      return new URL(img,import.meta.url).href
    },
  },
});
</script>