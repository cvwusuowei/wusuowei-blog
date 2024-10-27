<template>
  <div class="brand-container">
    <div class="brand"> 
        <!-- 标题 -->
        <!-- <h1 class="artboard">Hello,Word</h1> -->
       <!-- 打字机 -->
       <div class="title">
        {{ obj.output }}
        <span class="easy-typed-cursor">|</span>
      </div>
    </div>

    <!-- 波浪 -->
    <Waves></Waves>
    <!-- 向下按钮 -->
    <svg-icon class="arrow-down" icon-class="down" size="35px" @click="scrollDown"></svg-icon>
  </div>
</template>

<script setup lang="ts">
//引入波浪组件
import Waves from "@/components/Waves/index.vue"
import svgIcon from "@/components/SvgIcon/index.vue"

import EasyTyper from "easy-typer-js"
import{ref,onMounted,reactive} from "vue"

const obj = reactive({
  output: "",
  isEnd: false,
  speed: 100,
  singleBack: false,
  sleep: 0,
  type: "normal",
  backSpeed: 100,
  sentencePause: false,
});


const fetchData = () => {
  fetch('https://v1.hitokoto.cn/?c=b ')
    .then((res) => {
      return res.json();
    })
    .then(({ hitokoto }) => {
      new EasyTyper(
        obj,
        hitokoto,
        () => { },
        () => { }
      );
    });
};

onMounted(() => {
  fetchData();
});

const scrollDown = () => {
  window.scrollTo({
    behavior: "smooth",
    top: document.documentElement.clientHeight,
  });
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";

.brand-container {
  @include flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 85vh;
  min-height: 10rem;
  color: rgba(255, 255, 255, 0.945);
}

.brand {
  @include flex;
  flex-direction: column;
  position: fixed;
  height: 70vh;
  z-index: -1;
  .artboard{
    color: #0c0c0cac;
    height: 30vh;
    font-size: 80px;
    text-align: center;
    font-weight: 700;
    background: top center;
    background-position: 50%;

  }
  
  .title {
    letter-spacing: 0.1em;
    font-size: 35px;
    font-weight: 700;
    height: 30%;
  }
}



.arrow-down {
  position: absolute;
  // 距离底部高度
  bottom: 80px;
  -webkit-animation: arrow-shake 1.5s ease-out infinite;
  animation: arrow-shake 1.5s ease-out infinite;
  cursor: pointer;
  z-index: 8;
  width: 75px; 
  height: 75px; 
  
}


.easy-typed-cursor {
  margin-left: 0.625rem;
  opacity: 1;
  -webkit-animation: blink 0.7s infinite;
  -moz-animation: blink 0.7s infinite;
  animation: blink 0.7s infinite;
}

@media (max-width: 767px) {
  .brand-container {
    padding: 3rem 0.5rem 0;
  }
}

@media (min-width: 760px) {
  .title {
    font-size: 1.5rem;
  }
}

@keyframes arrow-shake {
  0% {
    opacity: 1;
    transform: translateY(0);
  }

  30% {
    opacity: 0.5;
    transform: translateY(25px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes blink {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
