import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "0093faa4-412b-4ff9-b03b-b5d1c380416c",
  },
});

export const authAPI = {
  getMyAuthData() {
    return axiosInstance.get(`auth/me`).then((response) => response.data);
  },
  getMyProfileData(userId) {
      return axiosInstance
        .get(`profile/` + userId)
        .then((response) => response.data);
  },
  login(email, password, rememberMe, captcha = null) {
    return axiosInstance
      .post(`auth/login`, { email, password, rememberMe, captcha })
      .then((response) => response.data);
  },
  logOut() {
    return axiosInstance.delete(`auth/login`).then((response) => response.data);
  },
};

export const securityAPI = {
  getCaptha() {
    return axiosInstance.get(`security/get-captcha-url`).then((response) => response.data);
  }
};


export const profileAPI = {
  getStatus(userId) {
    return axiosInstance
      .get(`profile/status/` + userId)
      .then((response) => response.data);
  },
  updateStatus(status) {
    return axiosInstance
      .put(`profile/status/`, { status: status })
      .then((response) => response.data);
  },
  saveProfile(profile) {
    return axiosInstance
      .put(`profile`, profile)
    .then(response => response.data)
  }
};

export const transactionsAPI = {
  getTransactionsData() {
    return axios('https://cors-anywhere.herokuapp.com/https://my-json-server.typicode.com/angelinasentyakova/Data/db')
      .then(response => response.data)
  }
}