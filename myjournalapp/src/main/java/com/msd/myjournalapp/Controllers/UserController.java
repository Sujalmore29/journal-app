package com.msd.myjournalapp.Controllers;

import com.msd.myjournalapp.Entities.User;
import com.msd.myjournalapp.Services.UserDetailServiceImpl;
import com.msd.myjournalapp.Services.UserServices;
import com.msd.myjournalapp.api.response.WeatherResponse;
import com.msd.myjournalapp.Services.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserServices userServices;
    @Autowired
    private WeatherService weatherService;

    @Autowired
    private UserDetailServiceImpl userDetailService;

    @GetMapping("/get-user")
    public ResponseEntity<?> getUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        UserDetails user = userDetailService.loadUserByUsername(username);
        return new ResponseEntity<>(user,HttpStatus.OK);
    }

    @GetMapping("/get-user-and-weather")
    public ResponseEntity<?> getGreetings(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        WeatherResponse weatherResponse = weatherService.getWeather("Ahmedabad");
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
        userServices.saveUser(userInDb);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        userServices.deleteUser(authentication.getName());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
