import axios from "axios";

export async function allUsers(params) {
  try {
    const { data } = await axios.get(`http://localhost:14045/api/user/all?search=${params}`);
    return data.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getUser(id) {
  try {
    const { data } = await axios.get(`http://localhost:14045/api/user/${id}`, {
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    });
    return data.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getUserByUsername() {
  try {
    const { data } = await axios.get(`http://localhost:14045/api/user/`, {
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    });
    return data.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getUserByName(username) {
  try {
    const { data } = await axios.get(`http://localhost:14045/api/user/${username}`);
    return data.data;
  } catch (err) {
    console.log(err);
  }
}

export async function updateUser(username, name, email, bio, profilepicture) {
  try {
    const { data } = await axios.put(
      `http://localhost:14045/api/user/`,
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
    console.log(err);
  }
}

export async function deleteUser(id) {
  try {
    await axios.delete(`http://localhost:14045/api/user/${id}`, {
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    });
    return;
  } catch (err) {
    console.log(err);
  }
}
