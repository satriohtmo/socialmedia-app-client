import axios from "axios";

export async function getPost() {
  try {
    const { data } = await axios.get("https://captiverse-app.up.railway.app/api/content");
    return data.data;
  } catch (err) {
    return [];
  }
}

export async function contentById(id) {
  try {
    const { data } = await axios.get(`https://captiverse-app.up.railway.app/api/content/${id}`, {
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    });
    return data.data;
  } catch (err) {
    return [];
  }
}
