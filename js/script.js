window.onload=function(){
	$(".loading").hide().remove();
	document.getElementById("my-video").addEventListener('touchend',function(){
//	$('#videoStart').hide();
	document.getElementById("my-video").play();
},false);
}
var handleSelect = {
        cityHasChoose: false,
        init: function(option) {
            var self = this;
            var $userName = option['userName'],
                $sex=option['sex'],
                $tel = option['tel'],
                $province = option['province'],
                $prefectureCity = option['prefectureCity'],
                $dealerName = option['dealerName'],
                $time=option['time'],
                $submit = option['submit'],
                projectId = 51;
            var getProvince = 'http://t1.toptest.yidianzixun.com:8888/tool/getProvince',
                getPrefectureCity = 'http://t1.toptest.yidianzixun.com:8888/tool/getPrefectureviCity',
                getDealerName = 'http://t1.toptest.yidianzixun.com:8888/tool/getDealerName';

            if (!self.cityHasChoose) {
                $.ajax({
                    url: getProvince,
                    type: 'get',
                    data: {
                        projectId: projectId
                    },
                    dataType: 'json',
                    success: function(data) {
                        if (data['status'] == 1) {
                            var dataList = data['data'],
                                tpl = '<option value="">请选择省份</option>';
                            for (var i = 0; i < dataList.length; i++) {
                                tpl += '<option value="' + dataList[i]['province'] + '">' + dataList[i]['province'] + '</option>';
                            }
                            $province.empty().append(tpl);
                            self.cityHasChoose = true;
                        }
                    }
                });
            }
            $province.on('change', function() {
                var val = $(this).val();
                if (val === '') {
                    $prefectureCity.empty().append('<option value="">请选择省份</option>');
                    $dealerName.empty().append('<option value="">请选择经销商</option>');
                    return;
                }
                $.ajax({
                    url: getPrefectureCity,
                    type: 'get',
                    data: {
                        projectId: projectId,
                        province:val
                    },
                    dataType: 'json',
                    success: function(data) {
                        if (data['status'] == 1) {
                            var p_data_list = data['data'],
                                tpl = '<option value="">请选择城市</option>';
                            for (var i = 0; i < p_data_list.length; i++) {
                                tpl += '<option value="' + p_data_list[i]['prefectureCity'] + '">' + p_data_list[i]['prefectureCity'] + '</option>';
                            }
                            $dealerName.empty().append('<option value="">请选择经销商</option>');
                            $prefectureCity.empty().append(tpl);
                        }
                    }
                });
            });

            $prefectureCity.on('change', function() {
                var val = $(this).val();
                if (val === '') {
                    $dealerName.empty().append('<option value="">请选择经销商</option>');
                    return;
                }
                $.ajax({
                    url: getDealerName,
                    type: 'get',
                    data: {
                        projectId: projectId,
                        prefectureCity: val
                    },
                    dataType: 'json',
                    success: function(data) {
                        if (data['status'] == 1) {
                            var data_list = data['data'],
                                tpl = '<option value="">请选择经销商</option>';
                            for (var i = 0; i < data_list.length; i++) {
                                tpl += '<option value="' + data_list[i]['dealerName'] + '">' + data_list[i]['dealerName'] + '</option>';
                            }
                            $dealerName.empty().append(tpl);
                        }
                    }
                });
            });

            $submit.on('click', function(){
                var data = {
                    name: $.trim($userName.val()),
                    sex:$.trim($sex.attr('data-value')),
                    phone: $.trim($tel.val()),
                    province: $.trim($province.val()),
                    city: $.trim($prefectureCity.val()),
                    agency: $.trim($dealerName.val()),
                    time:$.trim($time.val())
                };
                console.log(data)
                if (!self.valedate(data)) {
                    return;
                }
                data.project = projectId;
                $.ajax({
                    url: 'http://t1.toptest.yidianzixun.com:8888/crm/ford',
                    type: 'post',
                    data: {
                        name: data.name,
                        gender:data.sex,
                        mobile: data.phone,
                        province: $province.find("option:selected").text(),
                        city: $prefectureCity.find("option:selected").text(),
                        dealerName: $dealerName.find("option:selected").text(),
                        buyCarTime:data.time,
                        memo10:'',
                        interested:'福特新蒙迪欧',
                        eventCode:'',
                        memo1:'',
                        memo2:'',
                        source:'',
                        project: 51
                    },
                    dataType: 'json',
                    success: function(data) {
                        if (data.status === 1) {
                            alert('提交成功！');
                        } else {
                            alert('提交失败，请稍后重试！')
                        }
                    }
                })
            });
        },
        valedate: function(data) {
            var valHandle = {
                name: function(val) {
                    if (val === ''||val===undefined||val===null){
                        return {
                            status: false,
                            msg: '请填入真实姓名'
                        }
                    }
                    var nameReg =/^[0-9]*$/;
                    if (nameReg.test(val)){
                    		return {
                            status: false,
                            msg: '请填入真实姓名'
                        }
                    }
                    return {status: true}
                },
                sex: function(val) {
                    if (val === '') {
                        return {
                            status: false,
                            msg: '性别不能为空'
                        }
                    }
                    return {status: true}
                },
                phone: function(val) {
                    var telReg = /^1[3|4|5|7|8]\d{9}$/;
                    if (!telReg.test(val)) {
                    		return {
                            status: false,
                            msg: '联系电话格式不正确'
                        }
                    }
                    if (val === '') {
                        return {
                            status: false,
                            msg: '手机号码不能为空'
                        }
                    }
                    return {status: true}
                },
                province: function(val) {
                    if (val === '') {
                        return {
                            status: false,
                            msg: '省份不能为空'
                        }
                    }
                    return {status: true}
                },
                city: function(val) {
                    if (val === '') {
                        return {
                            status: false,
                            msg: '城市不能为空'
                        }
                    }
                    return {status: true}
                },
                agency: function(val) {
                    if (val === '') {
                        return {
                            status: false,
                            msg: '经销商不能为空'
                        }
                    }
                    return {status: true}
                },
                time: function(val) {
                    if (val === '') {
                        return {
                            status: false,
                            msg: '购车时间不能为空'
                        }
                    }
                    return {status: true}
                }
            };

            for (var key in data) {
                var result = valHandle[key](data[key]);
                if (!result['status']) {
                    alert(result['msg']);
                    return false;
                }
            }
            return true;
        }
    };

$(function(){
	$("body").css('height',$(window).height());
	$("body").css('width',$(window).width());
	var mySwiper = new Swiper('#pages',{
		direction : 'vertical',
		speed:400
	}); 
	var page4Swiper = new Swiper('#page4Box',{
		direction : 'horizontal',
		pagination : '#fenye1',
		autoplay : 5000,
		speed:500,
		autoplayDisableOnInteraction : false
	});
	var page5Swiper = new Swiper('#page5Box',{
		direction : 'horizontal',
		pagination : '#fenye2',
		autoplay : 5000,
		speed:500,
		autoplayDisableOnInteraction : false
	});
	var $iBox=$('.i-box-wrap');
	$iBox.on('click',function(){
		var $this=$(this);
		if(!$this.hasClass('i-click')){
			$iBox.removeClass('i-click');
			$this.addClass('i-click');
		};
	})
	   var $flag = $('.gou img');
    $flag.on('click', function() {
        var $this = $(this);
        if ($this.attr('data-flag') == 'true') {
            $this.attr('data-flag', 'false');
            $this.attr('src', 'img/page2/gou2.png');
        } else {
            $this.attr('data-flag', 'true');
            $this.attr('src', 'img/page2/gou1.png');
        }
    });
    	handleSelect.init({
	    userName: $('#name'),
	    sex:$('.cb .i-click'),
	    tel: $('#phone'),
	    province: $('#province'),
	    prefectureCity: $('#city'),
	    dealerName: $('#jxs'),
	    time:$('#time'),
	    submit:$('.btn')
	});
})

