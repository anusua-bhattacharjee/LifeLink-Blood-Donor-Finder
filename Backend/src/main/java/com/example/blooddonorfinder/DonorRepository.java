package com.example.blooddonorfinder;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DonorRepository extends JpaRepository<Donor, Long> {

    List<Donor> findByBloodGroupIgnoreCaseAndCityContainingIgnoreCase(
            String bloodGroup, String city);

    List<Donor> findByBloodGroupIgnoreCase(String bloodGroup);

    List<Donor> findByCityContainingIgnoreCase(String city);
}