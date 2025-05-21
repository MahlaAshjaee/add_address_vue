<template>
  <div class="flex flex-col items-center w-full min-h-[calc(100vh-80px)] bg-gray-50">
    <div v-if="step === 1" class="w-full max-w-5xl mx-auto mt-16 max-md:mt-8">
      <h2 class="text-right font-bold text-2xl mr-1 mb-6">ثبت آدرس</h2>
      <div class="bg-white shadow-lg rounded-xl p-8">
        <p class="text-right text-gray-800 mb-6 md:mb-10 text-lg">
          لطفا مشخصات و آدرس خود را وارد کنید.
        </p>
        <AddressForm ref="addressFormRef" @submit="nextToMap" />
      </div>
    </div>

    <div v-if="step === 2" class="w-full max-w-4xl mx-auto mt-16">
      <h2 class="text-right font-bold text-2xl mb-4 flex items-center gap-2">
        <button
          class="text-teal-700 text-2xl font-bold ml-2 hover:text-teal-500 rounded transition px-1"
          @click="step = 1"
          title="بازگشت به ثبت آدرس"
          type="button"
          style="direction: rtl"
        >
          →
        </button>
        <span>انتخاب آدرس</span>
      </h2>
      <div class="bg-white shadow-lg rounded-xl p-8">
        <p class="text-right text-gray-800 mb-4 text-lg">
          موقعیت مورد نظر خود را روی نقشه مشخص کنید
        </p>
        <MapPicker ref="mapRef" @selected="submitWithLocation" />
      </div>
    </div>

    <SuccessMessage v-if="step === 3" @goToView="goToViewAddress" />

    <div
      v-if="step === 1 || step === 2"
      class="fixed bottom-0 z-30 left-0 w-full border-t border-gray-200 bg-white flex justify-center px-8 md:px-0"
      style="height: 90px"
    >
      <button
        :disabled="step === 1 && isSubmittingForm"
        class="bg-teal-500 hover:bg-teal-600 px-24 max-md:w-full text-white font-bold rounded-lg text-lg transition m-5"
        type="button"
        @click="step === 1 ? submitForm() : submitMap()"
      >
        ثبت و ادامه
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AddressForm from "@/components/AddressForm.vue";
import MapPicker from "@/components/MapPicker.vue";
import router from "@/router";
import axios from "axios";
import SuccessMessage from "@/components/SuccessMessage.vue";

const step = ref(1);
const pendingData = ref(null);

const addressFormRef = ref(null);
const mapRef = ref(null);

const isSubmittingForm = ref(false);

function submitForm() {
  addressFormRef.value?.submitForm();
}

function nextToMap(formData) {
  pendingData.value = formData;
  step.value = 2;
}

function submitMap() {
  mapRef.value?.submitMap();
}

const apiUrl = "https://stage.achareh.ir/api/karfarmas/address";
const authToken = "Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4";

async function submitWithLocation({ lat, lng }) {
  if (lat == null || lng == null) {
    step.value = 1;
    return;
  }
  const addressData = {
    first_name: pendingData.value.firstname,
    last_name: pendingData.value.lastname,
    coordinate_mobile: pendingData.value.mobile,
    coordinate_phone_number: pendingData.value.phone,
    address: pendingData.value.address,
    region: "1",
    lat,
    lng,
    gender: pendingData.value.gender,
  };
  try {
    await axios.post(apiUrl, addressData, {
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json",
      },
    });
    pendingData.value = null;
    step.value = 3;
  } catch (e) {
    alert("خطا در ثبت آدرس!");
    console.error(e);
  }
  isSubmittingForm.value = false;
}
function goToViewAddress() {
  router.push("/viewAddress");
}
</script>
