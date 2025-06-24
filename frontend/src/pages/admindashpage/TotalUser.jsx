import { useEffect, useState } from "react";
import axios from "axios";

const TotalUser = () => {
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const getUserCount = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/user-count");
      if (data.success) {
        setUserCount(data.userCount);
      }
    } catch (error) {
      console.error("Error fetching user count", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserCount();
  }, []);

  return (
    <>
      <p className="text-2xl font-semibold">
        {loading ? "Loading..." : userCount}
      </p>
    </>
  );
};

export default TotalUser;
