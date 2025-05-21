import { createRouter, createWebHistory } from "vue-router";
import AddAddress from "../views/AddAddress.vue";
import AddressList from "@/views/AddressList.vue";

const routes = [
  { path: "/", redirect: "/addAddress" },
  { path: "/addAddress", name: "addAddress", component: AddAddress },
  { path: "/viewAddress", name: "viewAddress", component: AddressList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
