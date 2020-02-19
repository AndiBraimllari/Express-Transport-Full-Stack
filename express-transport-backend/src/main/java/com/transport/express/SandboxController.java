package com.transport.express;

import com.transport.express.payment.mervice.StripeClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.concurrent.CompletableFuture;

@RestController
@ResponseBody
public class SandboxController { // TODO DELETE FOR PROD.

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    StripeClientService stripeClientService;

    @GetMapping("hm")
    public ResponseEntity<Object> getMethod() {
        System.out.println("in hm");
//        System.out.println(bCryptPasswordEncoder.encode(Math.random()*100+""));
        CompletableFuture.supplyAsync(() -> {
            try {
                Thread.sleep(4000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return 7;
        }).thenAccept(System.out::println);
        throw new ResponseStatusException(HttpStatus.GONE, "rsn");
//        return "2";
    }

    @PostMapping(path = "/postmeth")
    public ResponseEntity<?> getMap(@RequestBody Integer a) {
        System.out.println("hi");
        throw new ResponseStatusException(HttpStatus.CONFLICT);
    }

    @RequestMapping(value = "user")
    public Principal user(Principal principal) {
        return principal;
    }

    @RequestMapping(value = "login")
    public Integer login() {

        return 321;
    }
}
