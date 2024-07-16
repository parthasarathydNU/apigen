import { useEffect, useState } from "react";
import "./App.css";
import ReusableTable from "./Components/ReusableTable";
import { getUserData } from "./api/hooks";
import { User, userArraySchema } from "./api/types";

function App() {
  const [userData, setUserData] = useState<User[]>([]);
  /**
   * Ideal situation - use data hooks to use react-query to cache and
   * invalidate data fetches
   */
  // const {data, isLoading, error} = useUserData();

  // Run this side effect after initial render
  useEffect(() => {
    let ignore = false;
    setUserData([]);

    const fetchData = async () => {
      const data = getUserData();

      // validate data
      const { data: userData, error, success } = userArraySchema.safeParse(data);

      if (error) {
        console.log("Error in fetching user data ", error);
      }

      if (success && userData) {
        if (!ignore) {
          console.log("Setting user data")
          setUserData(userData);
        }
      }
    };

    fetchData();

    return () => {
      console.log("Ignoring data fetch")
      ignore = true;
    };
  }, []);

  return (
    <div className="bg-black h-lvh text-white items-center justify-center flex">
      <ReusableTable />
      <>{JSON.stringify(userData)}</>
    </div>
  );
}

export default App;
