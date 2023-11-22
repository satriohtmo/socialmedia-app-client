import axios from "axios";

export async function sumFollow() {
  try {
    const { data } = await axios.get("http://localhost:14045/api/sum", {
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    });
    return data.data;
  } catch (err) {
    return err;
  }
}

export async function getFollowing(id) {
  try {
    const { data } = await axios.get(`http://localhost:14045/api/following/${id}`);
    return data.data;
  } catch (err) {
    return [];
  }
}

export async function getFollowers(id) {
  try {
    const { data } = await axios.get(`http://localhost:14045/api/followers/${id}`);
    return data.data;
  } catch (err) {
    return [];
  }
}

export async function following(FollowingUserId, FollowerUserId) {
  try {
    const { data } = await axios.post(
      `http://localhost:14045/api/follow/`,
      {
        FollowingUserId,
        FollowerUserId,
      },
      {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      }
    );
    return data.data;
  } catch (err) {
    return err;
  }
}

export async function unfollow(FollowingUserId) {
  try {
    const data = await axios.delete(`http://localhost:14045/api/unfollow`, {
      data: {
        FollowingUserId,
      },
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    });
    return data.data;
  } catch (err) {
    return err;
  }
}
