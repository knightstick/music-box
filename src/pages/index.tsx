import { AuthMenu } from "@/components/AuthMenu";
import { Layout } from "@/components/Layout";
import { NextPage } from "next";
import { Search } from "@/components/Search";

const Home: NextPage = () => {

  return (
    <Layout title="Home">
      <h1>Home</h1>
      <AuthMenu />
      <Search />
    </Layout>
  )
}

export default Home;
