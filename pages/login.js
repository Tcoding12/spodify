import { getProviders, signIn } from "next-auth/react";
function login({ providers }) {
  return (
    <div className="flex items-center justify-center justify-items-end flex-col  min-h-screen w-full  bg-black">
      <img className=" w-52 mb-5" src="https://links.papareact.com/9xl" />
      {Object.values(providers).map((provider) => (
        <div>
          <button
            className="bg-[#18D860] text-white p-5 rounded-full"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
