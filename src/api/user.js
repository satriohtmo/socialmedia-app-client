import axios from "axios";

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

export async function updateUser(id, name, address, email) {
  try {
    const { data } = await axios.put(
      `http://localhost:14045/api/user/${id}`,
      {
        name,
        address,
        email,
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
