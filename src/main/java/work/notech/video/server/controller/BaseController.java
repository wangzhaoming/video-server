package work.notech.video.server.controller;

import java.io.IOException;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@ConfigurationProperties(prefix = "video.server")
public class BaseController {

    private String shutdownTime;

    @GetMapping("/")
    public String index() {
        return "forward:/index.html";
    }

    @GetMapping("shutdown")
    @ResponseBody
    public void shutdown() throws IOException {
        Runtime.getRuntime().exec("shutdown -s -t " + shutdownTime);
    }

    public void setShutdownTime(String shutdownTime) {
        this.shutdownTime = shutdownTime;
    }
}
