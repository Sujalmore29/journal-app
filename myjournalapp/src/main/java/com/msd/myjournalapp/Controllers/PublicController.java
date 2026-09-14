package com.msd.myjournalapp.Controllers;

import com.msd.myjournalapp.Entities.User;
import com.msd.myjournalapp.Services.UserDetailServiceImpl;
import com.msd.myjournalapp.Services.UserServices;
import com.msd.myjournalapp.Utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/public")
@RequiredArgsConstructor
public class PublicController {


    private final AuthenticationManager authenticationManager;
    private final UserServices userServices;
    private final UserDetailServiceImpl userDetailServiceImpl;
    private final JwtUtils jwtUtils;
    @GetMapping("/health-check")
    public String healthCheck(){
        return "OK";
    }

    @PostMapping("/signup")
    public void createUser(@RequestBody User user){
        userServices.saveUserAfterSignUp(user);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user){
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword()));
            UserDetails userDetails = userDetailServiceImpl.loadUserByUsername(user.getUsername());
            String jwt = jwtUtils.generateToken(userDetails);
            return new ResponseEntity<>(jwt,HttpStatus.OK);
        }catch (Exception e){
            System.out.println("Exception occurred while creating AuthenticationToken" + e);
            return new ResponseEntity<>("Incorrect username or password",HttpStatus.BAD_REQUEST);
        }
    }

}
