import { useEffect, useState } from "react";
import FooterCon from "../Footer/FooterCon";
import NavBar from "../NavBar/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const [loggedIn, setLoginStatus] = useState(false);
  const [data, setData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // 🟢 Fetch User Profile Data
  const fetchUserData = async () => {
    let token = localStorage.getItem("access_token");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/get_user_detials",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setData(response.data.data);
      setLoginStatus(true);
    } catch (error) {
      console.error("Unauthorized access:", error);
      setLoginStatus(false);
      navigate("/login", { replace: true });
    }
  };

  // 🟢 Update Profile Function
  const handleSave = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/update_profile",
        {
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          mobile: data.mobile,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
        }
      );

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Error updating profile");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!loggedIn) {
    navigate("/login", { replace: true });
    return null;
  }

  return (
    <>
      <NavBar />
      <section className="bg-gray-200 mt-5">
        <div className="container mx-auto py-5">
          <div className="flex">
            {/* Profile Section */}
            <div className="w-1/3 mr-4 rounded-lg">
              <div className="mb-4 shadow-lg p-4 bg-white">
                <div className="text-center">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle w-32 mb-2 mx-auto"
                  />
                  {isEditing ? (
                    <input
                      type="text"
                      value={data.firstname}
                      onChange={(e) => setData({ ...data, firstname: e.target.value })}
                      className="border p-2 rounded w-full"
                    />
                  ) : (
                    <p className="text-xl font-bold mb-1">
                      {data.firstname} {data.lastname}
                    </p>
                  )}

                  <div className="flex justify-center mt-2">
                    {!isEditing ? (
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit
                      </button>
                    ) : (
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Information Section */}
            <div className="w-2/3">
              <div className="mb-4 shadow-lg p-4 bg-white">
                {/* Full Name */}
                <div className="flex mb-4">
                  <div className="w-1/4">
                    <p className="font-bold">Full Name</p>
                  </div>
                  <div className="w-3/4">
                    {isEditing ? (
                      <input
                        type="text"
                        value={data.firstname}
                        onChange={(e) => setData({ ...data, firstname: e.target.value })}
                        className="border p-2 rounded w-full"
                      />
                    ) : (
                      <p>{data.firstname} {data.lastname}</p>
                    )}
                  </div>
                </div>
                <hr className="my-2" />

                {/* Email */}
                <div className="flex mb-4">
                  <div className="w-1/4">
                    <p className="font-bold">Email</p>
                  </div>
                  <div className="w-3/4">
                    {isEditing ? (
                      <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        className="border p-2 rounded w-full"
                      />
                    ) : (
                      <p>{data.email}</p>
                    )}
                  </div>
                </div>
                <hr className="my-2" />

                {/* Phone */}
                <div className="flex mb-4">
                  <div className="w-1/4">
                    <p className="font-bold">Phone</p>
                  </div>
                  <div className="w-3/4">
                    {isEditing ? (
                      <input
                        type="text"
                        value={data.mobile}
                        onChange={(e) => setData({ ...data, mobile: e.target.value })}
                        className="border p-2 rounded w-full"
                      />
                    ) : (
                      <p>{data.mobile}</p>
                    )}
                  </div>
                </div>
                <hr className="my-2" />
              </div>
            </div>
          </div>

          {/* Previous Trip Information */}
          <div className="mb-4 shadow-lg mt-4 p-4 bg-gray-300 rounded">
            <h5 className="text-2xl font-bold">Previous Trip Information</h5>
            {data.trips?.map((trip, i) => (
              <div className="mb-4 shadow-lg p-4 bg-white rounded-lg" key={i}>
                <h6 className="text-lg font-bold">{trip.name}</h6>
                <p>Start Date - {trip.start}</p>
                <p>End Date - {trip.end}</p>
                <p>Is Completed - {trip.is_complete ? "Yes" : "No"}</p>
                <p>Locations: {Array.isArray(trip.locations) ? trip.locations.join(", ") : "None"}</p>


                <button
  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 mt-2 rounded"
  onClick={() => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      navigate(`/delete_trip?t=${trip.id}`);
    }
  }}
>
  Delete Trip
</button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FooterCon />
    </>
  );
};

export default Profile;
