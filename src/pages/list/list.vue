<template>
    <view class="container">
        <view scroll-y="true" class="customer-list" :class="[dataObj.list.length > 0 ? '' : 'width100']"
            scroll-with-animation="true">
            <view class="list-content " v-if="dataObj.list.length > 0">
                <view class="list-item" v-for="(item, index) of dataObj.list" :key="index" @click="handleGoarticle(item)">
                    <view class="item-content">
                        <view class="item-info">
                            <view class="item-subtitle">
                                {{ item.title }}
                            </view>
                            <view class="item-tag">
                                {{ item.tagNames || '-' }}
                            </view>
                            <view class="item-count">
                                阅读
                                <view>{{ item.readCount }}</view>
                            </view>
                        </view>
                        <image :src="item.url"></image>
                    </view>
                </view>
            </view>
            <view v-else class="empty">
                <view>暂无数据</view>
            </view>
        </view>
    </view>
</template>

<script setup  lang="ts">
import { ref, toRef, reactive, watch } from "vue";
import { onLoad, onUnload, onBackPress } from '@dcloudio/uni-app'
import api from '../../common/api'
import http from '../../utils/http'
import util from '../../utils/util'
import uni from '../../utils/uni'
import config from "../../common/config";

const dataObj = reactive({
    list: [] as any,
    categoryName: ''
})

onLoad(async (option: any) => {
    if (option.categoryId) {
        getArticleList(option.categoryId)
    }
})

// 获取文章列表
async function getArticleList(categoryId: any) {
    const res: any = await http({
        url: api.science.getArticleList,
        method: "GET",
        data: {
            name: '',
            categoryId: categoryId,
            pageNum: 1,
            pageSize: 1000,
            enableFlag: 'Y'
        },
        hideLoading: false,
    })
    if (res.resp_code === 0) {
        dataObj.list = res.datas.records || []
    }
}

// 阅读
async function setRead(articleId: string) {
    const res: any = await http({
        url: api.science.readCount,
        method: "POST",
        data: {
            articleId: articleId,
        },
        hideLoading: false,
    })
}

// 文章详情
async function handleGoarticle(item: any) {
    setRead(item.id)
    if (item.type === 0) {
        window.location.href = item.redirectUrl
    } else {
        uni.navigateTo(`1`)
    }
}
</script>

<style lang="scss" scoped>
@import './list.scss'
</style>
