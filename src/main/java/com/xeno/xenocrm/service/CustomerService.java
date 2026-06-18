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

        Customer savedCustomer =
                customerRepository.save(customer);

        activityService.saveActivity(
                "Customer "
                        + savedCustomer.getName()
                        + " added"
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
                customerDetails.getName()
        );

        customer.setEmail(
                customerDetails.getEmail()
        );

        customer.setPhone(
                customerDetails.getPhone()
        );

        customer.setCompany(
                customerDetails.getCompany()
        );

        customer.setStatus(
                customerDetails.getStatus()
        );


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

}