<template>
    <view class="page-wrapper">
        <view class="container" :class="[state.form.formStatus !== 1 ? 'status-wrapper' : '']">

            <template v-if="state.form.formStatus === 1">
                <image :src="state.form.banner" class="header-bg" />
                <view class="title" v-if="state.form.formName">
                    {{ state.form.formName }}
                </view>
                <view class="description" v-if="state.form.description">
                    {{ state.form.description }}
                </view>
                <view class="jx-form">
                    <view class="jx-form__item" v-for="(item, index) of state.formList" :key="index">
                        <view class="jx-item__label" :class="[item.verify.required ? 'jx-item__label--required' : '']">
                            {{ state.global.showNum ? (`${index + 1}.`) : '' }}{{ item.base.title }}：
                        </view>
                        <view class="item-container">

                            <!-- 单行文本 -->
                            <template v-if="item.base.controlType === 'input'">
                                <view class="jx-input-container">
                                    <user-outlined type="user" v-if="item.verify.icon === 'user'" class="jx-input__icon" />
                                    <mobile-outlined v-if="item.verify.icon === 'tel'" class="jx-input__icon" />
                                    <input class="jx-input " :class="item.verify.icon ? 'jx-input__hasicon' : ''"
                                        v-model="item.data.value" :type="item.verify.type"
                                        :placeholder="item.base.placeholder" />
                                </view>
                            </template>

                            <!-- 多行文本 -->
                            <template v-if="item.base.controlType === 'textarea'">
                                <textarea class="jx-textarea" v-model="item.data.value"
                                    placeholder-class="jx-textarea__placeholder" :placeholder="item.base.placeholder"
                                    maxlength="500" />
                            </template>

                            <!-- 单选 -->
                            <template v-if="item.base.controlType === 'radio'">
                                <van-radio-group v-model="item.data.activeValue" class="jx-radio-group">
                                    <van-radio :key="radioItem.value" :name="radioItem.value"
                                        v-for="(radioItem, radioIndex) in item.data.options"
                                        :class="[item.data.value === radioItem.value ? 'jx-radio jx-radio__active' : 'jx-radio', radioItem.type === 'other' ? 'jx-radio__other' : '']">
                                        <template #icon="props">
                                            <image src="./../../static/imgs/radio-ck.png" class="jx-radio__icon"
                                                v-if="props.checked"></image>
                                            <image src="./../../static/imgs/radio-def.png" class="jx-radio__icon"
                                                v-if="!props.checked"></image>
                                            <view class="jx-radio__label">{{ radioItem.label }}</view>
                                        </template>
                                    </van-radio>
                                    <input class="jx-other__input" v-model="item.data.otherValue" placeholder="请填写"
                                        v-if="showOther(item, item.data.activeValue, 'radio')" />
                                </van-radio-group>
                            </template>

                            <!-- 多选 -->
                            <template v-if="item.base.controlType === 'checkbox'">
                                <van-checkbox-group v-model="item.data.activeValue" class="jx-checkbox-group">
                                    <van-checkbox v-for="(checkboxItem, checkboxIndex) in item.data.options"
                                        :key="checkboxItem.value"
                                        :class="[item.data.value.indexOf(checkboxItem.value) > -1 ? 'jx-checkbox jx-checkbox__active' : 'jx-checkbox', checkboxItem.type === 'other' ? 'jx-checkbox__other' : '']"
                                        :name="checkboxItem.value">
                                        <template #icon="props">
                                            <image src="./../../static/imgs/checkbox-ck.png" class="jx-checkbox__icon"
                                                v-if="props.checked"></image>
                                            <image src="./../../static/imgs/checkbox-def.png" class="jx-checkbox__icon"
                                                v-if="!props.checked"></image>
                                            <view class="jx-checkbox__label">{{ checkboxItem.label }}</view>
                                        </template>
                                    </van-checkbox>
                                    <input class="jx-other__input" v-model="item.data.otherValue" placeholder="请填写"
                                        v-if="showOther(item, item.data.activeValue, 'checkbox')" />
                                </van-checkbox-group>
                            </template>

                            <!-- 下拉框 -->
                            <template v-if="item.base.controlType === 'select'">
                                <view class="jx-select-container">
                                    <view class="uni-input-wrapper">
                                        <input class="jx-input " v-model="item.data.selectLabel" disabled
                                            :placeholder="item.base.placeholder" @click="item.showPicker = true" />
                                        <image src="./../../static/imgs/arrow-down.png" class="arrow-down-icon"></image>
                                    </view>
                                    <van-popup v-model:show="item.showPicker" round position="bottom">
                                        <van-picker :columns="item.data.options" :columns-field-names="{
                                            text: 'label',
                                            value: 'value'
                                        }" @cancel="item.showPicker = false"
                                            @confirm="handleConfirmSelect(item, $event)" />
                                    </van-popup>
                                </view>
                            </template>

                            <!-- 性别 -->
                            <template v-if="item.base.controlType === 'sex'">
                                <view class="jx-sex-container">
                                    <view :class="[item.data.value === '男' ? 'jx-sex__active' : '']"
                                        @click="item.data.value = '男'">
                                        <image src="./../../static/imgs/men.png"></image>
                                        男
                                    </view>
                                    <view :class="[item.data.value === '女' ? 'jx-sex__active' : '']"
                                        @click="item.data.value = '女'">
                                        <image src="./../../static/imgs/women.png"></image>
                                        女
                                    </view>
                                </view>
                            </template>
                        </view>
                    </view>
                </view>

                <view class="jx-submit__btn">
                    <van-button :disabled="state.submitBtnStatus" @click="handleSubmit">提交</van-button>
                </view>
            </template>

            <view class="status" v-if="state.form.formStatus === 2">
                <image src="./../../static/imgs/stop.png"></image>
                <view>表单已停止发布～</view>
            </view>

            <view class="status" v-if="state.form.formStatus === 0">
                <image src="./../../static/imgs/undeploy.png"></image>
                <view>表单未发布～</view>
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
import uniUtil from '../../utils/uni'
import config from "../../common/config";
import { PlusOutlined, EllipsisOutlined, SearchOutlined, DownOutlined, DeleteOutlined, ReloadOutlined, UserOutlined, MobileOutlined } from '@ant-design/icons-vue'
import moment from 'moment'

const state = reactive({
    form: {} as any,
    banner: "",
    formList: [] as any,
    deviceInfo: {} as any,
    formId: '',
    openId: '',
    appId: '',
    openTime: '',
    endTime: '',
    userInfo: {} as any,
    userCallBackUrl: '',
    submitBtnStatus: false,
    global: {
        showNum: false
    }
})

onLoad(async (option: any) => {
    uni.getSystemInfo({
        success: function (res) {
            state.deviceInfo = res
        }
    });
    state.openTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')

    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') != -1;
    if (isWeixin) {
        if (!option.code) {
            window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${option.wxAppId}&redirect_uri=${encodeURIComponent(window.origin)}/jx-form/&response_type=code&scope=snsapi_base&state=${option.formId},${option.wxAppId}&connect_redirect=1#wechat_redirect`;
        }

        if (option.code) {
            let optionState = option.state
            let arr = optionState.split(',')
            state.formId = arr[0]
            state.appId = arr[1]
            authWxUser(option.code, state.formId)
            if (state.formId) {
                state.formId = option.formId
                getForm()
            }
        }
    } else {
        if (option.wxAppId) {
            state.appId = option.wxAppId
        }
        if (option.formId) {
            state.formId = option.formId
            getForm()
        }
    }
})

// 处理数据
function dealData() {

}

// 提交订单
async function handleSubmit() {
    try {
        state.submitBtnStatus = true
        state.endTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        let score = 0

        let tmpList = JSON.parse(JSON.stringify(state.formList))


        for (let i = 0; i < tmpList.length; i++) {
            let item = tmpList[i]
            let verify = item.verify
            let data = item.data
            let base = item.base
            if (verify.required) {
                if (!data.value && (base.controlType === 'input' || base.controlType === 'textarea')) {
                    uniUtil.toast('请输入' + base.title)
                    state.submitBtnStatus = false
                    return
                }

                if (!data.value && (base.controlType === 'select' || base.controlType === 'radio')) {
                    uniUtil.toast('请选择' + base.title)
                    state.submitBtnStatus = false
                    return
                }

                if ((!data.value || data.value.length <= 0) && (base.controlType === 'checkbox')) {
                    uniUtil.toast('请选择' + base.title)
                    state.submitBtnStatus = false
                    return
                }
            }

            if (verify.type === 'tel' && data.value) {
                const reg = /^1[3,4,5,6,7,8,9][0-9]{9}$/
                if (reg.test(data.value)) {
                } else {
                    uniUtil.toast('请输入正确的手机号')
                    state.submitBtnStatus = false
                    return
                }
            }

            if (base.controlType === "select") {
                if (data.enableOptionAssignment) {
                    score = score + data.value
                    data.value = data.value
                    data.valueLabel = data.selectLabel
                } else {
                    data.value = data.selectLabel
                }
            }

            if (base.controlType === 'radio') {
                for (let k = 0; k < data.options.length; k++) {
                    let optionItem = data.options[k]
                    if (data.activeValue === optionItem.value) {
                        if (optionItem.type === 'common') {
                            data.value = optionItem.value
                            if (data.enableOptionAssignment) {
                                score = score + optionItem.value
                                data.valueLabel = optionItem.label
                            } else {
                                data.value = data.activeValue
                            }
                        }
                        if (optionItem.type === 'other') {
                            if (data.enableOptionAssignment) {
                                score = score + optionItem.value
                                data.value = optionItem.value
                                data.valueLabel = data.otherValue
                            } else {
                                data.value = data.otherValue
                            }
                        }

                    }
                }
            }

            if (base.controlType === 'checkbox') {
                data.value = []
                data.valueLabel = []
                for (let k = 0; k < data.options.length; k++) {
                    let optionItem = data.options[k]
                    if (data.activeValue) {
                        for (let f = 0; f < data.activeValue.length; f++) {
                            let activeValueItem = data.activeValue[f]
                            if (optionItem.value === activeValueItem) {

                                if (optionItem.type === 'common') {
                                    data.value.push(optionItem.value)
                                    if (data.enableOptionAssignment) {
                                        score = score + optionItem.value
                                        data.valueLabel.push(optionItem.label)
                                    }
                                }
                                if (optionItem.type === 'other') {
                                    if (data.enableOptionAssignment) {
                                        score = score + optionItem.value
                                        data.value.push(optionItem.value)
                                        data.valueLabel.push(data.otherValue)
                                    } else {
                                        data.value.push(data.otherValue)
                                    }
                                }
                            }
                        }
                    }
                }
            }

            delete item.showPicker
            if (item.data.selectLabel) {
                delete item.data.selectLabel
            }
            if (item.data.activeValue) {
                delete item.data.activeValue
            }
            if (item.data.otherValue) {
                delete item.data.otherValue
            }
        }

        const res: any = await http({
            url: api.submitForm,
            method: "POST",
            data: {
                formId: state.formId,
                version: state.form.version,
                content: JSON.stringify({
                    question: tmpList,
                    global: state.form.global
                }),
                unionid: state.openId,
                userInfo: JSON.stringify(state.userInfo),
                openTime: state.openTime,
                score,
                deviceId: state.deviceInfo.deviceId,
                machineInfo: JSON.stringify(state.deviceInfo),
                costTime: moment(state.endTime).diff(moment(state.openTime), 'seconds')
            },
            hideLoading: false,
        })
        state.submitBtnStatus = false
        if (res.resp_code === 0) {
            uniUtil.reLaunch(`/pages/result/result?formName=${state.form.formName}`)
        } else {
            uniUtil.toast(res.resp_msg)
        }
    } catch (error) {
        console.error(error)
        state.submitBtnStatus = false
    }
}

// 微信公众号
async function authWxUser(code: string, formId: string) {
    try {
        const res: any = await http({
            url: api.authWxUser,
            method: "GET",
            data: {
                formId: formId,
                code: code,
            },
            hideLoading: false,
        })
        if (res.resp_code === 0) {
            let data = res.datas
            state.openId = data.openId
            state.userCallBackUrl = data.userCallBackUrl
            if (state.userCallBackUrl) {
                userCallBackReq(state.openId, state.userCallBackUrl)
            }
        } else {
            uniUtil.toast(res.resp_msg)
        }
    } catch (error) {
        console.error(error)
    }
}

// 请求
async function userCallBackReq(openId: string, url: string) {
    try {
        const res: any = await http({
            url: url,
            method: "GET",
            data: {
                openId: openId,
            },
            hideLoading: false,
        },
            true
        )
        if (res.resp_code === 0) {
            let data = res.datas
            state.userInfo = data
        } else {
            uniUtil.toast(res.resp_msg)
        }
    } catch (error) {
        console.error(error)
    }
}

// 下拉框选中
function handleConfirmSelect(item: any, event: any) {
    try {
        let index = event.selectedIndexes[0]
        item.showPicker = false
        item.data.selectLabel = item.data.options[index].label || ''
        item.data.value = item.data.options[index].value || ''
    } catch (error) {
        console.error(error)
    }
}

// 是否显示其他
function showOther(item: any, activeValue: any, controlType: string) {
    let option = item.data.options || []
    if (!activeValue) return false
    let flag = false

    for (let i of option) {
        if (controlType === 'radio') {
            if (i.value === activeValue && i.type === 'other') {
                flag = true
            }
        }
        if (controlType === 'checkbox') {
            for (let k = 0; k < activeValue.length; k++) {
                let activeItem = activeValue[k]
                if (typeof activeItem === 'number' && !isNaN(activeItem)) {
                    activeItem = activeItem.toString()
                }
                if (activeItem.indexOf(i.value) > -1 && i.type === 'other') {
                    flag = true
                }
            }
        }
    }
    return flag
}

// 获取表单详情
async function getForm() {
    try {
        const res: any = await http({
            url: api.getForm,
            method: "GET",
            data: {
                formId: state.formId
            },
            hideLoading: false,
        })
        if (res.resp_code === 0) {
            uniUtil.setNavigationTitle(res.datas.formName)
            state.form = JSON.parse(JSON.stringify(res.datas))
            let tmpObj = JSON.parse(state.form.content)
            let tmpList = tmpObj.question || []
            state.global = tmpObj.global
            for (let i = 0; i < tmpList.length; i++) {
                tmpList[i].showPicker = false
            }
            state.formList = tmpList
            openForm()
        }
    } catch (error) {
        console.error(error)
    }

}

// 打开表单
async function openForm() {
    try {
        const res: any = await http({
            url: api.openForm,
            method: "GET",
            data: {
                formId: state.formId,
                deviceId: state.deviceInfo.deviceId,
                version: state.form.version
            },
            hideLoading: false,
        })
    } catch (error) {
        console.error(error)
    }
}

</script>

<style lang="scss" scoped>
::v-deep .uni-radio-input {
    width: 26rpx !important;
    height: 26rpx !important;
}

::v-deep .uni-radio-input.uni-radio-input-checked::before {
    display: none !important;
}


@import './index.scss';
@import './form.scss';
</style>
