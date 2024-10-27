<template>
  <div class="imgs">
    <ul>
      <li class="item" v-for="(image, index) in imageList" :key="index" :style="{
        'background-image': 'url(' + image + ')'
      } ">
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">

const imageList = [
  "https://blog-wsw-001.oss-cn-beijing.aliyuncs.com/aurora/config/7b933d96e00151f766a5f129e29ce5f7.jpg",
  "https://blog-wsw-001.oss-cn-beijing.aliyuncs.com/aurora/config/8eab49249363f5dd433f7b066c105bde.jpg",
  "https://blog-wsw-001.oss-cn-beijing.aliyuncs.com/aurora/config/162139-171584769980be.jpg",
  "https://blog-wsw-001.oss-cn-beijing.aliyuncs.com/aurora/config/small1434561Nstp1678343696.jpg",
  "https://blog-wsw-001.oss-cn-beijing.aliyuncs.com/aurora/config/%E5%8E%9F%E7%A5%9E%E5%85%AB%E9%87%8D%E7%A5%9E%E5%AD%90%20%E5%94%AF%E7%BE%8E%20%E6%B8%A9%E9%A6%A8%204k%E5%A3%81%E7%BA%B8%203840x2160_%E5%BD%BC%E5%B2%B8%E5%9B%BE%E7%BD%91.jpg",
  "https://blog-wsw-001.oss-cn-beijing.aliyuncs.com/aurora/articles/7dc708b74eeea525299b8dc143bbadd8.jpg"
]
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";

.imgs {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: #666869;
  background-attachment: fixed;
  overflow: hidden;
  
  .item {
    @include absolute;
    width: 100%;
    height: 100%;
    background: no-repeat 50% 50% / cover;
    opacity: 0;
    animation: imageAnimation 36s linear infinite 0s;
    backface-visibility: hidden;
    transform-style: preserve-3d;

    &:nth-child(2) {
      animation-delay: 6s;
    }

    &:nth-child(3) {
      animation-delay: 12s;
    }

    &:nth-child(4) {
      animation-delay: 18s;
    }

    &:nth-child(5) {
      animation-delay: 24s;
    }

    &:nth-child(6) {
      animation-delay: 30s;
    }
  }

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .2);
    transition: all .2s ease-in-out 0s;
  }
}

@keyframes imageAnimation {
  0% {
    opacity: 0;
    animation-timing-function: ease-in;
  }

  2% {
    opacity: 1;
  }

  8% {
    opacity: 1;
    transform: scale(1.05);
    animation-timing-function: ease-out;
  }

  17% {
    opacity: 1;
    transform: scale(1.1);
  }

  25% {
    opacity: 0;
    transform: scale(1.1);
  }

  100% {
    opacity: 0;
  }
}

</style>