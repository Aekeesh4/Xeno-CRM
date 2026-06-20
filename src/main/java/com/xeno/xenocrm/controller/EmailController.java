package com.xeno.xenocrm.controller;

import com.xeno.xenocrm.service.EmailService;
import com.xeno.xenocrm.service.ActivityService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = "*")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private ActivityService activityService;


    @PostMapping("/send")
    public String sendEmail(

            @RequestBody Map<String, String> request

    ) {

        String to = request.get("to");

        String subject = request.get("subject");

        String body = request.get("body");


        emailService.sendEmail(

                to,

                subject,

                body

        );


        activityService.saveActivity(

                "Email sent to " + to

        );


        return "Email Sent Successfully";

    }

}