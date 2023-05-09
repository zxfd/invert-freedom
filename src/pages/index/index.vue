<template>
  <div class="input-area">
    <div class="item">
      <div class="label">当前年收入</div>
      <input
        type="text"
        class="input"
        v-model.number="form.income" />
      <div class="unit">元</div>
    </div>

    <div class="item">
      <div class="label">已有金额</div>
      <input
        type="text"
        class="input"
        v-model.number="form.init" />
      <div class="unit">元</div>
    </div>

    <div class="item">
      <div class="label">当前存储率</div>
      <input
        type="text"
        class="input"
        v-model="form.saveRatio" />
    </div>

    <div class="item">
      <div class="label">当前年化收益率</div>
      <input
        type="text"
        class="input"
        v-model="form.invertRatio" />
    </div>
  </div>
  <div class="output-area">
    <div class="item">
      <div class="label">
        覆盖开销所需要的年限是{{ yearToMoreThanSpend.year }}年
      </div>
    </div>

    <div class="item">
      <div class="label">
        覆盖收入所需要的年限是{{ yearToMoreThanIncome.year }}年
      </div>
    </div>

    <div class="item">
      <div class="label">
        覆盖收入+开销的年限是{{ yearToMoreThanIncomeAndSpend.year }}年
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app"

import {
  yearMoreThanSpend,
  yearMoreThanIncome,
  yearMoreThanIncomeAndSpend,
} from "@/utils/tools"

const share = () => {
  return {
    title: "来算算还要打工多少年才能自由？",
    path: "/pages/index/index",
  }
}

onShareAppMessage(share)
onShareTimeline(share())

const form = ref({
  income: 0,
  saveRatio: 0.6,
  invertRatio: 0.06,
  init: 0,
})

const yearToMoreThanSpend = computed(() => {
  return yearMoreThanSpend(form.value)
})

const yearToMoreThanIncome = computed(() => {
  return yearMoreThanIncome(form.value)
})

const yearToMoreThanIncomeAndSpend = computed(() => {
  return yearMoreThanIncomeAndSpend(form.value)
})
</script>

<style lang="scss" scoped>
.input-area,
.output-area {
  width: 750rpx;
  .item {
    margin-top: 20rpx;
    display: flex;
    justify-content: center;
    .input {
      margin: 0 20rpx;
      width: 150rpx;
      outline: 2rpx solid lightcoral;
      border-radius: 8rpx;
    }
  }
}
.output-area {
  margin-top: 80rpx;
}
</style>
