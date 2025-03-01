import { useAuthContext } from "~/providers";
import { Outlet } from "react-router";

export default function Home() {
  const { counter } = useAuthContext();

  return (
    <>
      <p>Home</p>
      <div className="h-16 w-full bg-[green]">
        <p className="text-[white]">Counter: {counter}</p>
      </div>
    </>
  );
}
