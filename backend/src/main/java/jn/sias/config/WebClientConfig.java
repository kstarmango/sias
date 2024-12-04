package jn.sias.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.netty.channel.ChannelOption;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.DefaultUriBuilderFactory;
import reactor.netty.http.client.HttpClient;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

@Slf4j
@Configuration
public class WebClientConfig {

    @Value("${search-api.vworld.url}")
    String baseUrl;

    private static final ExchangeFilterFunction logRequest = ExchangeFilterFunction.ofRequestProcessor(clientRequest -> {
        log.info("Request URL: " + clientRequest.url());
        log.info("Request Method: " + clientRequest.method());
        clientRequest.headers().forEach((name, values) -> values.forEach(value -> System.out.println(name + ": " + value)));
        return Mono.just(clientRequest);
    });

    private static final ExchangeFilterFunction logResponse = ExchangeFilterFunction.ofResponseProcessor(clientResponse -> {
        System.out.println("Response Status Code: " + clientResponse.statusCode());
        return Mono.just(clientResponse);
    });

    @Bean
    public ObjectMapper objectMapper(){
      return new ObjectMapper();
    }

    @Bean
    public WebClient webClient(WebClient.Builder builder) {

        // 1. 인코딩 설정
        DefaultUriBuilderFactory factory = new DefaultUriBuilderFactory(baseUrl);
        factory.setEncodingMode(DefaultUriBuilderFactory.EncodingMode.URI_COMPONENT);


        // 2. timeout 설정
        HttpClient httpClient = HttpClient.create()
                .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 10000)
                .responseTimeout(Duration.ofMillis(5000))
                .doOnConnected(conn ->
                        conn.addHandlerLast(new ReadTimeoutHandler(5000, TimeUnit.MILLISECONDS))
                                .addHandlerLast(new WriteTimeoutHandler(5000, TimeUnit.MILLISECONDS)));

        // 3. memory 설정
        ExchangeStrategies exchangeStrategies = ExchangeStrategies.builder()
                .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(50 * 1024 * 1024)) // to unlimited memory size
                .build();


        return builder.clientConnector(new ReactorClientHttpConnector(httpClient))
                .uriBuilderFactory(factory)
                .baseUrl(baseUrl)
                .filter(logRequest)
                .filter(logResponse)
                .exchangeStrategies(exchangeStrategies)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

}
