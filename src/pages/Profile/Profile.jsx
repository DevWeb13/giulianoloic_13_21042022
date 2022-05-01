import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../utils/selectors";
import Loader from "../../components/Loader/Loader";

function Profile() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  if (user.dataStatus === "pending" || user.tokenStatus === "pending") {
    return <Loader />;
  }

  return user.data ? (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {`${user.data.firstName} ${user.data.lastName}`}!
        </h1>
        <button className="edit-button" onClick={() => navigate("/edit-name")}>
          Edit Name
        </button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  ) : (
    <div className="linkForSignInContainer">
      <h2>You must be authenticated...</h2>
      <Link to="/login" className="linkToSignIn">
        Sign In
      </Link>
    </div>
  );
}

export default Profile;
