import { useAuthContext } from "~/providers";

export const Navbar = () => {
  const { cb } = useAuthContext();

  return (
    <nav className="flex">
      <h1 className="text-xl">Navbar</h1>
      <div className="flex items-center gap-4">
        {/* <span className="text-lg">Counter: {counter}</span> */}
        <button className="h-10 rounded-lg px-4 font-medium text-white transition" onClick={cb}>
          Increase Counter
        </button>
      </div>
    </nav>
  );
};
