import Layout from "@/components/Layout";
import MyBookings from "@/components/MyBookings";

const BookingsPage: React.FC = () => {
  return (
    <Layout>
      <div className=" mt-[80px] lg:mt-[165px] md:mt-[175px]">
        <MyBookings />
      </div>
    </Layout>
  );
};

export default BookingsPage;
