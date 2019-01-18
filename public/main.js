/*
	Author: Arnab Biswas
	Date: 2 Jan 2019
	email: arnabdbst@yahoo.com
*/

$(document).ready(function(){
	$('#input').focus();
	let sem = null;
	let current = 'Grade';
	let arr = ['Grade', 'Internal', 'Semester', 'Total'];
	$('ul.drop-down li:nth-child(2)').on('click', function(){
		sem = $(this).text();
		$(this).parent().toggleClass('closed');
		$('ul.drop-down li:nth-child(1) > a')[0].innerText = sem;
	})
	$('#btn').on('click',function(){
		req(sem);
	});
	$('#input').on('keypress', function(e){
		if(e.which === 13){
			req(sem);
		}
	});

	$(function() {
  		$(".nav-button").click(function() {
    	$(this).parent().parent().toggleClass("closed");
  		});
	});

function back(){	
	$('html').css('position', 'fixed');
	$('.animate').css('float', 'left');
	$('.animate').toggleClass('animateSlide');
	$('#result').css('display','none');
	setTimeout(function(){
		$('#container').toggleClass('show');
		$('#container').toggleClass('hidden');
		$('#container').css({'width':'100vw','height':'100vh'});
		$('.div2').css('display','block');
		if(window.screen.width > 600){
			$('.div1').css('display','block');	
		}
		$('.animate').toggleClass('animateSlide');
		$('#result').empty();
	}, 600)
}


function req(sem){	
	sem = (sem != null) ? sem : 'Nov-Dec (2018)';
	let regnum =$('#input').val();
	axios({
	  method: 'post',
	  url: '/',
	  params: {
	  		sem,
	  		regnum
		 }
	})
	.then(function(res){
		if(!res.data.result){
			window.location.reload();
			alert("Registration Number Not Found!")
			$('#input').val('');
		}
		addRows(res.data);
		$('#result').css({'margin-top':'0', 'display':'block'});
		$('#input').val('');
	})
	.catch(function(err){
		console.log(err);
	})
}

function addRows(data){
	$('html').css('position','static')
	let result = data.result;
	let name = data.name;
	let gpa = data.gpa;
	if(gpa["3"] == "0")
		gpa = gpa.slice(0,3);
	let regNum = data.regNum
	let count = 1;	
	if(name){
		let nameStr = '';
		let nameArr = name.split(' ');
		if(nameArr[1] == undefined){
			nameStr = nameArr[0];						
		} else {
			nameStr = nameArr[0] + " " + nameArr[1]
		}
		regNum = nameStr;
		
	}else{
		regNum = regNum;
	}

	$('.animate').css('float', 'right');
	$('.animate').toggleClass('animateSlide');
	$('#container').toggleClass('show');
	$('#container').toggleClass('hidden');
	$('#container').css({'width':'0vw','height':'0vh'});
	$('.div1').css('display','none');
	$('.div2').css('display','none');
	
	setTimeout(function(){
	$('#result').toggleClass('hidden');
	$('#result').toggleClass('show');

	$('#result').empty();
	$('#result').append(`<h1 id='resultHeader'><i class="fa fa-chevron-left" aria-hidden="true"></i>${regNum}</h1>
							<div id='gpa'>GPA : ${gpa}</div>
							<div id='table'>
								<div class="Subject">
									<ul id='subject'>
										<li class='head'>Subject</li>
									</ul>
								</div>
								<div class="Internal">
									<ul id='internal'>
										<ul class='head'>Internal</ul>
									</ul>
								</div>
								<div class="Semester">
									<ul id='semester'>
										<ul class='head'>Semester</ul>
									</ul>
								</div>
								<div class="Total">
									<ul id='total'>
										<ul class='head'>Total</ul>
									</ul>
								</div>
								<div class="Grade">
									<ul id='grade'>
										<ul class='head'>Grade</ul>
									</ul>
								</div>
								
							<div>`);

	for(sub in result){
		count++;
		$('#subject').append(`<li class='subject'>${sub.slice(7)}</li>`); 
		$('#internal').append(`<li class='internal'>${result[sub][0]}</li>`); 
		$('#semester').append(`<li class='semester'>${result[sub][1]}</li>`); 
		$('#total').append(`<li class='total'>${result[sub][2]}</li>`); 
		$('#grade').append(`<li class='grade'>${result[sub][3]}</li>`); 
	}
	$('#table').css('height',boxHeight(count,41));
	
	$('#gpa').css('background', function(){
		let gpas = Number(gpa);
		if(gpas<=3 && gpas>=0) {
			return '#c0392b';
		} else if(gpas<=6 && gpas>3) {
			return '#d35400';
		} else if(gpas<=8 && gpas>6) {
			return '#f1c40f';
		} else if(gpas<=10 && gpas>8) {
			return  '#eeeeee';
		} else {
			return 'black';
		}
	});
	let backGround = $('#gpa').css('background-color');
	if(backGround =='rgb(238, 238, 238)'){
		$('#gpa').css('color','black');
	}
	$('.animate').toggleClass('animateSlide');
	$('.fa-chevron-left').on('click',back);

	let $window = $(window);

    function checkWidth() {
        let windowsize = $window.width();
        let list = arr.filter(head => head !== current);       
        if (windowsize < 1100) {
            menu();
        } else {
        	  for(let i = 0; i <= 3; i++ ){
            		$(`div.${arr[i]}`).css('display','block');
            }
        }

        if(windowsize < 736){
        	$(`#table`).css({        
        		'flex-wrap':'nowrap'
        	});

        	let heights = [];        	
        	let currentlist = $(`ul#${current.toLowerCase()} > li`);
        	let subjectList = $(`ul#subject > li`);
        	subjectList.each(function(){
					heights.push($(this).css('height'));														
			});					
			$('#table').css('height','70vh')
			$(`ul#${current.toLowerCase()} > ul.head`).css(`z-index`,`10`);
        	let c = 1;
        	currentlist.each(function(){
        		$(this).css(`height`,`${heights[c]}`)       
        		$(this).css(`padding`,`0`);
        		$(this).css(`line-height`,`${heights[c]}`)        	
        		c++;
        	})
        }

        function menu(){
        	for(let i = 0; i <= 3; i++ ){
            	if(arr[i] !== current){       
            		$(`div.${arr[i]}`).css('display','none');
            	} else {
            		$(`div.${arr[i]}`).css('display','block');           
            		let currentHead = $(`ul#${arr[i].toLowerCase()} > ul.head`);
            		currentHead.css('cursor','pointer');  
            		if(typeof jQuery._data( currentHead[0], "events" ) == 'object'){            			
            			currentHead.off('click');
            		}        		          	
            		currentHead.on('click', function(){            			
            			let head = $(this);
            			head.css('list-style', 'none')
            			
            			if(head.children().length == 0){
            				for(let i = 0; i <= 2; i++ ){
	            				li = head.append(`<li>
						            					${list[i]}
						            				</li>`);	            				
	            				li.children().css('border-radius','10px');	            				
	            				li.children().addClass('head');
	            				li.children().css('font-size','3.2vh');
	            				li.children().css('margin','0 auto');	            				
	            				li.children().css('display','none');	            				
            				}
            				li.children().slideDown();
            				li.children().on('click',function(){
            					current = $(this)[0].textContent.trim();            					
            					currentHead.off('click');
            					removeLi(head);
            					checkWidth();
            				});

            			}else{

            					removeLi(head);
            			}				
            		});            		        
            	}
            }
        }
    }
    checkWidth();
    $(window).resize(checkWidth);

	}, 600);
}

})

function removeLi(head) {
	head.children().slideUp(260);
	setTimeout(function(){
		head.children().remove();
	},260)
}

function boxHeight(count,pix){
		return `${count * pix}px`;
}
