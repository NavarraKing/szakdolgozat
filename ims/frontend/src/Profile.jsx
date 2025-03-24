import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthProvider.jsx";
import { Modal, Button, Card } from "react-bootstrap";

function Profile() {
  const { user, token, handleLogout, handleLogin } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone_number: "",
    country_code: "+36",
    given_name: "",
    family_name: "",
    dob: "",
    address: "",
    password: "",
    currentPassword: "",
    profilePicture: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const [isEmailAvailable, setIsEmailAvailable] = useState(true);
  const [isPhoneNumberAvailable, setIsPhoneNumberAvailable] = useState(true);
  const [showPicturePopup, setShowPicturePopup] = useState(false);
  const [tempProfilePicture, setTempProfilePicture] = useState("");
  const [role, setRole] = useState("User");
  const defaultProfilePicture =
    "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setFormData({
            username: data.user.username || "",
            email: data.user.email || "",
            phone_number: data.user.phone_number || "",
            country_code: data.user.country_code || "+36",
            given_name: data.user.given_name || "",
            family_name: data.user.family_name || "",
            dob: data.user.dob ? new Date(data.user.dob).toISOString().split("T")[0] : "",
            address: data.user.address || "",
            password: "",
            currentPassword: "",
            profilePicture: data.user.profile_picture || defaultProfilePicture,
          });
          setRole(data.user.role || "User");
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Error fetching user data.");
      }
    };

    fetchUserData();
  }, [token]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateDOB = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    return (
      age > 16 ||
      (age === 16 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)))
    );
  };

  const isValidDate = (dob) => {
    const [year, month, day] = dob.split("-").map(Number);
    if (year < 1925 || year > 2025) return false;
    if (month < 1 || month > 12) return false;

    const daysInMonth = new Date(year, month, 0).getDate();
    return day >= 1 && day <= daysInMonth;
  };

  const checkUsernameAvailability = async (username) => {
    if (username === user.username) {
      setIsUsernameAvailable(true);
      return;
    }
    if (!username) {
      setIsUsernameAvailable(false);
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/check-username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      setIsUsernameAvailable(data.available);
    } catch (err) {
      console.error("Error checking username availability:", err);
    }
  };

  const checkEmailAvailability = async (email) => {
    if (email === user.email) {
      setIsEmailAvailable(true);
      return;
    }
    if (!email || !validateEmail(email)) {
      setIsEmailAvailable(false);
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setIsEmailAvailable(data.available);
    } catch (err) {
      console.error("Error checking email availability:", err);
    }
  };

  const checkPhoneNumberAvailability = async (phone_number) => {
    const fullPhoneNumber = `${formData.country_code}${phone_number}`;
    if (fullPhoneNumber === user.phone_number) {
      setIsPhoneNumberAvailable(true);
      return;
    }
    if (!phone_number) {
      setIsPhoneNumberAvailable(true);
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/check-phone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ phone_number: fullPhoneNumber }),
      });
      const data = await response.json();
      setIsPhoneNumberAvailable(data.available);
    } catch (err) {
      console.error("Error checking phone number availability:", err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.currentPassword) {
      return setError("Current password is required to update your profile.");
    }

    if (!formData.username) {
      return setError("Username cannot be empty.");
    }

    if (!validateEmail(formData.email)) {
      return setError("Invalid email format.");
    }

    if (!isUsernameAvailable) {
      return setError("Username is already in use.");
    }

    if (!isEmailAvailable) {
      return setError("Email is already in use.");
    }

    if (!isPhoneNumberAvailable) {
      return setError("Phone number is already in use.");
    }

    if (formData.password && !validatePassword(formData.password)) {
      return setError(
        "Password must be at least 8 characters long, include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
      );
    }

    if (formData.dob && formData.dob.length > 10) {
      return setError("Invalid date of birth format. Ensure it is a valid string.");
    }

    const updatedFormData = {
      ...formData,
      phone_number: formData.phone_number || null,
      number_countrycode: formData.country_code || null,
      given_name: formData.given_name || null,
      family_name: formData.family_name || null,
      dob: formData.dob || null,
      address: formData.address || null,
      profile_picture: formData.profilePicture || null,
    };

    try {
      const response = await fetch("http://localhost:5000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFormData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess("Profile updated successfully!");

        const newToken = data.token;
        localStorage.setItem("token", newToken);
        handleLogin(user, newToken);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Error updating profile.");
    }
  };

  const handleProfilePictureChange = () => {
    const img = new Image();
    img.src = tempProfilePicture;
    img.onload = () => {
      setFormData({ ...formData, profilePicture: tempProfilePicture });
      setShowPicturePopup(false);
      setError("");
    };
    img.onerror = () => {
      setError("Invalid image URL.");
    };
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setFormData({ ...formData, phone_number: value });
  };

  const resetProfilePicture = () => {
    setFormData({ ...formData, profilePicture: defaultProfilePicture });
  };

  const currentYear = new Date().getFullYear();

  const handleDOBChange = (e) => {
    const value = e.target.value;
    if (value.length > 10) {
      setError("Invalid date format. Ensure it is a valid string.");
      return;
    }
    setFormData({ ...formData, dob: value });
    setError("");
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">
        Welcome {role}, {formData.username}
      </h1>
      <div className="card mx-auto mt-4" style={{ maxWidth: "600px" }}>
        <div className="card-body text-center">
          <div
            className="position-relative"
            style={{
              width: "150px",
              height: "150px",
              margin: "0 auto",
            }}
          >
            <img
              src={formData.profilePicture}
              alt="Profile"
              className="rounded-circle mb-3"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            {formData.profilePicture !== defaultProfilePicture && (
              <button
                className="btn btn-danger btn-sm position-absolute"
                style={{ top: "10px", right: "10px" }}
                onClick={resetProfilePicture}
              >
                X
              </button>
            )}
            <div
              className="position-absolute d-flex justify-content-center align-items-center"
              style={{
                width: "150px",
                height: "150px",
                top: 0,
                left: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                opacity: 0,
                transition: "opacity 0.3s",
                cursor: "pointer",
                borderRadius: "50%",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
              onClick={() => setShowPicturePopup(true)}
            >
              <span className="text-white">Change Picture</span>
            </div>
          </div>
          <form onSubmit={handleUpdate} style={{ marginTop: "20px" }}>
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="New Username"
                value={formData.username}
                onChange={(e) => {
                  setFormData({ ...formData, username: e.target.value });
                  checkUsernameAvailability(e.target.value);
                }}
              />
              {!formData.username && (
                <small className="text-danger">Username cannot be empty.</small>
              )}
              {!isUsernameAvailable && formData.username && (
                <small className="text-danger">Username is already in use.</small>
              )}
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="New Email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  checkEmailAvailability(e.target.value);
                }}
              />
              {!formData.email && (
                <small className="text-danger">Email cannot be empty.</small>
              )}
              {!isEmailAvailable && formData.email && (
                <small className="text-danger">Email is already in use.</small>
              )}
            </div>
            <div className="mb-3">
              <div className="input-group">
                <select
                  className="form-select"
                  value={formData.country_code}
                  onChange={(e) =>
                    setFormData({ ...formData, country_code: e.target.value })
                  }
                >
                  <option value="+36">+36 (Hungary)</option>
                  <option value="+1">+1 (USA)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+49">+49 (Germany)</option>
                </select>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone Number"
                  value={formData.phone_number}
                  onChange={handlePhoneNumberChange}
                />
              </div>
              {!isPhoneNumberAvailable && formData.phone_number && (
                <small className="text-danger">Phone number is already in use.</small>
              )}
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="New Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              {formData.password && !validatePassword(formData.password) && (
                <small className="text-danger">
                  Password must be at least 8 characters long, include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.
                </small>
              )}
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Given Name"
                value={formData.given_name}
                onChange={(e) =>
                  setFormData({ ...formData, given_name: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Family Name"
                value={formData.family_name}
                onChange={(e) =>
                  setFormData({ ...formData, family_name: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <input
                type="date"
                className="form-control"
                placeholder="Date of Birth"
                value={formData.dob}
                onChange={handleDOBChange}
                max={`${currentYear}-12-31`}
              />
              {formData.dob && !isValidDate(formData.dob) && (
                <small className="text-danger">
                  Invalid date. Ensure the year is between 1925 and {currentYear}.
                </small>
              )}
              {formData.dob && !validateDOB(formData.dob) && (
                <small className="text-danger">You must be at least 16 years old.</small>
              )}
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Current Password"
                value={formData.currentPassword}
                onChange={(e) =>
                  setFormData({ ...formData, currentPassword: e.target.value })
                }
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Update Profile
            </button>
          </form>
          <button
            className="btn btn-danger mt-3 w-100"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <Modal show={showPicturePopup} onHide={() => setShowPicturePopup(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Change Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="text-center">
            <Card.Img
              variant="top"
              src={formData.profilePicture || defaultProfilePicture}
              alt="Current Profile"
              style={{ width: "100px", height: "100px", objectFit: "cover", margin: "0 auto" }}
              className="rounded-circle"
            />
            <Card.Body>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Paste image URL"
                value={tempProfilePicture}
                onChange={(e) => setTempProfilePicture(e.target.value)}
              />
              <Button variant="primary" onClick={handleProfilePictureChange}>
                Check
              </Button>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Profile;