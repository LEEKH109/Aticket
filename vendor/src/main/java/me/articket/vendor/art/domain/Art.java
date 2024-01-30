package me.articket.vendor.art.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class Art {

  private Integer artId;
  private Integer categoryId;
  private String title;
}

