package jn.sias.controller;

import jn.sias.config.LayerGroupsConfig;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/test/layers")
public class LayerController {

    private final LayerGroupsConfig layerGroupsConfig;

    @PostMapping("/info")
    ResponseEntity<LayerGroupsConfig> getLayersInfo() throws Exception {

        return new ResponseEntity<>(layerGroupsConfig, HttpStatus.OK);
    }
}
