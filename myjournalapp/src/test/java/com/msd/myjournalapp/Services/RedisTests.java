package com.msd.myjournalapp.Services;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;

@SpringBootTest
public class RedisTests {

    @Autowired
    public RedisTemplate redisTemplate;

    @Disabled
    @Test
    void testMail(){
        redisTemplate.opsForValue().set("email","sujal@gmail.com");
        Object salary = redisTemplate.opsForValue().get("salary");
    }
}
