package com.msd.myjournalapp.Controllers;

import com.msd.myjournalapp.Cache.AppCache;
import com.msd.myjournalapp.Entities.User;
import com.msd.myjournalapp.Services.UserServices;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserServices userServices;

    private final AppCache appCache;

    @GetMapping("/getAllUser")
    public ResponseEntity<?> getAllUsers(){
        List<User> all = userServices.getAll();
        if(all != null && !all.isEmpty()){
            return new ResponseEntity<>(all, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/promote/{username}")
    public ResponseEntity<?> createAdmin(@PathVariable String username){
        userServices.saveAdmin(username);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/clear-appCache")
    public void clearAppCache(){
        appCache.init();
    }

    @DeleteMapping("/delete-user/{username}")
    public ResponseEntity<?> deleteUserByUsername(@PathVariable String username){
        userServices.deleteUser(username);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
