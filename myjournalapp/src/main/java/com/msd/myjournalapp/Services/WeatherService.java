package com.msd.myjournalapp.Services;

import com.msd.myjournalapp.Cache.AppCache;
import com.msd.myjournalapp.Constants.Placeholders;
import com.msd.myjournalapp.Services.RedisService;
import com.msd.myjournalapp.api.response.WeatherResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class WeatherService {
    @Value("${weather.api.key}")
    private String apiKey;
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private AppCache appCache;

    @Autowired
    private RedisService redisService;

    public WeatherResponse getWeather(String city){
        try {
            WeatherResponse weatherResponse = redisService.get("weather_of_" + city, WeatherResponse.class);
            if(weatherResponse != null){
                return weatherResponse;
            }else{
                String finalApi = appCache.appCache.get("WEATHER_API").replace(Placeholders.CITY,city).replace(Placeholders.API_KEY,apiKey);
                ResponseEntity<WeatherResponse> response = restTemplate.exchange(finalApi, HttpMethod.GET, null, WeatherResponse.class);
                WeatherResponse body = response.getBody();
                if(body != null){
                    redisService.set("weather_of_" + city,body,300l);
                }
                return body;
            }

        }catch (Exception e) {
            System.out.println("Error occured while fetching data" + e);
        }
        return null;
    }
}
