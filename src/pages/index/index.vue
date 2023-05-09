<template>
  <div class="page">
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

    <div class="detail-area">
      <div
        class="detail-item"
        v-for="info in yearToMoreThanIncomeAndSpend.needList"
        :key="info.year">
        <div class="row">
          <div class="year">第{{ info.year }}年</div>
          <div
            class="free"
            v-if="freedom(info)">
            {{ freedom(info) }}自由!
          </div>
        </div>

        <div class="row">
          <div class="label">总资产</div>
          <div class="value">{{ info.total }}</div>
        </div>

        <div class="row">
          <div class="label">初始金额本息</div>
          <div class="value">{{ info.initTotal }}</div>
        </div>

        <div class="row">
          <div class="label">增量资金本息</div>
          <div class="value">{{ info.newTotal }}</div>
        </div>

        <div class="row">
          <div class="label">当年投资收益</div>
          <div class="value">{{ info.invertNum }}</div>
        </div>

        <div class="row">
          <div class="label">年度开销</div>
          <div class="value">{{ info.spendNum }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineComponent } from "vue"
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
  income: 204000,
  saveRatio: 0.75,
  invertRatio: 0.06,
  init: 260000,
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

const freedom = computed(() => {
  return (info) => {
    const { isMoreThanSpend, isMoreThanIncome, isMoreThanIncomeAndSpend } = info

    if (isMoreThanIncomeAndSpend) {
      return "开销+收入"
    }

    if (isMoreThanIncome) {
      return "收入"
    }

    if (isMoreThanSpend) {
      return "开销"
    }

    return false
  }
})
</script>

<style lang="scss" scoped>
.page {
  background: #f0f2f8;
}
.input-area,
.output-area {
  margin: 0 auto;
  width: 686rpx;
  background: #fff;
  border-radius: 32rpx;
  padding: 30rpx;
  box-sizing: border-box;
  .item {
    margin-top: 20rpx;
    display: flex;
    .input {
      margin: 0 20rpx;
      width: 150rpx;
      border-bottom: 2rpx solid #a3a9b8;
    }
  }
}
.output-area {
  margin-top: 32rpx;
}

.detail-area {
  margin: 0 auto;
  margin-top: 32rpx;
  width: 686rpx;
}

.detail-item {
  margin-top: 20rpx;
  padding: 40rpx;
  border-radius: 32rpx;
  background: #fff;
  .row {
    margin-top: 12rpx;
    display: flex;
    justify-content: space-between;
  }
}
</style>
