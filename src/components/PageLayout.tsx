import Footer from "./Footer";
import Header from "./Header";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="pt-24 flex-grow p-4 sm:p-8 md:p-16 lg:p-24">
        {children}
      </main>
      <Footer />
    </div>
  );
};
export default PageLayout;
