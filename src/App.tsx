
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes";
import Index from "./pages/Index";
import SchemaExplorer from "./pages/SchemaExplorer";
import NotFound from "./pages/NotFound";
import EntryDetail from "./pages/EntryDetail";
import ThreadView from "./pages/ThreadView";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<Index />} />
          <Route path={routes.schemas} element={<SchemaExplorer />} />
          <Route path="/entry/:entryId" element={<EntryDetail />} />
          <Route path="/thread/:threadName" element={<ThreadView />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
