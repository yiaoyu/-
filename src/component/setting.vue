<template>
    <div id="setting">
        <div>修改密码：
            <input type="text" v-model="newPwd">
            <button @click="changePwd">提交</button>
        </div>
        <hr>
        <div>修改名称：
            <input type="text" v-model="newName">
        </div>
        <div>修改邮箱：
            <input type="text" v-model="newEmail">
        </div>
        <button @click="updateInfo">提交</button>
        <hr>
        <div>修改头像：
            <input ref="file" v-on:change="updateAvatar()"  type="file" accept="image/*">
            <button @click="$emit('updateInfo')">刷新</button>
        </div>
        <hr>
    </div>
</template>

<style lang="less" scoped>
    #setting{
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
    name: 'setting',
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
    setup(props) {
        let newName = props.myName
        let newEmail = props.myEmail
        const file = ref(null)
        const updateAvatar = async() => {
            if(file == null){
                message.error('请选择图片')
                return
            }
            console.log(file.value?.files[0])
            let photoName = file.value?.files[0].name
            let reader = new FileReader();
            reader.readAsDataURL(file.value?.files[0])
            reader.onload = function(){
                fetch(`/api/updateavatar?uid=${props.uid}&photoname=${photoName}`, {
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
                        message.success('更新成功')
                        //this.$emit('updateInfo')
                    }
                }).catch(err=>{
                    console.log(err);
                })
            }
        }
        return reactive({
            newPwd:"",
            newName,
            newEmail,
            file,
            updateAvatar,
        })
    },
    methods: {
        changePwd(){
            //密码检测
            if(this.newPwd == ""){
                message.error('密码不能为空')
                return
            }
            fetch(`/api/changeinfo?uid=${this.uid}&newPwd=${this.newPwd}`).then(rsp=>{
                return rsp.text()
            }).then(err=>{
                if(err!=""){
                    message.error(err)
                }else{
                    message.success('修改成功')
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        updateInfo(){
            //更新个人信息
            if(this.newName == ""){
                message.error('名称不能为空')
                return
            }
            fetch(`/api/updateinfo?uid=${this.uid}&newName=${this.newName}&newEmail=${this.newEmail}`).then(rsp=>{
                return rsp.text()
            }).then(err=>{
                if(err!=""){
                    message.error(err)
                }else{
                    message.success('更新成功')
                    this.$emit('updateInfo')
                }
            }).catch(err=>{
                console.log(err);
            })
        },
    },
})
</script>