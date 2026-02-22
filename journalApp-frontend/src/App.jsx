import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import CreateEntry from "./pages/CreateEntry"
import ViewEntry from "./pages/ViewEntry"
import EditEntry from "./pages/EditEntry"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminRoute from "./components/AdminRoute"
import Profile from "./pages/Profile"
import AdminUsers from "./pages/AdminUsers"
import EditProfile from "./pages/EditProfile"
import NotFound from "./pages/NotFound"


const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/admin/users" element={
        <AdminRoute>
          <AdminUsers />
        </AdminRoute>} />

        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/edit-profile" element={<EditProfile />} />

      <Route path="/" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>} />
      <Route path="/create" element={
        <ProtectedRoute>
          <CreateEntry />
        </ProtectedRoute>} />
      <Route path="/entry/:id" element={
       <ProtectedRoute>
         <ViewEntry />
        </ProtectedRoute>} />
      <Route path="/edit/:id" element={
        <ProtectedRoute>
          <EditEntry />
        </ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App