<template>
  <body>
    <div id="home">
      <div v-on:click="toSetting" v-bind:class="[{ active: currentTab === 'setting' }]">
        <svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-labelledby="homeAlt2IconTitle" stroke="#FFFFFF" stroke-width="3" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#FFFFFF"> <title id="homeAlt2IconTitle">Home</title> <path d="M2 12L5 9.3M22 12L19 9.3M19 9.3L12 3L5 9.3M19 9.3V21H5V9.3"/></svg>
      </div>
      <div v-on:click="toFriends" v-bind:class="[{ active: currentTab === 'friends' }]">
        <svg role="img" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" aria-labelledby="personIconTitle" stroke="#FFFFFF" stroke-width="3" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#FFFFFF"> <title id="personIconTitle">Person</title> <path d="M4,20 C4,17 8,17 10,15 C11,14 8,14 8,9 C8,5.667 9.333,4 12,4 C14.667,4 16,5.667 16,9 C16,14 13,14 14,15 C16,17 20,17 20,20"/> </svg>
      </div>
      <div v-on:click="toGroups" v-bind:class="[{ active: currentTab === 'groups' }]">
        <svg role="img" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" aria-labelledby="peopleIconTitle" stroke="#FFFFFF" stroke-width="3" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#FFFFFF"> <title id="peopleIconTitle">People</title> <path d="M1 18C1 15.75 4 15.75 5.5 14.25 6.25 13.5 4 13.5 4 9.75 4 7.25025 4.99975 6 7 6 9.00025 6 10 7.25025 10 9.75 10 13.5 7.75 13.5 8.5 14.25 10 15.75 13 15.75 13 18M12.7918114 15.7266684C13.2840551 15.548266 13.6874862 15.3832994 14.0021045 15.2317685 14.552776 14.9665463 15.0840574 14.6659426 15.5 14.25 16.25 13.5 14 13.5 14 9.75 14 7.25025 14.99975 6 17 6 19.00025 6 20 7.25025 20 9.75 20 13.5 17.75 13.5 18.5 14.25 20 15.75 23 15.75 23 18"/> <path stroke-linecap="round" d="M12,16 C12.3662741,15.8763472 12.6302112,15.7852366 12.7918114,15.7266684"/> </svg>
      </div>
      <div v-on:click="toSearch" v-bind:class="[{ active: currentTab === 'search' }]">
        <svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-labelledby="personAddIconTitle" stroke="#FFFFFF" stroke-width="3" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#FFFFFF"> <title id="personAddIconTitle">Add user</title> <path d="M1 18C1 15.75 4 15.75 5.5 14.25C6.25 13.5 4 13.5 4 9.75C4 7.25025 4.99975 6 7 6C9.00025 6 10 7.25025 10 9.75C10 13.5 7.75 13.5 8.5 14.25C10 15.75 13 15.75 13 18"/> <path d="M22 11H14"/> <path d="M18 7V15"/> </svg>
      </div>
    </div>
    <component 
    :conn="conn" 
    :my-email="myEmail"
    :my-avatar="myAvatar"
    :my-name="myName"
    :uid="myUid"
    :friendList="friendList" 
    :groupList="groupList"
    :friendChat="friendChat"
    :groupChat="groupChat"
    :is="currentTab"
    :groupUsers="groupUsers"
    @send="send"
    @update-info="updateInfo"
    ></component>
  </body>
</template>

<style lang="less" scoped>
body {
    overflow: hidden;
    padding: 0;
    margin: 0;
    width: 75%;
    height: 75%;
    background-color: rgba(0, 0, 0, 0.8);
    box-shadow: 0 14px 14px rgba(0,0,0,0.25), 0 10px 5px rgba(0,0,0,0.22);
    position: relative;
    margin: auto;
    top:125px;
}
#home {
    height: 100%;
    width: 5%;
    background-color: rgba(44, 44, 44, 0.8);
    float: left;
    box-shadow: 0 14px 14px rgba(0,0,0,0.25), 0 10px 5px rgba(0,0,0,0.22);
    div {
      height:10%;
      width:100%;
      padding: 20%;
      border-bottom: 2px solid rgb(176, 176, 176);
    }
    div:hover {
      background: #B71C1C;
      cursor: pointer;
    }
    div.active{
      background: #F44336;
    }
}
</style>

<script lang="ts">
import {
  defineComponent,
  reactive,
} from 'vue';
import friends from "./friends.vue"
import groups from "./groups.vue"
import setting from "./setting.vue"
import search from "./search.vue"
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
function getFriendGroup(that: any){
  fetch(`/api/friends?uid=${that.myUid}`).then(response=>{
    return response.json()
  }).then(async (data:chatInfo[])=>{
    that.friendList = data
    that.friendChat.length = 0 //清空chat
    for(let i=0;i<that.friendList.length;i++){
      //使用 async await保证顺序对应
      await fetch(`/api/offlinemsg?cid=${that.friendList[i].fid}&method=friend`).then(response=>{
        return response.json()
      }).then((data:msg[])=>{
        that.friendChat.push(data)
        return
      }).catch(err=>{
        console.log(err);
      });
    }
    return data
  }).catch(err=>{
    console.log(err);
  });
  fetch(`/api/groups?uid=${that.myUid}`).then(response=>{
    return response.json()
  }).then(async (data:chatInfo[])=>{
    that.groupList = data
    that.groupChat.length = 0 //清空chat
    for(let i=0;i<that.groupList.length;i++){
      await fetch(`/api/offlinemsg?cid=${that.groupList[i].gid}&method=group`).then(response=>{
        return response.json()
      }).then((data:msg[])=>{
        that.groupChat.push(data)
      }).catch(err=>{
        console.log(err);
      });
    }
    for(let i=0;i<that.groupList.length;i++){
      await fetch(`/api/groupusers?cid=${that.groupList[i].gid}`).then(response=>{
        return response.json()
      }).then((data:msg[])=>{
        that.groupUsers.push(data)
      }).catch(err=>{
        console.log(err);
      });
    }
  }).catch(err=>{
    console.log(err);
  });
}
export default defineComponent({
  name: 'home',
  components: {
    friends,
    groups,
    setting,
    search,
  },
  setup() {
    //加载用户基本信息,建立websocket
    function getCookie(cname:string){
      let name = cname + "=";
      let ca = document.cookie.split(';');
      for(let i=0; i<ca.length; i++) 
      {
        let c = ca[i].trim();
        if (c.indexOf(name)==0) return c.substring(name.length,c.length);
      }
      return "";
    };
    const myName = getCookie("name")
    const myEmail = getCookie("email")
    const myAvatar = getCookie("avatar")
    const myUid = parseInt(getCookie("uid"))
    const conn = new WebSocket(`ws://localhost:6616/ws?uid=${myUid}`)
    //加载用户好友列表与历史消息
    const friendList:chatInfo[] = []
    const groupList:chatInfo[] = []
    const friendChat:msg[][] = new Array()
    const groupChat:msg[][] = new Array()
    const groupUsers:chatInfo[][] = []
    return reactive({
      getCookie,
      conn,
      currentTab:"none",
      friendList,
      friendChat,
      groupList,
      groupChat,
      groupUsers,
      myName,
      myEmail,
      myAvatar,
      myUid,
    })
  },
  created() {
    getFriendGroup(this)
  },
  beforeMount(){
    //处理websocket传来的信息
    const that = this
    this.conn.onmessage = function (evt) {
      let messages = evt.data.split('\n')
      for (let i = 0; i < messages.length; i++) {
        let message:msg = JSON.parse(messages[i])
        console.log(message)
        switch(message.Method){
          case "friend":
            for(let i = 0; i < that.friendList.length; i++){
              if(that.friendList[i].fid == message.Cid){
                that.friendChat[i].push(message)
                break
              }
            }
            break;
          case "group":
            for(let i = 0; i < that.groupList.length; i++){
            if(that.groupList[i].gid == message.Cid){
              that.groupChat[i].push(message)
              break
            }
          }
        }
      }
    }
  },
  methods:{
    toSetting(){
      this.currentTab = 'setting'
    },
    toFriends(){
      this.currentTab = 'friends'
    },
    toGroups(){
      this.currentTab = 'groups'
    },
    toSearch(){
      this.currentTab = 'search'
    },
    send(Msg:msg){
      //send负责将包装好的Msg发送到后端
      console.log(Msg)
      var msg = JSON.stringify(Msg)
      this.conn.send(msg);
    },
    updateInfo(){
      this.myName = this.getCookie("name")
      this.myEmail = this.getCookie("email")
      this.myAvatar = this.getCookie("avatar")
      this.myUid = parseInt(this.getCookie("uid"))
      getFriendGroup(this)
    }
  },
});
</script>