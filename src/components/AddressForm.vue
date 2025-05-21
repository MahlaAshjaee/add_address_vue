<template>
  <form @submit.prevent="handleSubmit" class="w-full pb-20 md:pb-0" dir="rtl" novalidate>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-md:mb-4">
      <div class="flex flex-col mb-6">
        <label class="mb-2 text-sm font-bold">نام <span class="text-red-500">*</span></label>
        <input
          v-model="form.firstname"
          @blur="validateField('firstname')"
          placeholder="مثال: محمد"
          :class="[
            'rounded border focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:ring-opacity-50 focus:outline-none w-full px-3 py-3 max-md:py-2 text-right shadow-sm bg-gray-50 placeholder-gray-400',
            errors.firstname ? 'border-red-500' : 'border-gray-300',
          ]"
        />
        <span v-if="errors.firstname" class="text-xs text-red-500 mt-1">{{
          errors.firstname
        }}</span>
      </div>

      <div class="flex flex-col mb-2">
        <label class="mb-2 text-sm font-bold"
          >نام خانوادگی <span class="text-red-500">*</span></label
        >
        <input
          v-model="form.lastname"
          @blur="validateField('lastname')"
          placeholder="مثال: رضایی"
          :class="[
            'rounded border focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:ring-opacity-50 focus:outline-none w-full px-3 py-3 max-md:py-2 text-right shadow-sm bg-gray-50 placeholder-gray-400',
            errors.lastname ? 'border-red-500' : 'border-gray-300',
          ]"
        />
        <span v-if="errors.lastname" class="text-xs text-red-500 mt-1">{{ errors.lastname }}</span>
      </div>

      <div class="flex flex-col">
        <label class="mb-2 text-sm font-bold"
          >شماره تلفن همراه <span class="text-red-500">*</span></label
        >
        <input
          v-model="form.mobile"
          @blur="validateField('mobile')"
          placeholder="مثال: 09121234567"
          :class="[
            'rounded border focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:ring-opacity-50 focus:outline-none w-full px-3 py-3 max-md:py-2 text-right shadow-sm bg-gray-50 placeholder-gray-400',
            errors.mobile ? 'border-red-500' : 'border-gray-300',
          ]"
          maxlength="11"
        />
        <span v-if="errors.mobile" class="text-xs text-red-500 mt-1">{{ errors.mobile }}</span>
      </div>

      <div class="flex flex-col md:col-span-1">
        <label class="mb-2 text-sm font-bold">شماره تلفن ثابت (اختیاری)</label>
        <input
          v-model="form.phone"
          @blur="validateField('phone')"
          placeholder="مثال: 02122334455"
          class="rounded border focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:ring-opacity-50 focus:outline-none w-full px-3 py-3 max-md:py-2 text-right shadow-sm bg-gray-50 placeholder-gray-400"
          maxlength="11"
        />
        <span v-if="errors.phone" class="text-xs text-red-500 mt-1">{{ errors.phone }}</span>
      </div>

      <div class="flex flex-col md:col-span-2">
        <label class="mb-2 text-sm font-bold">آدرس کامل <span class="text-red-500">*</span></label>
        <textarea
          v-model="form.address"
          @blur="validateField('address')"
          placeholder="مثال: تهران، خیابان ..."
          :class="[
            'rounded border focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:ring-opacity-50 focus:outline-none w-full px-3 py-3 max-md:py-2 text-right shadow-sm bg-gray-50 placeholder-gray-400 resize-none',
            errors.address ? 'border-red-500' : 'border-gray-300',
          ]"
          rows="1"
        ></textarea>
        <span v-if="errors.address" class="text-xs text-red-500 mt-1">{{ errors.address }}</span>
      </div>
    </div>

    <div class="mb-6 max-md:mb-2">
      <div class="flex gap-6 items-center">
        <label class="block text-sm font-bold ml-12">
          جنسیت <span class="text-red-500">*</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="male"
            v-model="form.gender"
            class="accent-teal-500"
            name="gender"
          />
          <span>آقا</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="female"
            v-model="form.gender"
            class="accent-teal-500"
            name="gender"
          />
          <span>خانم</span>
        </label>
      </div>
      <span v-if="errors.gender" class="text-xs text-red-500 mt-1">{{ errors.gender }}</span>
    </div>
  </form>
</template>

<script setup>
import { reactive } from "vue";
const emit = defineEmits(["submit"]);

const form = reactive({
  firstname: "",
  lastname: "",
  mobile: "",
  phone: "",
  address: "",
  gender: "",
});

const errors = reactive({
  firstname: "",
  lastname: "",
  mobile: "",
  phone: "",
  address: "",
  gender: "",
});

function validateField(field) {
  switch (field) {
    case "firstname":
      errors.firstname = !form.firstname
        ? "نام الزامی است."
        : form.firstname.length < 3
          ? "نام حداقل باید ۳ حرف باشد."
          : "";
      break;
    case "lastname":
      errors.lastname = !form.lastname
        ? "نام خانوادگی الزامی است."
        : form.lastname.length < 3
          ? "نام خانوادگی حداقل باید ۳ حرف باشد."
          : "";
      break;
    case "mobile":
      errors.mobile = !form.mobile
        ? "شماره موبایل الزامی است."
        : !/^09\d{9}$/.test(form.mobile)
          ? "شماره موبایل معتبر وارد کنید (۱۱ رقم با 09)"
          : "";
      break;
    case "phone":
      errors.phone =
        form.phone && !/^\d{11}$/.test(form.phone)
          ? "اگر وارد می‌کنید باید ۱۱ رقم بدون خط فاصله باشد."
          : "";
      break;
    case "address":
      errors.address = !form.address
        ? "آدرس الزامی است."
        : form.address.length < 10
          ? "آدرس حداقل باید ۱۰ کاراکتر باشد."
          : "";
      break;
    case "gender":
      errors.gender = !form.gender ? "جنسیت الزامی است." : "";
      break;
  }
}

function validateForm() {
  validateField("firstname");
  validateField("lastname");
  validateField("mobile");
  validateField("phone");
  validateField("address");
  validateField("gender");
  return Object.values(errors).every((err) => !err);
}

function handleSubmit() {
  if (validateForm()) {
    emit("submit", { ...form });
    Object.keys(form).forEach((key) => (form[key] = ""));
    Object.keys(errors).forEach((key) => (errors[key] = ""));
  }
}

function submitForm() {
  handleSubmit();
}
defineExpose({ submitForm });
</script>

<style scoped>
.ltr {
  direction: ltr;
  text-align: left;
}
</style>
