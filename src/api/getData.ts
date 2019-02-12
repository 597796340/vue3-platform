import fetch from "@/util/fetch";

export const login = (param: object) => fetch("/publish/sign/in", param, "POST");

export const resetPassword = (param: object) => fetch("/user/reset", param, "POST");

export const getShareUrl = () => fetch("/admin/getShareUrl");
