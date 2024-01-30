package me.articket.vendor.tickettype.data;

import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class TicketTypeDtoRes {
    private int ticketId;
    private String name;
    private int price;
}
