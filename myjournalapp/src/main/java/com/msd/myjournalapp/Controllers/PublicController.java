package com.msd.myjournalapp.Controllers;

import com.msd.myjournalapp.Entities.User;
import com.msd.myjournalapp.Services.UserDetailServiceImpl;
import com.msd.myjournalapp.Services.UserServices;
import com.msd.myjournalapp.Utils.JwtUtils;
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
public class PublicController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserServices userServices;

    @Autowired
    private UserDetailServiceImpl userDetailServiceImpl;
    @Autowired
    private JwtUtils jwtUtils;
    @GetMapping("/health-check")
    public String healthCheck(){
        return "OK";
    }

    @PostMapping("/signup")
    public void createUser(@RequestBody User user){
        userServices.saveUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user){
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword()));
            UserDetails userDetails = userDetailServiceImpl.loadUserByUsername(user.getUsername());
            String jwt = jwtUtils.generateToken(userDetails);
            return new ResponseEntity<>(jwt,HttpStatus.OK);
        }catch (Exception e){
            System.out.println("Exception occured while creating AuthenticationToken" + e);
            return new ResponseEntity<>("Incorrect username or password",HttpStatus.BAD_REQUEST);
        }
    }

}
