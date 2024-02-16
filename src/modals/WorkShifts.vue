<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
        <p class="modal-card-title">Chọn ca làm</p>
        <button class="modal-close is-large" @click="$emit('close')"></button>
    </header>
    <section class="modal-card-body">
       <div class="map">
        <!-- <GGmaps/> -->
       </div>
       <div class="wifi">
        <span>Kết nối: wifi</span>
        <div class="detail">
          <div class="name">GUTA cafe</div>
          <div class="bssid">bssid: e8:6e:44:58:94:03</div>
        </div>
       </div>
       <div class="shifts-list">
        <p>Bạn đang có 1 ca làm việc, chọn 1 ca để vào</p>
        <div class="shift-item">
          <b-radio v-model="radio" name="name" native-value="1">
            <div class="detail">
              <span>Thứ 6</span>
              <div class="type-shift">( 08:00 - 11:00 )</div>
            </div>
          </b-radio>
        </div>
       </div>
    </section>
    <footer class="modal-card-foot">
        <b-button
          label="Xác nhận"
          type="is-success"
          expanded
          @click="handleSubmit()"
        />
    </footer>
  </div>
</template>
<script>
import GGmaps from '@/components/GGmaps.vue';
export default {
  components: {
    GGmaps,
  },
  props: [
    'isIn'
  ],
  data() {
    return {
      radio: 1,
    }
  },
  mounted() {
  },
  methods: {
    handleSubmit() {
      var a = this.isIn
      console.log(a)
      this.$emit('updateInO')
      this.$parent.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-card {
  animation: slide .5s;
  .modal-card-head {
    padding: 20px 10px 0 10px;
    text-align: center;
    background-color: #fff;
    border: none;
    p {
      font-weight: 600;
      font-size: 20px;
    }
    .modal-close {
      background-color: transparent;
      right: 10px;
      top: 18px;
      &::after {
        background-color: #000;
      }
      &::before {
        background-color: #000;
      }
    }
  }
  .modal-card-body {
    padding: 20px 10px 10px 10px;
    .map {
      height: 160px;
      width: 100%;
      border-radius: 10px;
      background-color: #1446ba;
    }
    .wifi {
      margin-top: 10px;
      height: 60px;
      padding: 8px;
      width: 100%;
      background-color: #c2e2ff3b;
      border-radius: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 16px;
        font-weight: 600;
        color: #989fa0;
      }
      .detail {
        text-align: right;
        .name {
          font-size: 16px;
          font-weight: 700;
        }
        .bssid {
          font-size: 12px;
          font-weight: 600;
          color: #989fa0;
        }
      }
    }
    .shifts-list {
      margin-top: 10px;
      width: 100%;
      text-align: center;
      p {
        font-weight: 600;
      }
      .shift-item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 4px;
        width: 100%;
        height: 60px;
        padding: 10px;
        border-radius: 10px;
        background-color: #c2e2ff3b;
        .detail {
          text-align: left;
          .type-shift {
            margin-top: 4px;
            font-size: 12px;
            color: #989fa0;
          }
        }
      }
    }
  }
  .modal-card-foot {
    padding: 10px;
    background-color: #fff;
    border-top: none;
    .b-button {
      font-size: 30px;
    }
  }
}
@keyframes slide {
    0% {right: -454px;}
    60% {right: 0;}
}
</style>