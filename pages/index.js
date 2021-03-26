import Head from "next/head";
import IndexLayout from "../Layouts";
import Banner from "../Components/Banner";
import Content from "../Components/Content";
import { getData } from "../util/fetchData";

const Home = ({ products }) => {
  return (
    <div>
      <Head>
        <title>Afrotrap Web App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <IndexLayout>
          <Banner />
          <Content products={products} />
        </IndexLayout>
      </main>
    </div>
  );
};

export async function getStaticProps(context) {
  const res = await getData(`product`);
  // const data = await res.json();
  console.log(res);

  return {
    props: {
      products: res.products,
      result: res.result,
    }, // will be passed to the page component as props
  };
}

export default Home;
