package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
public class IndexController {

	@Autowired
	UserRepository userRepository;

	@GetMapping("/")
	public ModelAndView init(ModelAndView mv) {

		mv.setViewName("index");
		mv.addObject("msg", "Hello World");

		var form = new AccountForm();
		mv.addObject("accountForm", form);

		var accounts = userRepository.findAll();
		mv.addObject("accounts", accounts);

		return mv;
	}

	@PostMapping("/add")
	public ModelAndView add(ModelAndView mv, @ModelAttribute AccountForm form) {

		var entity = new UserEntity();
		entity.setUserName(form.getUserName());
		entity.setPassword(form.getPassword());

		userRepository.save(entity);

		return init(mv);
	}

	@PostMapping("/delete")
	public ModelAndView delete(ModelAndView mv, @RequestParam("id")Integer id) {

		userRepository.deleteById(id);

		return init(mv);
	}


	@PostMapping("/addAjax")
	@ResponseBody
	public String addAjax(@RequestBody String json) {

		var form = JsonUtil.parse(AccountForm.class, json);

		var entity = new UserEntity();
		entity.setUserName(form.getUserName());
		entity.setPassword(form.getPassword());

		userRepository.save(entity);

		return json;
	}

	@PostMapping("/deleteAjax")
	@ResponseBody
	public String deleteAjax(@RequestBody String json) {

        ObjectMapper mapper = new ObjectMapper();
        try{
             String test = mapper.writeValueAsString(json);
             System.out.println(test);
             //return json;
        }catch(JsonProcessingException e){
             return null;
        }

		var id = JsonUtil.parse(String[].class, json);
//
//		var entity = new UserEntity();
//		entity.setUserName(form.getUserName());
//		entity.setPassword(form.getPassword());
//
//		userRepository.save(entity);

		return json;
	}

	@GetMapping("/loadAjax")
	@ResponseBody
	public String loadAjax() {

	    var accounts = userRepository.findAll();

	    String json = JsonUtil.convert(accounts);
		System.out.println(json);

	    return json;
	}

	@GetMapping("/test")
	@ResponseBody
	public String ajaxTest() {

	    var accounts = userRepository.findAll();

	    String json = JsonUtil.convert(accounts);
		System.out.println(json);

	    return json;
	}
}
