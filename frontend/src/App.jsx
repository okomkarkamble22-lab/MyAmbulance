// Composes application-wide providers and routing.
import AppRoutes from './routes/AppRoutes.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { SocketProvider } from './context/SocketContext.jsx';

const App = () => (
  <AuthProvider>
    <SocketProvider>
      <AppRoutes />
    </SocketProvider>
  </AuthProvider>
);

export default App;
