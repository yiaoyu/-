<template>
  <div id="search">
     <div>搜索用户
        <input type="text" v-model="targetUser">
        <button @click="searchUser">搜索</button>
    </div>
    <div v-for="(userInfo,index) in searchUserInfos" :key="index">
        {{userInfo}}
        <button @click.once="addFriend(userInfo.uid)" v-if="!isFriend(userInfo.uid)&&!isMyself(userInfo.uid)">添加好友</button>
        <button @click.once="deleteFriend(userInfo.uid)" v-if="isFriend(userInfo.uid)&&!isMyself(userInfo.uid)">删除好友</button>
    </div>
    <div v-if="searchUserInfos.length==0&&hasSearchUser">找不到用户</div>
    <hr>
    <div>搜索群组
        <input type="text" v-model="targetGroup">
        <button @click="searchGroup">搜索</button>
    </div>
    <div v-for="(groupInfo,index) in searchGroupInfos" :key="index">
        {{groupInfo}}
        <button @click.once="addGroup(groupInfo.gid)" v-if="!isAddGroup(groupInfo.gid)">添加群组</button>
        <button @click.once="quitGroup(groupInfo.gid)" v-if="isAddGroup(groupInfo.gid)">退出群组</button>
    </div>
    <div v-if="searchGroupInfos.length==0&&hasSearchGroup">找不到用户</div>
    <hr>
    <div>创建群组
        <input type="text" v-model="newGroup">
        <button @click="createGroup">创建</button>
    </div>
  </div>
</template>

<style lang="less" scoped>
  #search{
        width: 100%;
        height: 100%;
        background-color:#F5F5F5 ;
        margin-left: 5%;
        box-shadow: 0 10px 10px rgba(0,0,0,0.19), 0 6px 3px rgba(0,0,0,0.23);
        padding-top: 5px;
        div{
            margin-left: 10px;
        }
        button{
            margin-left: 10px;
        }
    }
</style>

<script lang="ts">
import { message } from 'ant-design-vue';
import {
  defineComponent,
  reactive,
  ref,
} from 'vue';
interface chatInfo{
  name: string,
  avatar: string,
  email?: string,
  uid?: string,
  cid?: string,
  gid?: string,
}
interface msg{
  Date: number|string,
  Src: string,
  Des?: string,
  Cid?: string,
  Value: string,
  Type?: string
}

export default defineComponent({
  inheritAttrs: false,
  name: 'search',
  props:{
      conn: WebSocket,
      myEmail: String,
      myName: String,
      myAvatar: String,
      uid: Number,
      friendList: Array as () => chatInfo[],
      groupList: Array as () => chatInfo[],
  },
  emits:[
        "updateInfo"
  ],
  setup() {
    let searchUserInfos:chatInfo[] = new Array
    let searchGroupInfos:chatInfo[] = new Array
    return reactive({
      newGroup:"",
      targetUser:"",
      targetGroup:"",
      searchUserInfos,
      searchGroupInfos,
      hasSearchUser:false,
      hasSearchGroup:false,
    })
  },
  methods: {
    searchUser(){
        if(this.targetUser == ""){
            message.error('名称不能为空')
            return
        }
        //搜索前清空数组
        this.searchUserInfos.length = 0
        fetch(`/api/searchuser?targetUser=${this.targetUser}`).then(rsp=>{
            return rsp.json()
        }).then(data=>{
            this.hasSearchUser=true
            for(let i=0;i<data.length;i++){
                this.searchUserInfos.push(data[i])
            }
        }).catch(err=>{
            console.log(err);
        })
    },
    searchGroup(){
        if(this.targetGroup == ""){
            message.error('名称不能为空')
            return
        }
        this.searchGroupInfos.length = 0
        fetch(`/api/searchgroup?targetGroup=${this.targetGroup}`).then(rsp=>{
            return rsp.json()
        }).then(data=>{
            this.hasSearchGroup=true
            for(let i=0;i<data.length;i++){
                this.searchGroupInfos.push(data[i])
            }
        }).catch(err=>{
            console.log(err);
        })
    },
    addFriend(fuid:string|undefined){
        //添加好友
        console.log(`发送添加好友请求?uid=${this.uid}&fuid=${fuid}`)
        fetch(`/api/addfriend?uid=${this.uid}&fuid=${fuid}`).then(rsp=>{
            return rsp.text()
        }).then(err=>{
            if(err!=""){
                message.error(err)
            }else{
                message.success('添加成功')
                this.$emit('updateInfo')
            }
        }).catch(err=>{
            console.log(err);
        })
    },
    deleteFriend(fuid:string|undefined){
        //删除好友
        fetch(`/api/deletefriend?uid=${this.uid}&fuid=${fuid}`).then(rsp=>{
            return rsp.text()
        }).then(err=>{
            if(err!=""){
                message.error(err)
            }else{
                message.success('删除成功')
                this.$emit('updateInfo')
            }
        }).catch(err=>{
            console.log(err);
        })
    },
    isFriend(fuid:string|undefined){
        //判断是否为好友
        if(this.friendList!=null)
        for(let i=0;i<this.friendList.length;i++){
            if(this.friendList[i].uid == fuid){
                return true
            }
        }
        return false
    },
    isMyself(fuid:string|undefined){
        //判断是否为自己
        if(fuid==this.uid){
            return true
        }
    },
    createGroup(){
        //创建群聊
        if(this.newGroup == ""){
            message.error('名称不能为空')
            return
        }
        fetch(`/api/creategroup?name=${this.newGroup}&uid=${this.uid}`).then(rsp=>{
            return rsp.text()
        }).then(err=>{
            if(err!=""){
                message.error(err)
            }else{
                message.success('创建成功')
                this.$emit('updateInfo')
            }
        }).catch(err=>{
            console.log(err);
        })
    },
    addGroup(gid:string|undefined){
        //添加好友
        fetch(`/api/addgroup?uid=${this.uid}&gid=${gid}`).then(rsp=>{
            return rsp.text()
        }).then(err=>{
            if(err!=""){
                message.error(err)
            }else{
                message.success('添加成功')
                this.$emit('updateInfo')
            }
        }).catch(err=>{
            console.log(err);
        })
    },
    quitGroup(gid:string|undefined){
        //删除好友
        fetch(`/api/quitgroup?uid=${this.uid}&gid=${gid}`).then(rsp=>{
            return rsp.text()
        }).then(err=>{
            if(err!=""){
                message.error(err)
            }else{
                message.success('已退出群聊')
                this.$emit('updateInfo')
            }
        }).catch(err=>{
            console.log(err);
        })
    },
    isAddGroup(gid:string|undefined){
        //判断是否已经加入该群
        if(this.groupList!=null)
        for(let i=0;i<this.groupList.length;i++){
            if(this.groupList[i].gid == gid){
                return true
            }
        }
        return false
    },
  },
});
</script>