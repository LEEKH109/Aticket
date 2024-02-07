package me.articket.server.common.response;

import java.util.Map;
import java.util.TreeMap;

public class FailResponse<T> extends BaseResponse<T> {
    public FailResponse(T data) {
        super("fail", data);
    }

    public static FailResponse<Map<String, String>> of(String code, String message) {
        Map<String, String> data = new TreeMap<>();
        data.put("code", code);
        data.put("message", message);
        return new FailResponse<>(data);
    }
}
