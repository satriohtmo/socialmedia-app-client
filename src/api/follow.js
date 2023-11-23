import axios from "axios";

export async function sumFollow() {
  try {
    const { data } = await axios.get("https://captiverse-app.up.railway.app/api/sum", {
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
    const { data } = await axios.get(`https://captiverse-app.up.railway.app/api/following/${id}`);
    return data.data;
  } catch (err) {
    return [];
  }
}

export async function getFollowers(id) {
  try {
    const { data } = await axios.get(`https://captiverse-app.up.railway.app/api/followers/${id}`);
    return data.data;
  } catch (err) {
    return [];
  }
}

export async function following(FollowingUserId, FollowerUserId) {
  try {
    const { data } = await axios.post(
      `https://captiverse-app.up.railway.app/api/follow/`,
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
    const data = await axios.delete(`https://captiverse-app.up.railway.app/api/unfollow`, {
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
