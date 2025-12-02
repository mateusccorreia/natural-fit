import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './layouts/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Onboarding } from './pages/Onboarding';
import { Workout } from './pages/Workout';
import { WorkoutGenerator } from './pages/WorkoutGenerator';
import { ExerciseLibrary } from './pages/ExerciseLibrary';
import { Progress } from './pages/Progress';
import { Profile } from './pages/Profile';
import { Admin } from './pages/Admin';
import { useAuthStore } from './stores/authStore';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        } />
        
          <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Home />} />
          <Route path="workout" element={<Workout />} />
          <Route path="workout/new" element={<WorkoutGenerator />} />
          <Route path="workout/library" element={<ExerciseLibrary />} />
          <Route path="progress" element={<Progress />} />
          <Route path="profile" element={<Profile />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
