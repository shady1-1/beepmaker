import axios from "axios";

export const getBeepsApi = async (token) => {
  return new Promise(async (resolve, reject) => {
    await axios({
      url: `/api/beeps`,
      method: "get",
      headers: {
        Authorization: `auth-token:${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const loadedBeeps = res.data.beeps;
        resolve(loadedBeeps);
      })
      .catch((err) => {
        reject(err?.response?.message, err.message);
      });
  });
};
export const generateBeppApi = async (restaurantId) => {
  return new Promise(async (resolve, reject) => {
    await axios
      .post(`/api/beeps/generate`, {
        restaurantId,
      })
      .then((res) => {
        if (!res.data.success) {
          reject(res.data.message);
        }
        resolve(res.data.token);
      })
      .catch((err) => reject(err.message));
  });
};
