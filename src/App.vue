<template>
  <div id="app">
    <div class="header">
      <div class="avatar">
        <img src="./assets/download.jpg" alt="">
      </div>
      <div class="user-info">
        <div class="name">Huỳnh Thanh Sang</div>
        <div class="position">Nhân viên</div>
      </div>
    </div>
    <div class="schedule">
      <div class="schedule-title" @click="openScheduleMonthModal()">
        <span>Lịch làm việc</span>
        <i class="fas fa-chevron-right"></i>
      </div>
      <div class="schedule-week">
        <div class="date" v-for="(date, index) in currentWeekDays" :key="index" :class="{ 'active': index == currentSelectedDate }"
        @click="seletedDate(index)"
        >
          <div class="code">{{ date.code }}</div>
          <div class="date-num">{{ date.dateNum }}</div>
          <div class="shifts-num">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>
      </div>
      <div>
        <div v-if="!isIn" class="InO-shift is-in" @click="openWorkShiftsModal()">
          <div>
            <div class="in-title">
              Vào ca
            </div>
            <div class="in-time">
              <RealtimeClock/>
            </div>
          </div>
          <div class="timekeeping-icon">
            <i class="fas fa-fingerprint"></i>
          </div>
        </div>
        <div v-else class="InO-shift is-out" @click="centerDialogVisible = true">
          <div class="out-title">
            <span class="out-date">Thứ năm</span>
            <span class="work-shift">8:00 - 11:00</span>
          </div>
          <div class="out-buttons">
            <button type="button">Ra ca</button>
            <div class="location-icon">
              <i class="fas fa-map-marker-alt"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="folder">
        <span>Thư mục</span>
        <div class="folder-container">
          <div class="folder-item" @click="openWorkingHourModal()">
            <div class="icon">
              <i class="fas fa-hourglass-half"></i>
            </div>
            <span>Giờ công</span>
          </div>
          <div class="folder-item">
            <div class="icon">
              <i class="far fa-hourglass"></i>
            </div>
            <span>Giờ công</span>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
    title="Thông báo"
    :visible.sync="centerDialogVisible"
    width="80%"
    center>
    <span>Bạn muốn tiếp tục <strong>Ra ca</strong>?</span>
    <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Hủy</el-button>
        <el-button type="primary" @click="outShift()">Xác nhận</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import RealtimeClock from './components/RealtimeClock.vue'
import WorkShifts from './modals/WorkShifts.vue'
import ScheduleMonth from './modals/ScheduleMonth.vue'
import WorkingHour from './modals/WorkingHour.vue'
moment.locale('vi')
export default {
  name: 'App',
  components: {
    RealtimeClock,
    WorkShifts,
    ScheduleMonth,
    WorkingHour
  },
  data() {
    return {
      isIn: false,
      centerDialogVisible: false,
      currentSelectedDate: null,
      weekStart: null,
      weekEnd: null,
      currentWeekDays: [],
      storeWorkShifts: [{
              name: 'Ca sáng',
              shortName: 'Ca 1',
              timeStart: '08:00',
              timeEnd: '12:00',
              code: 'CA_SANG'
          },
          {
              name: 'Ca chiều',
              shortName: 'Ca 2',
              timeStart: '13:00',
              timeEnd: '17:00',
              code: 'CA_CHIEU'
          },
          {
              name: 'Ca tối',
              shortName: 'Ca 3',
              timeStart: '18:00',
              timeEnd: '22:00',
              code: 'CA_TOI'
          },
      ],
      weekShifts: [],
      tableData: [
          {
              employee: 'Sang',
              work_shifts: []
          },
          {
              employee: 'Sang1',
              work_shifts: []
          },
          {
              employee: 'Sang2',
              work_shifts: []
          },
      ],
      value1: new Date()
    }
  },
  mounted() {
        this.createStoreWeekShifts()
  },
  computed: {
  },
  methods: {
    createStoreWeekShifts() {
        this.weekStart = moment().startOf('week').format('YYYY-MM-DD')
        this.weekEnd = moment().endOf('week').format('YYYY-MM-DD')
        /** Tạo ngày trong tuần cho Lịch */
        const currentWeekDays = []
        for (let i = 0; i < 7; i++) {
            const day = moment().startOf('week').add(i, 'days')
            currentWeekDays.push({
                code: day.format('ddd').toUpperCase(),
                name: day.format('dddd').charAt(0).toUpperCase() + day.format('dddd').slice(1),
                dateNum: day.format('DD')
            })
        }
        this.currentWeekDays = currentWeekDays
        console.log("week",this.currentWeekDays)
        // lấy ngày hiện tại
        const currentDateCode = moment().format('ddd').toUpperCase()
        let currentDateIndex = currentWeekDays.findIndex(e => e.code == currentDateCode)
        this.seletedDate(currentDateIndex)
        /** Tạo danh sách ca theo ngày và tuần */
        const storeWeekShifts = []
        for (let i = 0; i < 7; i++) {
            const storeWeekShift = {
                date: moment().add(i, 'days').format('YYYY-MM-DD'),
                shifts: []
            }
            for (let j = 0; j < this.storeWorkShifts.length; j++) {
                const storeWorkShift = this.storeWorkShifts[j]
                storeWeekShift.shifts.push({
                    ...storeWorkShift,
                    date: storeWeekShift.date,
                    code: storeWorkShift.code + '_' + storeWeekShift.date
                })
                storeWeekShift.employees = []
            }
            storeWeekShifts.push(storeWeekShift)
        }
        this.weekShifts = storeWeekShifts
        console.log("week shifts",this.weekShifts)
    },
    seletedDate(index) {
      this.currentSelectedDate = index
    },
    openWorkShiftsModal() {
      const modal = this.$buefy.modal.open({
        parent: this,
        component: WorkShifts,
        hasModalCard: false,
        trapFocus: true,
        fullScreen: true,
        canCancel: false,
        props: {
          isIn: this.isIn,
        },
        events: {
          updateInO: () => {
            this.isIn = true
          }
        },
      })
    },
    openScheduleMonthModal() {
      this.$buefy.modal.open({
        parent: this,
        component: ScheduleMonth,
        hasModalCard: false,
        trapFocus: true,
        fullScreen: true,
        canCancel: false,
        scroll: 'clip'
      })
    },
    openWorkingHourModal() {
      this.$buefy.modal.open({
        parent: this,
        component: WorkingHour,
        hasModalCard: false,
        trapFocus: true,
        fullScreen: true,
        canCancel: false,
      })
    },
    outShift() {
      this.centerDialogVisible = false
      this.isIn = false
    }
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}
#app {
  padding: 10px;
  background-color: #dcecff57;
  height: 100%;
  min-height: 100vh;
}
.header {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .avatar {
    margin-right: 14px;
    height: 50px;
    width: 50px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 12px;
      object-fit: cover;
    }
  }
  .user-info {
    .name {
      font-weight: 700;
      font-size: 16px;
    }
    .position {
      font-size: 14px;
      font-weight: 600;
      color: rgb(155, 154, 154);
    }
  }
}
.schedule {
  margin-top: 14px;
  .schedule-title {
    font-size: 18px;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
  .schedule-week {
    margin-top: 6px;
    display: flex;
    justify-content: space-around;
    width: 100%;
    .date {
      text-align: center;
      width: 12%;
      padding: 4px 10px;
      background-color: #cae2ef4b;
      border-radius: 8px;
      .code {
        font-size: 12px;
        font-weight: 700;
        color: #989fa0;
      }
      .date-num {
        font-size: 16px;
        font-weight: 700;
      }
      .shifts-num {
        margin-top: 2px;
        display: flex;
        justify-content: space-evenly;
        .dot {
          height: 4px;
          width: 4px;
          background-color: rgb(255, 79, 79);
          border-radius: 50%;
        }
      }
    }
  }
}
.active {
    border: 2px solid #034AB3;
    .date-num {
      color: #034AB3;
    }
}
.InO-shift {
  margin-top: 20px;
  width: 100%;
  height: 100px;
  padding: 8px 16px;
  border-radius: 14px;
  color: #fff;
  cursor: pointer;
  .in-title {
    font-size: 24px;
    font-weight: 500;
  }
  .in-time {
    font-size: 14px;
    margin-left: 4px;
  }
  .timekeeping-icon {
    height: 50px;
    width: 50px;
    background-color: #fff;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    .fa-fingerprint {
      font-size: 30px;
      color: #034AB3;
    }
  }
}
.is-in {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #034AB3;
}
.is-out {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  color: #333;
  box-shadow: 2px 3px 10px #8cdcf942;
  .out-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    .out-date {
      font-size: 20px;
    }
    .work-shift {
      font-size: 16px;
      color: #989fa0;
    }
  }
  .out-buttons {
    display: flex;
    justify-content: space-between;
    button {
      width: 80%;
      padding: 6px;
      font-size: 22px;
      font-weight: 600;
      background-color: #ffcad4;
      color: #ff506d;
      border: none;
      border-radius: 12px;
    }
    .location-icon {
      width: 16%;
      padding: 8px;
      font-size: 22px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #CFF4D2;
      border-radius: 12px;
      color: #7BE495;
    }
  }
}
.folder {
  margin-top: 20px;
  font-size: 18px;
  font-weight: 700;
  .folder-container {
    margin-top: 6px;
    display: grid;
    grid-template-columns: repeat(2, minmax(50px, 1fr));
    gap: 14px;
    .folder-item {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      height: 100px;
      width: 100%;
      padding: 10px;
      border-radius: 10px;
      background-color: #fff;
      box-shadow: 2px 3px 10px #8cdcf942;
      font-size: 16px;
      .icon {
        height: 42px;
        width: 42px;
        background-image: linear-gradient(to top right, #1CA7EC, #4ADEDE);
        border-radius: 10px;
        color: #fff;
        font-size: 22px;
      }
      span {
        width: 90px;
        white-space: nowrap; 
        overflow: hidden;
        text-overflow: ellipsis; 
      }
    }
  }
}

</style>
