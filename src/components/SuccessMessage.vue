<template>
  <div class="flex flex-col items-center justify-center w-full min-h-[calc(100vh-80px)]">
    <div class="text-center my-20">
      <div
        class="w-16 h-16 mb-6 mx-auto flex items-center justify-center border-2 rounded-full border-teal-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          width="40"
          height="40"
          stroke="teal"
          stroke-width="2"
        >
          <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
      <p class="text-lg font-semibold mb-6">اطلاعات شما با موفقیت ثبت شد</p>
      <button
        class="border border-teal-400 rounded-lg px-8 py-3 text-teal-600 text-lg font-bold hover:bg-teal-50 transition"
        @click="$emit('goToView')"
      >
        مشاهده اطلاعات
      </button>
    </div>
  </div>
</template>

<script setup>
defineEmits(["goToView"]);
</script>

<style lang="scss" scoped></style>
