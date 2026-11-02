package com.example.blooddonorfinder;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/donors")
@CrossOrigin(origins = "*")
public class DonorController {

    private final DonorRepository donorRepository;

    public DonorController(DonorRepository donorRepository) {
        this.donorRepository = donorRepository;
    }

    // Register a new donor
    @PostMapping
    public Donor registerDonor(@Valid @RequestBody Donor donor) {
        return donorRepository.save(donor);
    }

    // Get all donors
    @GetMapping
    public List<Donor> getAllDonors() {
        return donorRepository.findAll();
    }

    // Search donors
    @GetMapping("/search")
    public List<Donor> searchDonors(
            @RequestParam(required = false) String bloodGroup,
            @RequestParam(required = false) String city) {

        if (bloodGroup != null && !bloodGroup.isBlank()
                && city != null && !city.isBlank()) {
            return donorRepository
                    .findByBloodGroupIgnoreCaseAndCityContainingIgnoreCase(bloodGroup, city);
        }

        if (bloodGroup != null && !bloodGroup.isBlank()) {
            return donorRepository.findByBloodGroupIgnoreCase(bloodGroup);
        }

        if (city != null && !city.isBlank()) {
            return donorRepository.findByCityContainingIgnoreCase(city);
        }

        return donorRepository.findAll();
    }

    // Delete a donor
    @DeleteMapping("/{id}")
    public void deleteDonor(@PathVariable Long id) {
        donorRepository.deleteById(id);
    }
}