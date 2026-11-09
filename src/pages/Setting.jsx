import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Setting = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = updateProfile(name, email);
    setMessage(result.success ? "Your profile has been updated." : result.message);
    setIsError(!result.success);
  };

  return (
    <div className="w-full min-w-0">
      <section className="w-full rounded-2xl bg-white p-5 shadow-sm sm:p-8">
        <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">Manage your local admin profile.</p>

        <form onSubmit={handleSubmit} className="mt-6 grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="profile-name" className="block text-sm font-medium text-slate-700">Name</label>
            <input
              id="profile-name"
              type="text"
              required
              minLength={2}
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div>
            <label htmlFor="profile-email" className="block text-sm font-medium text-slate-700">Email</label>
            <input
              id="profile-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          {message && (
            <p role={isError ? "alert" : "status"} className={`text-sm sm:col-span-2 ${isError ? "text-red-700" : "text-green-700"}`}>
              {message}
            </p>
          )}
          <button type="submit" className="w-fit rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
            Save profile
          </button>
        </form>

        <p className="mt-8 border-t border-slate-100 pt-4 text-xs text-slate-400">
          Profile information is stored in this browser until a backend is connected.
        </p>
      </section>
    </div>
  );
};

export default Setting;
