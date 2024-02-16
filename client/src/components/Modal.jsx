import { useEffect, forwardRef, useRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";
import CloseIcon from "@mui/icons-material/Close";

const Modal = forwardRef(function Modal({ children }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
      close() {
        dialog.current.close();
      },
    };
  });

  useEffect(() => {
    if (dialog.current) {
      const dialogElement = dialog.current;

      dialogElement.addEventListener("click", (e) => {
        const dialogArea = dialogElement.getBoundingClientRect();

        if (
          e.clientX < dialogArea.left ||
          e.clientX > dialogArea.right ||
          e.clientY < dialogArea.top ||
          e.clientY > dialogArea.bottom
        ) {
          dialogElement.close();
        }
      });
    }
  }, []);

  return createPortal(
    <dialog ref={dialog} className="w-80 p-6 rounded-lg">
      <form method="dialog" className="reltive text-end">
        <button className="absolute top-2 right-2">
          <CloseIcon color="disabled" />
        </button>
      </form>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
});
export default Modal;
