// import axios from "axios";
// import Head from "next/head";
// import Image from "next/image";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  return (
    <>
      <div>
        <h1>Hello World</h1>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  return {
    props: {},
  };
};

export default Login;
