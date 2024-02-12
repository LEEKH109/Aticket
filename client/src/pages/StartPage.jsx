import { useState } from "react";
import { useEffect } from "react";

const StartPage = () => {
    const [logoOpacity, setLogoOpacity] = useState(0);
    useEffect(() => {
        setLogoOpacity(100);
    })
    return (
        <>
          <div className="h-[calc(100%_-_64px)] flex flex-col align-middle justify-items-center justify-center text-center bg-zinc-100">
            <div className={`m-auto mt-0 mb-0 transition-opacity ease-in-out duration-1000 opacity-${logoOpacity}`}>
            <img className="w-64" src="/img/logo.png"/>
            </div>
            <p className="mt-10"/>
            <h1 className="text-4xl leading-10 mb-8 font-extrabold p-10">
              지금 바로 아티켓과 함께하세요.
            </h1>
          </div>
        </>
      );
}
export default StartPage;