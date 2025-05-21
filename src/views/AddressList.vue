<template>
  <div class="flex flex-col items-center">
    <main class="flex-grow w-full flex flex-col items-center">
      <div class="w-full max-w-4xl mt-28">
        <h2 class="text-right font-bold text-lg mb-4">آدرس ها و مشخصات</h2>
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
              <div class="flex items-center gap-4 mb-6">
                <div class="flex-1 text-right">
                  <div class="text-xs text-gray-400 mb-2">نام</div>
                  <div class="font-bold min-h-[24px]">{{ address.first_name || "-" }}</div>
                </div>
                <div class="flex-1 text-right">
                  <div class="text-xs text-gray-400 mb-2">نام خانوادگی</div>
                  <div class="font-bold min-h-[24px]">{{ address.last_name || "-" }}</div>
                </div>
                <div class="flex-[2] text-right">
                  <div class="text-xs text-gray-400 mb-2">شماره تلفن همراه</div>
                  <div class="font-bold min-h-[24px]">{{ address.coordinate_mobile || "-" }}</div>
                </div>
              </div>

              <div class="w-full flex items-center gap-4 mb-6">
                <div class="flex-1 flex flex-col justify-center">
                  <div class="text-xs text-gray-400 mb-2">شماره تلفن ثابت</div>
                  <div class="font-bold min-h-[24px] break-words">
                    {{ address.coordinate_phone_number || "-" }}
                  </div>
                </div>
                <div class="flex-1 flex flex-col justify-center">
                  <div class="text-xs text-gray-400 mb-2">جنسیت</div>
                  <div class="font-bold min-h-[24px] break-words">
                    {{
                      address.gender === "male" ? "آقا" : address.gender === "female" ? "خانم" : "-"
                    }}
                  </div>
                </div>
                <div class="flex-[2] flex flex-col justify-center">
                  <div class="text-xs text-gray-400 mb-2">آدرس</div>
                  <div class="font-bold min-h-[24px] break-words text-right">
                    {{ address.address || "-" }}
                  </div>
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
