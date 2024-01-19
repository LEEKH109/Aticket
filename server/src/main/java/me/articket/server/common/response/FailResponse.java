package me.articket.server.common.response;

public class FailResponse<T> extends BaseResponse<T> {
    public FailResponse(T data) {
        super("fail", data);
    }
}
