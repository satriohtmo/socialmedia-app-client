import axios from "axios";

export async function allUsers(params) {
  try {
    const { data } = await axios.get(`https://captiverse-app.up.railway.app/api/user/all?search=${params}`);
    return data.data;
  } catch (err) {
    return [];
  }
}

export async function getUser(id) {
  try {
    const { data } = await axios.get(`https://captiverse-app.up.railway.app/api/user/${id}`, {
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    });
    return data.data;
  } catch (err) {
    return [];
  }
}

export async function getUserByUsername() {
  try {
    const { data } = await axios.get(`https://captiverse-app.up.railway.app/api/user/`, {
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    });
    return data.data;
  } catch (err) {
    return [];
  }
}

export async function getUserByName(username) {
  try {
    const { data } = await axios.get(`https://captiverse-app.up.railway.app/api/user/${username}`);
    return data.data;
  } catch (err) {
    return [];
  }
}

export async function updateUser(username, name, email, bio, profilepicture) {
  try {
    const { data } = await axios.put(
      `https://captiverse-app.up.railway.app/api/user/`,
      {
        username,
        name,
        address,
        email,
        bio,
        profilepicture,
      },
      {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      }
    );
    return data.data;
  } catch (err) {
    return [];
  }
}

export async function deleteUser() {
  try {
    await axios.delete(`https://captiverse-app.up.railway.app/api/user/`, {
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    });
    return;
  } catch (err) {
    return [];
  }
}
