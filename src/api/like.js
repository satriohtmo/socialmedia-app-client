import axios from "axios";

export async function likeContent(id) {
  try {
    const like = await axios.post(
      `https://captiverse-app.up.railway.app/api/like/content/${id}`,
      {},
      {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      }
    );
    return like.data;
  } catch (err) {
    return [];
  }
}

export async function dislikeContent(id) {
  try {
    const dislike = await axios.delete(`https://captiverse-app.up.railway.app/api/like/content/${id}`, {
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    });
    return dislike.data;
  } catch (err) {
    return [];
  }
}

export async function likePerContent(id) {
  try {
    const { data } = await axios.get(`https://captiverse-app.up.railway.app/api/like/${id}`);
    return data;
  } catch (err) {
    return [];
  }
}

export async function likedContentByUser() {
  try {
    const { data } = await axios.get("https://captiverse-app.up.railway.app/api/like", {
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    });
    return data.data;
  } catch (err) {
    return [];
  }
}
