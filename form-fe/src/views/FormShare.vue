<template>
  <div class="share_form">
    <div class="share_content">
      <div class="share_else">
        <h3>分享邀请他人填写</h3>
      </div>
      <div class="subscribe_text">
        <div class="text_one">
          <span class="subscribe_setting">任何人可填写</span>
          <span class="setting_text">设置</span>
        </div>
        <div class="text_two">
          <img :src="bell" />
          <span>订阅消息,有人填写了及时通知你</span>
          <span class="detail_text"><a href="#!">查看详情</a></span>
        </div>
      </div>
      <div class="qrcode_box">
        <span class="form_name">{{ formName }}</span>
        <vue-qr
          :logoSrc="qrlogo"
          :text="webSite"
          class="qrcode"
          :size="240"
          :logoScale="0.2"
        >
        </vue-qr>
        <span class="wechat_scan">微信扫码或长按识别，填写内容</span>
      </div>
      <a href="#!"><span>下载二维码</span></a>
      <div class="option">
        <div class="generate_post">
          <img :src="post" />
          <span>生成海报</span>
        </div>
        <div class="copy_link">
          <img :src="link" />
          <span>复制链接</span>
        </div>
        <img :src="wechat" class="social_pic" />
        <img :src="qq" class="social_pic" />
      </div>
      <div class="empty_content"></div>
      <div class="share">
        <h3 class="share_title">分享到公众号</h3>
        <div class="share_public">
          <div>
            <span>插入微信公众号菜单或文章,获取更多表单填写</span>
            <a href="https://www.kdocs.cn/l/svuaFXaLoQpF">点击查看教程</a>
          </div>
          <div class="unfold">
            <span>展开</span>
            <img :src="arow" alt="" />
          </div>
        </div>
      </div>
      <div class="empty_content"></div>
      <div class="share">
        <h3 class="share_title">自定义渠道分享</h3>
        <div class="share_public">
          <div>
            <span
              >可以追踪不同链接对应数据信息,可在数据汇总表查询不同渠道效果</span
            >
            <a href="https://www.kdocs.cn/l/svuaFXaLoQpF">点击查看教程</a>
          </div>
          <div class="unfold">
            <span>展开</span>
            <img :src="arow" alt="" />
          </div>
        </div>
      </div>
      <div class="empty_content"></div>
      <div class="share">
        <h3 class="share_title">分享为模板</h3>
        <div class="share_public">
          <div>
            <span>可将该表单作为模板分享给其他创建者使用</span>
          </div>
          <div class="unfold">
            <span>展开</span>
            <img :src="arow" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import vueQr from 'vue-qr/src/packages/vue-qr.vue'
import bell from '@/assets/imgs/bell.png'
import post from '@/assets/imgs/post.png'
import link from '@/assets/imgs/link.svg'
import wechat from '@/assets/imgs/wechat.png'
import qq from '@/assets/imgs/qq.png'
import arow from '@/assets/imgs/arow.png'
import qrlogo from '@/assets/imgs/qrlogo.png'
import { useFormStore } from '../store/index'
import { storeToRefs } from 'pinia'
import { FormService } from '@/api/index'

const store = useFormStore()
let webSite = ref('')
let url = ref('')
const ip = ref('')

const formName = ref('')
onMounted(async () => {
  const { formId } = storeToRefs(store)
  const res = await FormService.get({ id: formId.value })
  formName.value = res.data.data.item.title
  ip.value = import.meta.url
  url.value = ip.value.slice(0, 26)
  webSite.value = url.value + `#/writeform/${formId.value}`
})
</script>
<style lang="css" scoped>
.share_form {
  display: flex;
  justify-content: center;
  background-color: #f2f4f7;
  min-width: 100%;
}
.share_content {
  position: relative;
  padding-left: 3%;
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #fff;
  align-items: center;
}
.share_else {
  margin-top: 2%;
  align-self: flex-start;
  font-size: 1em;
  color: #3d4757;
  font-weight: 100;
}

.setting_text {
  color: #1488ed;
  cursor: pointer;
}
.subscribe_text {
  align-self: flex-start;
  display: flex;
  justify-content: space-between;
  font-size: 0.5em;
  width: 100%;
  margin-top: 2%;
}

.text_one {
  width: 10%;
  display: flex;
  justify-content: space-between;
}
.text_two {
  display: flex;
  justify-content: space-between;
  width: 26%;
}
.text_two img {
  width: 17px;
  height: 17px;
}
.text_two .detail_text {
  margin-right: 5%;
  color: #1488ed;
}

.qrcode_box {
  position: relative;
  width: 272px;
  height: 323px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transform: scale(0.7);
  background: #fff;
  border: 0.01rem solid #e3e3e3;
  margin-top: -15px;
}
.form_name {
  margin-top: 15px;
  font-size: 16px;
  font-weight: 500;
  color: #535252;
}
.wechat_scan {
  margin-bottom: 15px;
  line-height: 19px;
  color: #9b9b9b;
}
a {
  text-decoration: none;
}
.option {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
}
.generate_post,
.copy_link {
  width: 120px;
  height: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid #e2e4e8;
  color: gray;
  cursor: pointer;
}

.generate_post {
  margin-right: 24px;
}
.generate_post img {
  width: 24px;
  height: 24px;
}
.copy_link {
  margin-right: 24px;
}
.copy_link img {
  width: 24px;
  height: 24px;
}
.social_pic {
  width: 30px;
  height: 30px;
}
.social_pic {
  margin-right: 24px;
}
.empty_content {
  width: 100%;
  height: 1px;
  background-color: rgb(239, 237, 237);
  /* border: 1px solid rgb(243, 229, 229); */
  margin-top: 40px;
}
.share {
  width: 100%;
  margin-top: 20px;
}
.share_public {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  color: rgba(74, 70, 70, 0.85);
  font-weight: 500;
}
.share_title {
  color: rgba(56, 54, 54, 0.85);
}
.share_public a {
  margin-left: 20px;
  color: rgba(56, 54, 54, 0.85);
  text-decoration: underline;
}
.unfold {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 50px;
  cursor: pointer;
  width: 70px;
  height: 20px;
}
.unfold img {
  width: 20px;
  height: 20px;
}
.share:last-of-type {
  margin-bottom: 60px;
}
</style>
