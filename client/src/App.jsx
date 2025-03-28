import { BrowserRouter,Route,Routes } from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import About from "./pages/About"
import Profile from "./pages/Profile"
import Header from "./components/Header"
import PrivateRoute from "./components/PrivateRoute"
import PrivateAdminRoute from "./components/PrivateAdminRoute"
import AdminDashboard from "./pages/AdminDashboard"
import AdminSignIn from "./pages/AdminSignin"

const App = () => {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/about" element={<About />} />
      <Route element={<PrivateRoute/>}>
      <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="/admin/signin" element={<AdminSignIn />} />
        <Route
          path="/admin"
          element={
            <PrivateAdminRoute>
              <AdminDashboard/>
            </PrivateAdminRoute>
          }
        />
    </Routes>
    </BrowserRouter>

  )
}

export default App
