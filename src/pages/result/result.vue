<template>
    <view class="container">
        <view class="status">
            <image src="./../../static/imgs/success.png"></image>
            <view>表单已成功提交～</view>
        </view>
    </view>
</template>


<script setup  lang="ts">
import { ref, toRef, reactive, watch } from "vue";
import { onLoad, onUnload, onBackPress } from '@dcloudio/uni-app'
import api from '../../common/api'
import http from '../../utils/http'
import util from '../../utils/util'
import uniUtil from '../../utils/uni'
import config from "../../common/config";

const state = reactive({})

onLoad(async (option: any) => {
    if (option.formName) {
        uniUtil.setNavigationTitle(option.formName)
    }
})

</script>


<style lang="scss" scoped>
.container {
    height: 100vh;
    background: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .status {
        image {
            height: 220rpx;
            width: 220rpx;
        }

        view {
            padding-top: 24rpx;
            font-size: 28rpx;
            font-weight: 400;
            color: #575757;
        }
    }
}
</style>
