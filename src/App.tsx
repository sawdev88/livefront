import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./Pages/HomePage";
import DetailsPage from "./Pages/DetailsPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PageLayout from "./components/PageLayout";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <PageLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/details/:uri" element={<DetailsPage />} />
            <Route path="*" element={<p>Page not found (404)</p>} />
          </Routes>
        </PageLayout>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
