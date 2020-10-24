import { baseUrl } from './';

// POST
export const LOGIN_ADMIN = `${baseUrl}/login-admin/`;
export const EDIT_MEMBER = `${baseUrl}/update-user-post/`;
export const GENERATE_PEDS = `${baseUrl}/generate-peds/`;
export const GENERATE_VOUCHER = `${baseUrl}/generate-evoucher/`;
export const WD_APPROVAL = `${baseUrl}/withdraw-approval-post/`;
export const SEARCH_MEMBER = `${baseUrl}/search-user/`;
export const REWARD_APPROVAL = `${baseUrl}/reward-user-approval/`;
export const RESETPASSWORD = `${baseUrl}/reset-password-default/`

// GET
export const BANK = `${baseUrl}/bank/`;
export const ALL_MEMBERS = `${baseUrl}/total-user-count/`;
export const ALL_TRANSAKSI = `${baseUrl}/all-bank-transaction/`;
export const LIST_MEMBERS = `${baseUrl}/all-user-detail/`;
export const GET_MEMBER = `${baseUrl}/update-user-get/`;
export const HISTORY_PEDS = `${baseUrl}/bank-transaction-peds/`;
export const HISTORY_VOUCHER = `${baseUrl}/bank-transaction-evoucher/`;
export const GET_WD_LIST = `${baseUrl}/withdraw-approval-get/`;
export const WD_HISTORY = `${baseUrl}/withdraw-approval-get-true/`;
export const GET_REWARD_LIST = `${baseUrl}/reward-user-false/`;
export const REWARD_LIST = `${baseUrl}/reward-user-true/`;
export const ACTIVATION_TYPE = `${baseUrl}/user-aktivasi-tipe/`;
export const HISTORY_ACTIVATION = `${baseUrl}/history-activation/`;
