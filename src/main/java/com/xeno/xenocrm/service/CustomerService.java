package com.xeno.xenocrm.service;

import com.xeno.xenocrm.entity.Customer;
import com.xeno.xenocrm.repository.CustomerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ActivityService activityService;



    public Customer saveCustomer(Customer customer) {

        applyAI(customer);

        Customer savedCustomer =
                customerRepository.save(customer);

        activityService.saveActivity(
                "Customer "
                        + savedCustomer.getName()
                        + " added | Segment : "
                        + savedCustomer.getSegment()
        );

        return savedCustomer;
    }



    public List<Customer> getAllCustomers() {

        return customerRepository.findAll();

    }



    public void deleteCustomer(Long id) {

        Customer customer =
                customerRepository.findById(id)
                        .orElse(null);

        if (customer != null) {

            activityService.saveActivity(
                    "Customer "
                            + customer.getName()
                            + " deleted"
            );

            customerRepository.deleteById(id);

        }

    }



    public Customer updateCustomer(
            Long id,
            Customer customerDetails) {

        Customer customer =
                customerRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Customer not found"
                                )
                        );


        customer.setName(
                customerDetails.getName());

        customer.setEmail(
                customerDetails.getEmail());

        customer.setPhone(
                customerDetails.getPhone());

        customer.setCompany(
                customerDetails.getCompany());

        customer.setStatus(
                customerDetails.getStatus());


        customer.setTotalRevenue(
                customerDetails.getTotalRevenue());

        customer.setTotalOrders(
                customerDetails.getTotalOrders());

        customer.setCustomerTier(
                customerDetails.getCustomerTier());

        customer.setEngagementScore(
                customerDetails.getEngagementScore());

        customer.setLastPurchaseDate(
                customerDetails.getLastPurchaseDate());


        applyAI(customer);


        Customer updatedCustomer =
                customerRepository.save(customer);


        activityService.saveActivity(
                "Customer "
                        + updatedCustomer.getName()
                        + " updated"
        );

        return updatedCustomer;

    }



    public Customer getCustomerByEmail(
            String email) {

        return customerRepository.findByEmail(email);

    }



    // ==========================
    // AI LOGIC
    // ==========================

    private void applyAI(Customer customer) {

        String segment;

        int churnRisk;

        String aiInsight;

        String revenuePotential;


        if (

                customer.getTotalRevenue() != null

                        &&

                        customer.getTotalRevenue() > 100000

        ) {

            segment = "VIP CUSTOMER ⭐";

            churnRisk = 5;

            revenuePotential = "VERY HIGH";

            customer.setCustomerTier("PLATINUM");

            aiInsight =
                    "Top customer with very high revenue and low churn risk.";

        }

        else if (

                customer.getStatus() != null

                        &&

                        customer.getStatus()
                                .equalsIgnoreCase("INACTIVE")

        ) {

            segment = "AT RISK ⚠";

            churnRisk = 85;

            revenuePotential = "LOW";

            customer.setCustomerTier("SILVER");

            aiInsight =
                    "Customer inactive. Immediate retention campaign recommended.";

        }

        else {

            segment = "REGULAR CUSTOMER";

            churnRisk = 30;

            revenuePotential = "MEDIUM";

            customer.setCustomerTier("GOLD");

            aiInsight =
                    "Healthy customer with moderate engagement.";

        }



        customer.setSegment(segment);

        customer.setChurnRisk(churnRisk);

        customer.setAiInsight(aiInsight);

        customer.setRevenuePotential(revenuePotential);

    }

}