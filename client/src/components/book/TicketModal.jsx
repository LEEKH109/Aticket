import { useEffect, useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { billingApi } from "../../util/billing-axios";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TicketSelectionModal = ({
  open,
  onClose,
  artId,
  timetableId,
  ticketTypes,
  userId,
  shortInfo,
}) => {
  const [selectedTickets, setSelectedTickets] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const initialTickets = ticketTypes.reduce((acc, ticketType) => {
      acc[ticketType.ticketTypeId] = 0;
      return acc;
    }, {});
    setSelectedTickets(initialTickets);
  }, [ticketTypes, open]);

  useEffect(() => {
    const totalPrice = ticketTypes.reduce((acc, ticketType) => {
      const count = selectedTickets[ticketType.ticketTypeId] || 0;
      return acc + count * ticketType.price;
    }, 0);
    setTotalPrice(totalPrice);
  }, [selectedTickets, ticketTypes]);

  const adjustTicketCount = (ticketTypeId, adjustment) => {
    setSelectedTickets((prevTickets) => ({
      ...prevTickets,
      [ticketTypeId]: Math.max(
        0,
        (prevTickets[ticketTypeId] || 0) + adjustment
      ),
    }));
  };

  const handleSubmit = () => {
    const order = {
      artId,
      timetableId,
      tickets: Object.entries(selectedTickets)
        .filter(([_, count]) => count > 0)
        .map(([ticketTypeId, count]) => ({
          ticketTypeId: parseInt(ticketTypeId),
          count,
        })),
    };
    // 예매 요청 보내기
    billingApi
      .submitReservationForTicket(
        userId,
        order.artId,
        order.timetableId,
        order.tickets
      )
      .then((response) => {
        console.log("Reservation success:", response.data);
        onClose();
        navigate("/billing/preview", {
          state: {
            ...response.data,
            shortInfo,
            selectedTickets: order.tickets,
            ticketTypes,
            totalPrice,
          },
        });
      })
      .catch((error) => console.error("Reservation failed:", error));
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      maxWidth="md"
      PaperProps={{
        style: {
          minHeight: "60vh",
          maxWidth: "400px",
          borderRadius: "50px 50px 0 0",
          margin: 0,
          padding: 0,
          position: "absolute",
          bottom: 0,
          transform: "none",
        },
      }}
    >
      <div className="flex flex-col pt-7 pb-3.5 font-black text-center bg-white shadow-sm max-w rounded-t-[50px] mx-auto">
        <div className="text-xl text-black">관람 인원</div>
        <div className="shrink-0 mt-2.5 h-px bg-black" />
        {/* 티켓 선택 및 가격 표시 영역 */}
        <div className="flex flex-col mt-8">
          {ticketTypes.map((ticketType) => (
            <div
              key={ticketType.ticketTypeId}
              className="flex items-center justify-between my-4"
            >
              <div>{ticketType.userType}</div>
              <div className="flex items-center">
                <IconButton
                  onClick={() => adjustTicketCount(ticketType.ticketTypeId, -1)}
                >
                  <RemoveIcon />
                </IconButton>
                <span className="mx-4">
                  {selectedTickets[ticketType.ticketTypeId] || 0}
                </span>
                <IconButton
                  onClick={() => adjustTicketCount(ticketType.ticketTypeId, 1)}
                >
                  <AddIcon />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
        <div className="shrink-0 mt-2.5 h-px bg-black" />
        <div className="mt-2.5 text-center text-black">
          총 가격: {totalPrice.toLocaleString()}원
        </div>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            backgroundColor: "#000",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          예매하기
        </Button>
      </div>
    </Dialog>
  );
};

export default TicketSelectionModal;
