package com.msd.myjournalapp.Services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.msd.myjournalapp.Enums.Sentiment;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@RequiredArgsConstructor
@Service
public class GeminiService {

    @Value("${GEMINI_API_KEY}")
    private String apiKey;
    private final RestTemplate restTemplate;
    private final ObjectMapper mapper = new ObjectMapper();
    public Sentiment analyzeSentiment(String journalContent){

        try{
            String prompt =
                    """
                    You are a sentiment classifier.
                    
                    Classify the journal into ONLY ONE of the following words.
                    
                    HAPPY
                    SAD
                    ANGRY
                    EXCITED
                    CALM
                    ANXIOUS
                    MOTIVATED
                    TIRED
                    GRATEFUL
                    STRESSED
                    
                    Return ONLY ONE WORD.
                                        
                    
                    Journal:
                    """ + journalContent;

            String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=" + apiKey;

            String body = """
                    {
                      "contents":[
                        {
                          "parts":[
                            {
                              "text":"%s"
                            }
                          ]
                        }
                      ]
                    }
                    """.formatted(prompt.replace("\"","\\\""));

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<String> request = new HttpEntity<>(body, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(url,request, String.class);

            JsonNode root = mapper.readTree(response.getBody());

            String sentiment = root.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText()
                    .trim();
            return Sentiment.valueOf(sentiment);
        }catch (Exception e){
            return Sentiment.CALM;
        }
    }
}
