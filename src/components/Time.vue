<template>
    <view class="time-scroll-container">
        <scroll-view scroll-x="true" class="" :class="[bgColor === '#fff' ? 'time-scroll100' : 'time-scroll']">
            <view class="time-container">
                <view v-for="(item, index) of state.dateList" :key="index"
                    :class="[item.check ? 'time-item time-item-active' : 'time-item  ']" @click="handleTimeActive(item)">
                    <view class="item-text">{{ item.weekStr }}</view>
                    <view :class="[item.check ? 'item-val item-val-active' : 'item-val  ']">{{ item.dateStr }}</view>
                </view>
            </view>
        </scroll-view>
    </view>
</template>

<script setup  lang="ts">
import moment from 'moment'
import { ref, toRef, reactive, watch } from "vue";
import { onLoad, onUnload, onBackPress } from '@dcloudio/uni-app'
import uni from '../utils/uni';
import util from './../utils/util'
import config from './../common/config'

const props = defineProps({
    bgColor: {
        type: String,
        default: '#F7F8FC'
    },
    isDetail: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits(['click'])
const state = reactive({
    dateList: [] as any[]
})

onLoad(() => {
    let startDate = moment(new Date()).format('YYYY-MM-DD')
    let endDate = moment(new Date()).add(14, 'days').format('YYYY-MM-DD')
    let startDateTmp = moment(new Date()).format('MM-DD')

    getAll(startDate, endDate)

    if (props.isDetail) {

    } else {

    }
})

// 选中
function handleTimeActive(item: any) {
    for (let dateItem of state.dateList) {
        dateItem.check = false
    }
    item.check = true
    emits('click', item)
}

// 获取两周日期
function getAll(begin: string, end: string) {
    let allDate = new Array();
    let i = 0;
    while (begin <= end) {
        let week = ''
        switch (moment(begin).day()) {
            case 1:
                week = '一'
                break;
            case 2:
                week = '二'
                break;
            case 3:
                week = '三'
                break;
            case 4:
                week = '四'
                break;
            case 5:
                week = '五'
                break;
            case 6:
                week = '六'
                break;
            case 0:
                week = '日'
                break;
        }

        allDate[i] = {
            weekStr: week,
            dateStr: begin.replace(`${new Date().getFullYear()}-`, '').replace(`2023-`, '').replace(`2024-`, '').replace(`2025-`, '').replace(`2026-`, ''),
            check: false,
            dateAll: begin
        };
        let begin_ts = new Date(begin).getTime();
        let next_date = begin_ts + 24 * 60 * 60 * 1000;
        let next_dates_y = new Date(next_date).getFullYear() + "-";
        let next_dates_m =
            new Date(next_date).getMonth() + 1 < 10
                ? "0" + (new Date(next_date).getMonth() + 1) + "-"
                : new Date(next_date).getMonth() + 1 + "-";
        let next_dates_d =
            new Date(next_date).getDate() < 10
                ? "0" + new Date(next_date).getDate()
                : new Date(next_date).getDate();
        begin = next_dates_y + next_dates_m + next_dates_d;
        i++;
    }
    state.dateList = allDate || []
}
</script>

<style lang="scss" scoped>
.time-scroll-container {
    margin: 0 auto;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.time-scroll {
    width: calc(100vw - 48rpx);
    background: v-bind('bgColor');
}

.time-scroll100 {
    width: calc(100vw);
    background: v-bind('bgColor');
}

.time-container {
    padding: 0rpx 24rpx;
    padding-top: 24rpx;
    font-size: 24rpx;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: space-between;

    .time-item {
        width: 100rpx;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        padding: 16rpx 0;
        flex-shrink: 0;

        .item-text {}

        .item-val {
            margin-top: 24rpx;
            font-size: 28rpx;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.9);

            &-active {
                color: #E80E41;
            }
        }

        &-active {
            background: #FFF0F7;
            border-radius: 8rpx;
            position: relative;
            color: #E80E41;

            image {
                width: 24rpx;
                height: 34rpx;
                position: absolute;
                bottom: 0;
                right: 0;
            }
        }
    }
}
</style>
