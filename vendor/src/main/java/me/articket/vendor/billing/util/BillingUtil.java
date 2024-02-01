package me.articket.vendor.billing.util;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import me.articket.vendor.billing.data.PaymentPreparationDto;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

public class BillingUtil {
  public static MultiValueMap<String, String> convertToMultiValueMap(PaymentPreparationDto paymentInfo) {
    Map<String, String> map = new HashMap<>();
    map.put("cid", paymentInfo.getCid());
    map.put("partner_order_id", paymentInfo.getPartnerOrderId());
    map.put("partner_user_id", paymentInfo.getPartnerUserId());
    map.put("item_name", paymentInfo.getItemName());
    map.put("quantity", paymentInfo.getQuantity().toString());
    map.put("total_amount", paymentInfo.getTotalAmount().toString());
    map.put("vat_amount", paymentInfo.getVatAmount().toString());
    map.put("tax_free_amount", paymentInfo.getTaxFreeAmount().toString());
    map.put("approval_url", paymentInfo.getApprovalUrl());
    map.put("fail_url", paymentInfo.getFailUrl());
    map.put("cancel_url", paymentInfo.getCancelUrl());

    return new LinkedMultiValueMap<>(map.entrySet().stream()
        .collect(Collectors.toMap(Map.Entry::getKey, e -> Collections.singletonList(e.getValue()))));
  }

}
