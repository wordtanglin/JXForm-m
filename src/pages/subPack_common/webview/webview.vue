<template>
    <view>
        <web-view :webview-styles="webviewStyles" :src="dataObj.url"></web-view>
    </view>
</template>

<script setup  lang="ts">
import { ref, toRef, reactive, watch } from "vue";
import { onLoad, onUnload, onBackPress } from '@dcloudio/uni-app'


const dataObj = reactive({
    url: ''
})


onLoad((options) => {

})

const webviewStyles: object = {
    progress: {
        color: '#E80E41FF'
    }
}

onUnload(() => {

})

function goBack() {

}
</script>

<style lang="scss" scoped>
@import './webview.scss'
</style>
