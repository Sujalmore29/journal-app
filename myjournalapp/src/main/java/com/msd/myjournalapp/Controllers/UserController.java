package com.msd.myjournalapp.Controllers;

import com.msd.myjournalapp.Entities.User;
import com.msd.myjournalapp.Services.GeminiService;
import com.msd.myjournalapp.Services.UserDetailServiceImpl;
import com.msd.myjournalapp.Services.UserServices;
import com.msd.myjournalapp.api.response.WeatherResponse;
import com.msd.myjournalapp.Services.WeatherService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserServices userServices;
    private final WeatherService weatherService;
    private final GeminiService geminiService;
    private final UserDetailServiceImpl userDetailService;

    @GetMapping("/get-user")
    public ResponseEntity<?> getUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        UserDetails user = userDetailService.loadUserByUsername(username);
        return new ResponseEntity<>(user,HttpStatus.OK);
    }

    @GetMapping("/test-gemini")
    public String testGemini(){
        return geminiService
                .analyzeSentiment("Today was amazing. I got placed.")
                .name();
    }

    @GetMapping("/get-user-and-weather")
    public ResponseEntity<?> getGreetings(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userServices.findByUsername(username);
        WeatherResponse weatherResponse = weatherService.getWeather(user.getCity());
        String feelsLike = ", weather feels like " + weatherResponse.current.getFeelslike_c();
        if(weatherResponse != null){
            return new ResponseEntity<>("HI " + username + feelsLike,HttpStatus.OK);
        }
       return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping
    public ResponseEntity<?> changeUser(@RequestBody User user){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User userInDb = userServices.getUserByUsername(username);
        userInDb.setUsername(user.getUsername());
        userInDb.setPassword(user.getPassword());
        userServices.saveUserAfterSignUp(userInDb);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/weekly-sentiment")
    public ResponseEntity<?> setWeeklySentiment(){
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            boolean sentimentAnalysis = userServices.getSentimentAnalysis(username);
            sentimentAnalysis = !sentimentAnalysis;
            User user = userServices.getUserByUsername(username);
            user.setSentimentAnalysis(sentimentAnalysis);
            userServices.saveUser(user);
            return ResponseEntity.ok(sentimentAnalysis);
        }catch (Exception e){
            log.error("Error occurred while setting sentiment analysis",e);
        }
        return ResponseEntity.badRequest().body("Error occurred");
    }

    @DeleteMapping
    public ResponseEntity<?> deleteUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        userServices.deleteUser(authentication.getName());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
