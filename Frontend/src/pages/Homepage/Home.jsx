import Categories from "../catergoriespage/Categories";
import Hero from "../../components/home/Hero";
import BrowseIndustries from "../../components/ui/BrowseIndustries";
import FromOurCustomers from "../../components/ui/FromOurCustomers";
import ProductSlider from "../../components/ui/ProductSlider";

const Home = () => {
    return (
        <>
            <Hero />

            <Categories />

            <BrowseIndustries />

            <FromOurCustomers />

            <ProductSlider />

            {/* <Products />

            <AboutSection />

            <WhyChooseUs />

            <Brands />

            <Testimonials />

            <FAQ />

            <ContactSection /> */}
        </>
    );
};

export default Home;