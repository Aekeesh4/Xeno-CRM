package com.xeno.xenocrm.controller;

import com.xeno.xenocrm.repository.CustomerRepository;
import com.xeno.xenocrm.repository.LeadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private LeadRepository leadRepository;

    @GetMapping("/total-customers")
    public long totalCustomers() {
        return customerRepository.count();
    }

    @GetMapping("/total-leads")
    public long totalLeads() {
        return leadRepository.count();
    }

    @GetMapping("/new-leads")
    public long newLeads() {
        return leadRepository.countByStatus("NEW");
    }

    @GetMapping("/contacted-leads")
    public long contactedLeads() {
        return leadRepository.countByStatus("CONTACTED");

    }
    @GetMapping("/converted-leads")
    public long getConvertedLeads() {
        return leadRepository.countByStatus("CONVERTED");
    }
}
