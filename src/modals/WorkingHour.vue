<template>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
          <p class="modal-card-title">Giờ công</p>
          <button class="modal-close is-large" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">
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
        hours: 0,
        minutes: 0,
        seconds: 0
      }
    },
    mounted() {
    },
    methods: {
    }
  }
  </script>
  
  <style lang="scss">
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
        border-radius: 14px;
        background-color: aqua;
      }
      .wifi {
        margin-top: 10px;
        height: 60px;
        width: 100%;
        background-color: antiquewhite;
        border-radius: 14px;
      }
      .shifts-list {
        margin-top: 10px;
        width: 100%;
        text-align: center;
        span {
          font-weight: 600;
        }
        .shift-item {
          margin-top: 4px;
          width: 100%;
          height: 50px;
          background-color: bisque;
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