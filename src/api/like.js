import axios from "axios";

export async function likeContent(id) {
  try {
    const like = await axios.post(
      `http://localhost:14045/api/like/content/${id}`,
      {},
      {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      }
    );
    return like.data;
  } catch (err) {
    console.log(err);
  }
}

export async function dislikeContent(id) {
  try {
    const dislike = await axios.delete(`http://localhost:14045/api/like/content/${id}`, {
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    });
    return dislike.data;
  } catch (err) {
    console.log(err);
  }
}

export async function likePerContent(id) {
  try {
    const { data } = await axios.get(`http://localhost:14045/api/like/${id}`);
    return data;
  } catch (err) {
    return [];
  }
}

export async function likedContentByUser() {
  try {
    const { data } = await axios.get("http://localhost:14045/api/like", {
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    });
    return data.data;
  } catch (err) {
    return [];
  }
}
