import axios from "axios";

export async function getPost() {
  try {
    const { data } = await axios.get("http://localhost:14045/api/post");
    return data.data;
  } catch (err) {
    return [];
  }
}

export async function postById(id) {
  try {
    const { data } = await axios.get(`http://localhost:14045/api/post/${id}`);
    return data.data;
  } catch (err) {
    return [];
  }
}

export async function createPost() {
  try {
    const { data } = await axios.post(
      "http://localhost:14045/api/post",
      {
        photo,
        description,
      },
      { headers: access_token }
    );
    return data.data;
  } catch (err) {
    return err;
  }
}
