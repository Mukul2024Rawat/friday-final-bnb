import Layout from "@/components/Layout";
import MyProfile from "@/components/MyProfile";

const ProfilePage: React.FC = () => {
  return (
    <Layout>
      <div className=" mt-[80px] lg:mt-[165px] md:mt-[195px]">
        <MyProfile />
      </div>
    </Layout>
  );
};

export default ProfilePage;
