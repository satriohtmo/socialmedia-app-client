import axios from "axios";

export async function register(username, name, email, password, dateofbirth) {
  try {
    const newUser = await axios.post("https://captiverse-app.up.railway.app/api/register", {
      username,
      name,
      email,
      password,
      dateofbirth,
    });
    return newUser.data;
  } catch (err) {
    return [];
  }
}

export async function login({ email, password }) {
  try {
    const user = await axios.post("https://captiverse-app.up.railway.app/api/login", {
      email,
      password,
    });
    return user.data;
  } catch (err) {
    return [];
  }
}
