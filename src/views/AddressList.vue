<template>
  <div class="flex flex-col items-center">
    <main class="flex-grow w-full flex flex-col items-center">
      <div class="w-full max-w-4xl mt-28">
        <h2 class="text-right font-bold text-lg mb-4 mr-2">آدرس ها و مشخصات</h2>
        <div v-if="isLoading" class="flex flex-col items-center py-12 w-full">
          <div
            class="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-teal-500 mb-4"
          ></div>
          <div class="text-teal-500 text-lg font-bold">در حال بارگذاری آدرس‌ها...</div>
        </div>
        <template v-else>
          <div v-if="addresses.length" class="flex flex-col gap-7">
            <div
              v-for="address in addresses"
              :key="address.id"
              class="rounded-xl bg-white shadow-lg p-8 flex flex-col gap-8"
            >
              <div class="grid grid-cols-3 gap-4 mb-6 max-md:block">
                <div class="text-right mb-4 max-md:flex max-md:items-center justify-between">
                  <span class="text-sm text-gray-400 max-md:ml-2 block mb-1 md:mb-2">نام</span>
                  <span class="font-bold min-h-[24px]">{{ address.first_name || "-" }}</span>
                </div>
                <div class="text-right mb-4 max-md:flex max-md:items-center justify-between">
                  <span class="text-sm text-gray-400 max-md:ml-2 block mb-1 md:mb-2"
                    >نام خانوادگی</span
                  >
                  <span class="font-bold min-h-[24px]">{{ address.last_name || "-" }}</span>
                </div>
                <div class="text-right mb-4 max-md:flex max-md:items-center justify-between">
                  <span class="text-sm text-gray-400 max-md:ml-2 block mb-1 md:mb-2"
                    >شماره تلفن همراه</span
                  >
                  <span class="font-bold min-h-[24px]">{{ address.coordinate_mobile || "-" }}</span>
                </div>
                <div class="text-right mb-4 max-md:flex max-md:items-center justify-between">
                  <span class="text-sm text-gray-400 max-md:ml-2 block mb-1 md:mb-2"
                    >شماره تلفن ثابت</span
                  >
                  <span class="font-bold min-h-[24px]">{{
                    address.coordinate_phone_number || "-"
                  }}</span>
                </div>
                <div class="text-right max-md:flex max-md:items-center justify-between">
                  <span class="text-sm text-gray-400 max-md:ml-2 block mb-1 md:mb-2">جنسیت</span>
                  <span class="font-bold min-h-[24px]">{{
                    address.gender === "male" ? "آقا" : address.gender === "female" ? "خانم" : "-"
                  }}</span>
                </div>

                <div class="text-right mb-4 max-md:items-center max-md:mt-6 max-md:border-t-2">
                  <span class="text-sm text-gray-400 max-md:ml-2 block mb-1 max-md:mt-3">آدرس</span>
                  <span class="font-bold min-h-[24px] break-words">{{
                    address.address || "-"
                  }}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-gray-400 text-center text-sm py-8">هیچ آدرسی ثبت نشده</div>
        </template>
      </div>
    </main>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const addresses = ref([]);
const isLoading = ref(false);

const apiUrl = "https://stage.achareh.ir/api/karfarmas/address";
const authToken = "Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4";

onMounted(async () => {
  await fetchAddresses();
});

async function fetchAddresses() {
  isLoading.value = true;
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json",
      },
    });
    addresses.value = response.data;
  } catch (error) {
    console.log("Error fetching addresses", error);
  }
  isLoading.value = false;
}

async function addAddress(addressData) {
  try {
    const response = await axios.post(apiUrl, addressData, {
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json",
      },
    });

    await fetchAddresses();
    return response.data;
  } catch (error) {
    console.error("Error adding address", error);
    throw error;
  }
}
defineExpose({ addAddress });
</script>
