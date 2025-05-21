<template>
  <header
    class="w-full flex flex-row-reverse items-center justify-between px-8 md:px-32 py-4 shadow bg-white border-b"
    style="height: 80px"
  >
    <div class="flex flex-row-reverse items-center gap-6 md:gap-8">
      <router-link
        to="/viewAddress"
        :class="[
          'pb-1 transition',
          activeTab === 'list'
            ? 'text-teal-500 font-bold text-xl border-b-2 border-teal-500'
            : 'text-gray-500 font-bold text-xl',
        ]"
      >
        مشاهده آدرس‌ها
      </router-link>
      <router-link
        to="/addAddress"
        :class="[
          'ml-4 md:ml-6 pb-1 transition',
          activeTab === 'add'
            ? 'text-teal-500 font-bold text-xl border-b-2 border-teal-500'
            : 'text-gray-500 font-bold text-xl',
        ]"
      >
        ثبت آدرس
      </router-link>
    </div>

    <img src="/achare.png" alt="آچاره" class="h-8 md:h-10" style="object-fit: contain" />
  </header>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const activeTab = computed(() =>
  route.path.includes("viewAddress") ? "list" : route.path.includes("addAddress") ? "add" : "",
);
</script>

<style lang="scss" scoped></style>
