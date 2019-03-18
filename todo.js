let doArray=[];
let doneArray=[];

//local strage
let doSavedata='';
let doneSavedata='';

//Create
const addTextToArray=(text,array)=>{
	let x = $(text).val();
	if(x!==''){
		array.unshift(x);//unshift <-> push
		$(text).val('');
		displayArrayAsList(doArray,'#doList','do',false);
		controlTitle();
		save();
	}
};

//Read
const displayArrayAsList=(array,list,listClass,checked)=>{//checkedはtrueもしくはfalseにする。
	$(list).empty();
	for(let x=0;x<array.length;x++){
		if(checked==true){
			$(list).append(`<li class="border check ${listClass}"><input type="checkbox" checked="checked">${array[x]}<i class="far fa-trash-alt ${listClass}"></i></li>`);//append <-> prepend
		}else if(checked==false){
			$(list).append(`<li class="border check ${listClass}"><input type="checkbox">${array[x]}<i class="far fa-trash-alt ${listClass}"></i></li>`);//append <-> prepend
		}
	}
	save();
	controlTitle();
};

const controlTitle=()=>{//小要素がある<ul>のタイトルを表示、小要素がない<ul>のタイトルを非表示
	if(doArray.length>0){
		$('#doTitle').show();
	}else if(doArray.length==0){
		$('#doTitle').hide();
	}
	if(doneArray.length>0){
		$('#doneTitle').show();
	}else if(doneArray.length==0){
		$('#doneTitle').hide();
	}
};

//Upload
const save=()=>{
	doSavedata=JSON.stringify(doArray);
	doneSavedata=JSON.stringify(doneArray);
	localStorage.setItem('doSavedata',doSavedata);
	localStorage.setItem('doneSavedata',doneSavedata);
};
const load=()=>{
	doSavedata=localStorage.getItem('doSavedata');
	doneSavedata=localStorage.getItem('doneSavedata');
	doArray=JSON.parse(doSavedata);
	doneArray=JSON.parse(doneSavedata);
	displayArrayAsList(doArray,'#doList','do',false);
	displayArrayAsList(doneArray,'#doneList','done',true);	
};

//Derete
const removeFromList=function(btn,list,array,that){
	if($(that).hasClass(list)){
		let i=$(btn,'.'+list).index(that);
		array.splice(i,1);
		displayArrayAsList(doArray,'#doList','do',false);
		displayArrayAsList(doneArray,'#doneList','done',true);
	}
};

//実行 jQuery
$(function(){
	load();
	$('.form').keypress((e)=>{
		if(e.which===13){
			addTextToArray('.form',doArray);
			//isChangeSwitchAtoB('.check','do','done',doArray,doneArray);
			return false;
		}
	});
	$(document).on('change','.check',function(){ //チェックボックスをクリックした時、DoとDoneをスイッチする。
		if($(this).hasClass('do')){
			let i=$('.check.do').index(this);
			let j=doArray.splice(i,1);
			j=j.join(); //処理:jに代入された値を文字列に変換。//補足:これを行わない場合.spliceの戻り値はオブジェクト型(≒配列)になっている
			doneArray.unshift(j);
			displayArrayAsList(doArray,'#doList','do',false);
			displayArrayAsList(doneArray,'#doneList','done',true);
		}else if($(this).hasClass('done')){
			let i=$('.check.done').index(this);
			let j=doneArray.splice(i,1);
			j=j.join();
			doArray.unshift(j);
			displayArrayAsList(doArray,'#doList','do',false);
			displayArrayAsList(doneArray,'#doneList','done',true);	
		}
	});
	$(document).on('click','.fa-trash-alt',function(){
		removeFromList('.fa-trash-alt','do',doArray,this);
		removeFromList('.fa-trash-alt','done',doneArray,this);
	});
});
