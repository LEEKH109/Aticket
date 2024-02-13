package me.articket.server.common.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer  {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws").setAllowedOrigins("http://i10a704.p.ssafy.io","http://i10a704.p.ssafy.io:8081","http://i10a704.p.ssafy.io:8082","http://i10a704.p.ssafy.io:80","http://localhost:5173","http://localhost:4173","https://articket.me").setAllowedOriginPatterns("*").withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/app");//채팅 보낼 때 앞에 send 붙이면 메시지브로커에게 도착
        registry.enableSimpleBroker("/room");//room이 붙은 경로에 대해 브로커 발동, sendTo에서 /room/어쩌구로 활용
    }

}
