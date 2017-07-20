package work.notech.video.server.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletResponse;

import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import work.notech.video.server.base.FileType;
import work.notech.video.server.base.MultipartFileSender;
import work.notech.video.server.model.FileInfo;

@RestController
public class VideoController {

    private static final String rootPath = System.getProperty("user.dir");

    @GetMapping({"list/**"})
    public List<FileInfo> list(HttpServletRequest request) {
        String path = request.getServletPath().substring(5);
        if (StringUtils.isEmpty(path)) {
            path = rootPath;
        } else {
            path = rootPath + path;
        }

        if (!path.endsWith("/")) {
            path += "/";
        }
        System.out.println(path);

        List<FileInfo> list = new ArrayList<>();
        File root = new File(path);
        for (String item : root.list()) {
            String subPath = path + item;
            File file = new File(subPath);

            FileInfo info = new FileInfo();
            info.setName(file.getName());
            info.setType(file.isDirectory() ? FileType.Dir : FileType.File);
            info.setPath(subPath.substring(rootPath.length() + 1));
            list.add(info);
        }

        return list;
    }

    @GetMapping("/video/**")
    public void getVideo(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String path = request.getServletPath().substring(6);
        File file = new File(rootPath + path);

        MultipartFileSender.fromFile(file)
            .with(request)
            .with(response)
            .serveResource();
    }
}