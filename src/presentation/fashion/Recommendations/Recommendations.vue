<script src="./Recommendations.js" />
<style src="./Recommendations.scss" lang="scss"></style>
<i18n src="./Recommendations.txt" lang="yaml"></i18n>

<template>
  <transition name="slide-fade" appear>
    <vueper-slides
      class="no-shadow"
      :visible-slides="5"
      slide-multiple
      :gap="3"
      :slide-ratio="1 / 5"
      :dragging-distance="200"
      :breakpoints="{ 800: { visibleSlides: 2, slideMultiple: 2 } }"
    >
      <vueper-slide v-for="(slide, i) in slides" :key="i">
        <template v-slot:content="">
          <div
            class="single-slider bg-img align-items-center custom-d-flex "
          >
          <router-link
          :to="productRoute(product.slug, product.sku)"
        >
          <img :src="slide?.masterVariant?.images?.[0]?.url" /></router-link>
            <h3 class="animated">
                      {{ slide?.name?.en}}
                    </h3>
          </div>
        </template>
      </vueper-slide>
    </vueper-slides>
  </transition>
</template>

<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 2s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
</style>
