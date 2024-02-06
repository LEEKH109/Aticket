import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { billingApi } from "../util/billing-axios";
import { useNavigate } from "react-router-dom";

const TicketSelectionModal = ({
  open,
  onClose,
  artId,
  timetableId,
  ticketTypes,
}) => {
  const [selectedTickets, setSelectedTickets] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // 모달이 열릴 때마다 티켓 선택 상태 초기화
    const initialTickets = ticketTypes.reduce((acc, ticketType) => {
      acc[ticketType.ticketTypeId] = 0;
      return acc;
    }, {});
    setSelectedTickets(initialTickets);
  }, [ticketTypes, open]);

  useEffect(() => {
    // 선택된 티켓에 따라 총 가격 계산
    const totalPrice = ticketTypes.reduce((acc, ticketType) => {
      const count = selectedTickets[ticketType.ticketTypeId] || 0;
      return acc + count * ticketType.price;
    }, 0);
    setTotalPrice(totalPrice);
  }, [selectedTickets, ticketTypes]);

  const handleTicketChange = (ticketTypeId, count) => {
    setSelectedTickets((prev) => ({
      ...prev,
      [ticketTypeId]: count,
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
      .submitReservationForTicket(order.artId, order.timetableId, order.tickets)
      .then((response) => {
        console.log("Reservation success:", response.data);
        onClose();
        navigate("/billing/preview", { state: { ...response.data } });
      })
      .catch((error) => console.error("Reservation failed:", error));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="relative mx-auto max-w-[412px] h-[100vh] p-4"
    >
      <DialogTitle className="text-center text-xl font-bold">
        Select Tickets
      </DialogTitle>
      <DialogContent>
        <List className="space-y-4">
          {ticketTypes.map((ticketType) => (
            <ListItem
              key={ticketType.ticketTypeId}
              className="flex justify-between items-center"
            >
              <div className="font-medium">{ticketType.userType}</div>
              <Select
                value={selectedTickets[ticketType.ticketTypeId] || 0}
                onChange={(e) =>
                  handleTicketChange(ticketType.ticketTypeId, e.target.value)
                }
                className="ml-4"
              >
                {[...Array(10).keys()].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </ListItem>
          ))}
        </List>
        <div className="text-right mt-4 font-semibold">
          Total Price: ${totalPrice}
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Reserve
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketSelectionModal;
