<template>
    <div id="friends">
      <div id="me">
        <img :src="getimg(myAvatar)" class="avatar">
        <span class="uname">{{myName}}</span>
        <span class="uemail">{{myEmail}}</span>
      </div>
      <template  v-for="friend,index in friendList" :key="index">
        <div v-on:click="changeChat(friend['name'],friend['uid'],friend['fid'],index)" v-bind:class="['else',{ active: currendFriend === friend['name'] }]">
          <img :src="getimg(friend['avatar'])" class="avatar">
          <span class="uname">{{friend['name']}}</span>
          <span class="uemail">{{friend['email']}}</span>
        </div>
      </template>
    </div>
    <chat 
    :conn="conn"
    method="friend"
    :des-uid="desUid"
    :cid="cid"
    :src-uid="uid"
    :chat-msg="friendChat[index]"
    :user-list="friendList"
    :my-name="myName"
    :my-avatar="myAvatar"
    @send="send"
    v-if="currendFriend!=''"
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
      min-width: 150px;
      color: rgb(110, 110, 110);
    }
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
  name: 'friends',
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
      friendList: Array as () => chatInfo[],
      friendChat:{
        type:Array as () => msg[][],
        default:Array<msg[]>()
      } 
  },
  emits:[
    "send"
  ],
  setup(props) {
    let blank:msg[] = new Array()
    return reactive({
      currendFriend:"",
      desUid:0,
      cid:0,
      index:0,
      blank,
      myAvatar:props.myAvatar
    })
  },
  methods: {
    changeChat(name: string,fuid:number,fCid: number,index: number){
      this.currendFriend = name
      this.desUid = fuid
      this.cid = fCid
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