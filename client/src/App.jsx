import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="overflow-x-hidden">
      <AppRoutes />
      <ToastContainer />
    </div>
  );
}

export default App;