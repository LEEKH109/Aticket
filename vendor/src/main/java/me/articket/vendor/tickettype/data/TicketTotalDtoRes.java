package me.articket.vendor.tickettype.data;

import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class TicketTotalDtoRes {
    private int artId;
    private String category;
    private String date;
    private List<TicketTypeDtoRes>ticketTypes;
}
