import "./App.css";
import UserTable from "./components/UserTable/UserTable";
import { Toaster } from "./components/ui/sonner"

function App() {


  return (
    <div className="bg-black h-lvh text-white items-center justify-center flex overflow-auto ">
      <UserTable />
      <Toaster />
    </div>
  );
}

export default App;
