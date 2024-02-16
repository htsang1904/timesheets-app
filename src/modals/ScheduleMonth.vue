<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
        <div class="close-btn" @click="$emit('close')">
          <i class="fas fa-chevron-left"></i>
        </div>
        <p class="modal-card-title">Lịch công</p>
        <el-date-picker
          v-model="selectedDate"
          type="date"
          placeholder="Chọn ngày"
          format="dd/MM/yyyy"
          class="custom-datepicker"
          popper-class="custom-popper">
        </el-date-picker>
    </header>
    <section class="modal-card-body">
      <div class="shift-of-month">
        <div class="date">
          <span>
            T2
          </span>
          <h4>
            16
          </h4>
        </div>
        <div class="shifts">
          <div class="shift-item">
            <div class="detail">
              <div>
                <div class="type-work">Cửa Hàng</div>
                <div class="time">8:00 - 11:00</div>
              </div>
              <div class="status">
                <el-button size="mini" type="success">Đã xong</el-button>
              </div>
            </div>
            <div class="location">
              <div>
                <i class="fas fa-map-marker-alt"></i>
                146 Nguyễn Văn Thủ
              </div>
              <div class="type-shift">
                8:00 - 11:00
              </div>
            </div>
          </div>
          <div class="shift-item">
            <div class="detail">
              <div>
                <div class="type-work">Cửa Hàng</div>
                <div class="time">11:10 - 17:00</div>
              </div>
              <div class="status">
                <el-button size="mini" type="warning">Trễ giờ</el-button>
              </div>
            </div>
            <div class="location">
              <div>
                <i class="fas fa-map-marker-alt"></i>
                146 Nguyễn Văn Thủ
              </div>
              <div class="type-shift">
                11:00 - 17:00
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="shift-of-month">
        <div class="date">
          <span>
            T3
          </span>
          <h4>
            17
          </h4>
        </div>
        <div class="shifts">
          <div class="shift-item">
            <div class="detail">
              <div>
                <div class="type-work">Cửa Hàng</div>
                <div class="time">8:00</div>
              </div>
              <div class="status">
                <el-button size="mini" type="danger">Chưa ra ca</el-button>
              </div>
            </div>
            <div class="location">
              <div>
                <i class="fas fa-map-marker-alt"></i>
                146 Nguyễn Văn Thủ
              </div>
              <div class="type-shift">
                8:00 - 11:00
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- <footer class="modal-card-foot">
        <b-button
          label="Xác nhận"
          type="is-success"
          expanded
          @click="$parent.close()"
        />
    </footer> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedDate: new Date(),
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.modal-card {
  animation: slide .5s;
  .modal-card-head {
    padding: 20px 10px 10px 10px;
    text-align: center;
    background-color: #fff;
    border: none;
    p {
      font-weight: 600;
      font-size: 20px;
    }
    .close-btn {
      width: 40px;
    }
    .el-date-editor.custom-datepicker.el-input.el-input--prefix.el-input--suffix.el-date-editor--date {
      width: 140px;
    }
  }
  .modal-card-body {
    padding:  0 10px;
    .shift-of-month {
      min-height: 80px;
      display: flex;
      padding: 4px 10px;
      margin: 8px 0;
      background-color: #cae2ef4b;
      border-radius: 14px;
      .date {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        flex: 1;
        span {
          color: #989fa0;
          font-weight: 700;
        }
        h4 {
          font-size: 28px;
          font-weight: 700;
          color: #034AB3;
        }
      }
      .shifts {
        flex: 5;
        .shift-item {
          margin: 10px 0;
          .detail {
            height: 48px;
            display: flex;
            justify-content: space-between;
            border-left: 4px solid #1CA7EC;
            padding-left: 10px;
            .type-work {
              font-weight: 600;
            }
            .time {
              font-weight: 700;
              font-size: 17px;
              color: #034AB3;
            }
          }
          .location {
              margin-top: 4px;
              padding-top: 4px;
              display: flex;
              justify-content: space-between;
              font-size: 12px;
              font-weight: 600;
              color: #A9A9A9;
              border-top: 0.1px solid rgba(0, 0, 0, 0.125);;
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