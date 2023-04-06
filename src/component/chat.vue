<template>
    <div id="interface">
      <div id="log">
        <div v-for="(msg, index) in chatMsg" :key="index" :class="{message : !isMe(msg.Src),myMessage : isMe(msg.Src)}">
          <img v-if="msg.Method=='friend'" :src="getimg(msg,'friend')" class="avatar">
          <img v-if="msg.Method=='group'" :src="getimg(msg,'group')" class="avatar">
          <div class="nameLine">
            <span class="name">{{getName(msg,method)}}</span>
            <span class="date">{{getDate(msg)}}</span>
          </div>
          <br>
          <div class="value" v-if="msg.Type=='text'">{{msg.Value}}</div>
          <img class="pic" v-if="msg.Type=='image'" :src="getPic(msg.Value)" alt="[图片已失效]">
        </div>
      </div>
      <div id="tools">
        <label id="pic" title="发送图片">
          <input ref="file" v-on:change="sendPic()" type="file" accept="image/*">
        </label>
        <label id="emo" title="发送表情">
          <input type="file" accept="image/*">
        </label>
      </div>
      <div id="form">
          <input type="text" id="msg" v-model="inputMsg" @keydown.enter="send">
          <button id="button" @click="send">发送</button>
      </div>
    </div>
    <div id="infos">
      <div id="members" v-if="method=='group'">
        <div id="title">群成员:</div>
        <div v-for="(user, index) in groupUsers" :key="index">
          <div class="list">
            <img :src="displayAvatar(user)" class="avatar">
            <span class="uname">{{user.name}}</span>
          </div>
        </div>
      </div>
    </div>
</template>

<style lang="less" scoped>
#interface{
    height: 100%;
    width: 55%;
    background: #F5F5F5;
    float: left;
    box-shadow: 0 1px 1.5px rgba(0,0,0,0.12), 0 1px 1px rgba(0,0,0,0.24);
    #log {
        height: 77%;
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
        .message{
          width:100%;
          min-height:60px;
          .nameLine{
            float:left;
            .name{
              margin-left:5px;
              color: rgba(0, 0, 0, 0.87);
            }
            .date{
              margin-left:5px;
              font-size: 16px;
              color: rgba(0, 0, 0, 0.54);
            }
          }
          .avatar{
            height: 48px;
            width: 48px;
            border-radius: 50%;
            border: 2px solid #F44336;
            float: left;
            margin-top: 14px;
          }

          .value{
            margin-left:55px;
            color: rgba(0, 0, 0, 0.87);
            font-weight: 500;
            background-color: #CFD8DC;
            padding: 3px 7px;
            border-radius: 10px;
            width:fit-content;
            max-width:80%;
          }

          .pic{
            padding: 3px 7px;
            border-radius: 10px;
            width:fit-content;
            max-width:200px;
          }
        }
        .myMessage{
          width:100%;
          min-height:60px;
          overflow:auto;
          .nameLine{
            float: right;
            .name{
              margin-right:5px;
              color: rgba(0, 0, 0, 0.87);
            }
            .date{
              margin-right:5px;
              padding-top: 6px;
              font-size: 16px;
              color: rgba(0, 0, 0, 0.54);
            }
          }
          .avatar{
            height: 48px;
            width: 48px;
            border-radius: 50%;
            border: 2px solid #F44336;
            float: right;
            margin-top: 14px;
          }
          .value{
            margin-right:5px;
            color: rgba(0, 0, 0, 0.87);
            font-weight: 500;
            background-color: #4FC3F7;
            padding: 3px 7px;
            border-radius: 10px;
            width:fit-content;
            max-width:80%;
            float:right;
          }
          .pic{
            margin-right:5px;
            padding: 3px 7px;
            border-radius: 10px;
            width:fit-content;
            max-width:200px;
            float: right;
          }
        }
    }
    #tools{
      padding: 3px;
      height: 30px;
      label{
        float: left;
        width:24px;
        height: 24px;
        margin-right: 5px;
        border-radius: 4px;
      }
      #pic{
        background-image: url('../svg/image.svg');
        input{
          opacity: 0;
          width: 0px;
          height: 0px;
        }
      }
      #emo{
        background-image: url('../svg/happy-face.svg');
        input{
          opacity: 0;
          width: 0px;
          height: 0px;
        }
      }
      label:hover{
        background-color: rgba(0,0,0,0.12);
        cursor:pointer;
      }
    }
    #form {
        width: 100%;
        height: 100px;
        float: left;
        overflow: auto;
        padding-left: 5px;
        #msg {
          width: 100%;
          height: 60px;
          font-size: 20px;
          border: 0px;
          background: #F5F5F5;
          outline-style: none ; 
        }
        #button{
          background-color: #F44336; 
          color: white;
          text-align: center;
          font-size: 16px;
          width: 25%;
          margin-right: 10px;
          margin-top:5px;
          float:right;
          border: 0px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        }
        #button:hover{
          box-shadow: 0 3px 7px rgba(0,0,0,0.25), 0 2px 2px rgba(0,0,0,0.22);
          cursor: pointer;
        }
    }
}
#infos{
  height: 100%;
  width: 20%;
  background-color:#F5F5F5;
  border-left: 2px solid rgb(176, 176, 176);
  float: left;
  #members{
    height: 100%;
    overflow: auto;
    #title{
      font-size: 24px;
      padding: 5px;
      border-bottom: 2px solid rgb(176, 176, 176);
    }
    .list{
      width: 100%;
      height: 40px;
      padding: 6px;
      .avatar{
        height: 32px;
        width: 32px;
        border-radius: 50%;
        border: 2px solid #F44336;
        float: left;
      }
      .uname{
        float: left;
        margin-left: 10px;
        font-size: 20px;
      }
    }
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
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}
var picDirRelative = "../images/pic/"
export default defineComponent({
  name: 'chat',
  components: {
  },
  props:{
      conn: WebSocket,
      method: {
        type:String,
        default:""
      },
      desUid:{
        type:Number,
        default:""
      },
      srcUid: {
        type:Number,
        default:""
      },
      cid: {
        type:Number,
        default:""
      },
      userList: {
        type:Array as () => chatInfo[],
        default:Array as () => chatInfo[]
      },
      groupUsers:{
        type:Array as () => chatInfo[],
        default:Array as () => chatInfo[]
      },
      chatMsg: {
        type:Object as () => msg[],
        default: Object as () => msg[]
      },
      myName:String,
      myAvatar:{
        type:String,
        default:"../images/avatar/default.png"
      }
  },
  emits:[
    "send"
  ],
  setup(props, context) {
    let inputMsg = "";
    const file = ref(null)
    const sendPic = async() => {
      //fetch传送图片，send发送信息
      if(file == null){
          message.error('请选择图片')
          return
      }
      //生成图片uuid
      let photoName = file.value?.files[0].name
      let id = uuid()
      let extension = photoName.substring(photoName.lastIndexOf('.'))
      let picURL = id + extension;
      let reader = new FileReader();
      reader.readAsDataURL(file.value?.files[0])
      reader.onload = function(){
        fetch(`/api/savepic?picurl=${picURL}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.result) // body data type must match "Content-Type" header
        }).then(rsp=>{
            return rsp.text()
        }).then(err=>{
            if(err!=""){
                message.error(err)
            }else{
              let Msg:msg = {
                Date: Date.now(),
                Src: props.srcUid,
                Des: props.desUid,
                Cid: props.cid,
                Type: "image",
                Value: picDirRelative + picURL,
                Method: props.method,
              };
              context.emit('send',Msg)
            }
        }).catch(err=>{
            console.log(err);
        })
      }
    }
    return reactive({
      inputMsg,
      file,
      sendPic,
    })
  },
  methods:{
    send(){
      //读取用户输入，封装信息，发送到home
        if (this.inputMsg=="") {
            return false;
        }
        let Msg:msg = {
          Date: Date.now(),
          Src: this.srcUid,
          Des: this.desUid,
          Cid: this.cid,
          Type: "text",
          Value: this.inputMsg,
          Method: this.method,
        };
        this.$emit('send',Msg)
        this.inputMsg = "";
    },
    getName(rawMsg:msg,method:string){
      if(method == "friend"){
        if(rawMsg.Src == this.srcUid){
          return this.myName
        }
        for(let i=0;i<this.userList.length;i++){
            if(rawMsg.Src==this.userList[i].uid){
              return this.userList[i].name
            }
        }
      }else {
        for(let i=0;i<this.groupUsers.length;i++){
            if(rawMsg.Src==this.groupUsers[i].uid){
              return this.groupUsers[i].name
            }
        }
      }
    },
    getDate(rawDate:msg){
      let date = new Date(rawDate.Date)
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDay();
      let hour = date.getHours();  
      let minute = date.getMinutes();  
      let second = date.getSeconds(); 
      return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
    },
    isMe(src:number){
      if(this.srcUid==src){
        return true
      }else{
        return false
      }
    },
    getimg(rawMsg:msg,method:string) {
      if(method == "friend"){
        if(rawMsg.Src == this.srcUid){
          return new URL(this.myAvatar,import.meta.url).href
        }
        for(let i=0;i<this.userList.length;i++){
            if(rawMsg.Src==this.userList[i].uid){
              return new URL(this.userList[i].avatar,import.meta.url).href
            }
        }
      }else {
        for(let i=0;i<this.groupUsers.length;i++){
            if(rawMsg.Src==this.groupUsers[i].uid){
              return new URL(this.groupUsers[i].avatar,import.meta.url).href
            }
        }
      }
    },
    getPic(url:string){
      return new URL(url,import.meta.url).href
    },
    displayAvatar(user:chatInfo){
      return new URL(user.avatar,import.meta.url).href
    }
  },
});
</script>