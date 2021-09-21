import axios from "axios";
import { useEffect, useState } from "react";

const SuperAdminManagePage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [actionLoading, setActionLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    validationMailSuperAdmin();
    setLoading(false);
  }, []);

  const validationMailSuperAdmin = async () => {
    await axios({
      url: "/api/admin/restaurant/list",
      method: "GET",
    })
      .then((res) => {
        setRestaurants(res.data.data);
      })
      .catch((err) => {});
  };
  const validateMail = async (_id) => {
    setActionLoading(true);
    await axios({
      url: `/api/admin/validate/mail/restaurant/${_id}`,
      method: "GET",
    }).then(async (r) => {
      await validationMailSuperAdmin();
      setActionLoading(false);
    });
  };
  const blockMail = async (_id) => {
    setActionLoading(true);
    await axios({
      url: `/api/admin/block/mail/restaurant/${_id}`,
      method: "GET",
    }).then(async (r) => {
      await validationMailSuperAdmin();
      setActionLoading(false);
    });
  };
  return (
    <div className="super-admin">
      <h2>Page de validation Email par le Super Admin</h2>

      <table border="1" style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Verified</th>
            <th>Authorized</th>
            <th>Actions</th>
          </tr>
        </thead>
        {!loading && (
          <tbody>
            {restaurants.map((e) => (
              <tr key={e.email}>
                <td>{e.email}</td>
                <td>{e.isVerified ? "✅" : "🚫"}</td>
                <td>{e.isAuthorized ? "✅" : "🚫"}</td>
                <td>
                  {e.isAuthorized ? (
                    <button
                      disabled={actionLoading}
                      onClick={() => blockMail(e._id)}
                    >
                      Block mail
                    </button>
                  ) : (
                    <button
                      disabled={actionLoading}
                      onClick={() => validateMail(e._id)}
                    >
                      Validate mail
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default SuperAdminManagePage;
