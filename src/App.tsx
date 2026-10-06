import { useState } from "react";

interface User {
  name: string;
  email: string;
  country: string;
  picture: string;
}

export default function App() {
  const dummyUser = {
    name: 'john doe',
    email: 'john.doe@example.com',
    country: 'united states',
    picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  }

  const [user, setUser] = useState<User>(dummyUser);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);


    try {
      const response = await fetch('https://randomuser.me/api/');
      const data = await response.json();

      const userData = data.results[0];

      setUser({
        name: `${userData.name.first} ${userData.name.last}`,
        email: userData.email,
        country: userData.location.country,
        picture: userData.picture.large,
      });

    } catch (err) {
      setError('Failed to fetch user. Check your connection.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-800 text-stone-200 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-900 rounded-2xl p-6 shadow-2xl text-center space-y-6">

        <div className="border-b border-slate-800 pb-3">
          <span className="text-s uppercase tracking-widest text-slate-500 font-semibold">Random profile</span>
        </div>

        <div className="flex justify-center">
          <img src={user.picture} alt="user avatar"
            className="w-24 h-24 rounded-full object-cover border-2 border-slate-700 shadow-lg"
          />
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-bold text-stone-100">{user.name}</h2>
          <p className="text-xs text-slate-500">{user.email}</p>
          <p className="text-xs text-slate-500">📍 {user.country}</p>
        </div>
        <button
        onClick={fetchUser}
        className="w-full bg-slate-400 hover:bg-white text-slate-900 font-semibold py-2.5 px-4 rounded-xl transition-all active:scale-95 text-sm cursor-pointer">
          {loading ? 'searching...' : 'Generate new user'}
        </button>
      </div>
    </div>
  );
}