package com.xeno.xenocrm.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final WebClient webClient;

    public GeminiService(WebClient.Builder builder) {

        this.webClient = builder.baseUrl(
                "https://generativelanguage.googleapis.com"
        ).build();

    }

    public String generateContent(String prompt) {

        String body = """
        {
          "contents": [
            {
              "parts": [
                {
                  "text": "%s"
                }
              ]
            }
          ]
        }
        """.formatted(prompt.replace("\"", "\\\""));

        try {

            String response = webClient.post()

                    .uri("/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey)

                    .contentType(MediaType.APPLICATION_JSON)

                    .bodyValue(body)

                    .retrieve()

                    .bodyToMono(String.class)

                    .block();

            ObjectMapper mapper = new ObjectMapper();

            JsonNode root = mapper.readTree(response);

            JsonNode textNode = root
                    .path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text");

            return textNode.asText();

        }

        catch (Exception e) {

            return "Gemini Error : " + e.getMessage();

        }

    }

}
