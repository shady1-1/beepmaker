export default function logout(_callback) {
  localStorage.removeItem("admin-token");
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  _callback();
}
