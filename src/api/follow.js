import axios from "axios";

export async function sumFollow() {
  try {
    const { data } = await axios.get("http://localhost:14045/api/follow/sum", {
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    });
    return data.data;
  } catch (err) {
    return err;
  }
}
