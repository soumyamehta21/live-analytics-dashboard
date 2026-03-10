import { DashboardPage } from "./pages/DashboardPage";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { isDark, toggle } = useTheme();

  return <DashboardPage isDark={isDark} onToggleTheme={toggle} />;
}

export default App;
