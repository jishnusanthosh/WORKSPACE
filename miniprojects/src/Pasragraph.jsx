import { useState } from "react";

function Pasragraph() {
  const [isVisible, setIsVisible] = useState(true);

  const toggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      

      <button  onClick={toggle}  className=" px-6 py-2 rounded-lg font-bold  bg-black text-white   ">
        hide/unhide
      </button>



      {isVisible ? (
  <p className="bg-gray-800 text-gray-300">
    Hello.....
  </p>
) : null}
    </div>
  );
}

export default Pasragraph;
