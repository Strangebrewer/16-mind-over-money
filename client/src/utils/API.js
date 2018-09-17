import axios from "axios";

export const API = {
  // USER AUTHENTICATION ROUTES
  // New user signup
  signup: function (signupData) {
    return axios.post('/user', signupData);
  },
  // User login
  login: function (loginData) {
    return axios.post('/user/login', loginData);
  },
  // User logout
  logout: function () {
    return axios.post('/user/logout');
  },
  //  Checks current password and returns error message if incorrect, or changes it if correct
  changePwOrUsername: function (pwData) {
    return axios.post('/user/change', pwData);
  },


  // ADMIN ROUTES
  getAllExpenses: function () {
    return axios.get('/admin/expenses');
  },

  getCcRecords: function (CC) {
    return axios.get(`/admin/credit/${CC}`);
  },

  getAllChecking: function () {
    return axios.get('/admin/checking');
  },

  getDetailRecords: function (category) {
    return axios.get(`/admin/detail/${category}`);
  },

  getCCSpend: function () {
    return axios.get('/admin/ccspend');
  },

  changeBalances: function (changeData) {
    return axios.put('/admin/balance/change', changeData);
  },

  getUserAndBalances: function () {
    return axios.get('/admin/user/balances');
  },

  updateNote: function (noteObject) {
    return axios.put('/admin/note', noteObject);
  },

  updateDetailNote: function (noteObject) {
    return axios.put('/admin/note/detail', noteObject);
  },

  deleteDetailRecord: function(detailObject) {
    return axios.put(`/admin/detail/delete`, detailObject);
  },

  deleteCheckingRecord: function (checkingObject) {
    return axios.put(`/admin/checking/delete`, checkingObject);
  },

  deleteCcRecord: function (ccObject) {
    return axios.put(`/admin/cc/delete`, ccObject);
  },


  //  USER ACCOUNT ROUTES
  setAccountNames: function (nameData) {
    return axios.post('/api/setup/names', nameData);
  },

  getUserAccounts: function () {
    return axios.get('/api/setup/names');
  },

  setInitialBalances: function (balanceData) {
    return axios.post('/api/setup/balances', balanceData);
  },

  getFinances: function (month, year) {
    return axios.get(`/api/finances/${month}/${year}`);
  },

  getBalances: function () {
    return axios.get('/api/balances');
  },

  updateExpenses: function (month, year, expObj) {
    return axios.put(`/api/expenses/${month}/${year}`, expObj);
  },

  updateSavings: function (month, year, savObj) {
    return axios.put(`/api/savings/${month}/${year}`, savObj);
  },

  updateChecking: function (month, year, checkingObj) {
    return axios.post(`/api/checking/${month}/${year}`, checkingObj);
  },

  savingsToChecking: function (moneyObject) {
    return axios.put('/api/checking', moneyObject);
  },

  creditCardPayment: function (month, year, pmtObj) {
    return axios.post(`/api/ccpayment/${month}/${year}`, pmtObj);
  },

  creditCardCharge: function (month, year, chargeObj) {
    return axios.post(`/api/cccharge/${month}/${year}`, chargeObj);
  },

  findOrCreateExpenses: function (month, year) {
    return axios.get(`/api/expenses/${month}/${year}`);
  }

};
