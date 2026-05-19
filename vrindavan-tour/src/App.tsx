import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PageLoader } from "@/components/ui/shared";

// Route-level code splitting — each page loads only when first visited
const Home             = lazy(() => import("@/pages/Home"));
const Packages         = lazy(() => import("@/pages/Packages"));
const PackageDetailPage = lazy(() => import("@/pages/PackageDetailPage"));
const ThankYou         = lazy(() => import("@/pages/ThankYou"));
const Taxi             = lazy(() => import("@/pages/Taxi"));
const DivineServices   = lazy(() => import("@/pages/DivineServices"));
const Gallery          = lazy(() => import("@/pages/Gallery"));
const Testimonials     = lazy(() => import("@/pages/Testimonials"));
const About            = lazy(() => import("@/pages/About"));
const Contact          = lazy(() => import("@/pages/Contact"));
const NotFound         = lazy(() => import("@/pages/not-found"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/"                component={Home}          />
        <Route path="/packages"        component={Packages}      />
        <Route path="/packages/:id"    component={PackageDetailPage} />
        <Route path="/thank-you"       component={ThankYou}          />
        <Route path="/taxi"            component={Taxi}          />
        <Route path="/divine-services" component={DivineServices} />
        <Route path="/gallery"         component={Gallery}       />
        <Route path="/testimonials"    component={Testimonials}  />
        <Route path="/about"           component={About}         />
        <Route path="/contact"         component={Contact}       />
        <Route                         component={NotFound}      />
      </Switch>
    </Suspense>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
