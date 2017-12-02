$(document).on('click', '.mcfly-dictionary', function(e){
	e.preventDefault();
	e.stopPropagation();
	var $btn = $(this);
	var en = $(this).attr('data-en');
	var vi = $(this).attr('data-vi');
	axios.post('https://www.lazylearn.com/dictionary_add.php',{
		front: (en),
		back: (vi)
	}).then(function(res){
		if (!res.data || res.data === '') {
			console.log(res);
			return;
		}
		if (!res.data.ok) {
			console.log(res);
			alert(res);
			return;
		}	
		$btn.remove();
	});
});

var btn = document.createElement("SPAN");
btn.style.position= 'absolute';
btn.style.transform= 'translate(-50%, -50%)';
btn.setAttribute("title", '');
btn.setAttribute("data-tippy-distance", 25);
btn.setAttribute("data-tippy-arrow", true);
btn.setAttribute("data-tippy-theme", "translucent bordered");
btn.setAttribute("data-tippy-animation", "fade");
btn.setAttribute("data-tippy-arrowtype", "round");
btn.setAttribute("data-tippy-arrowtransform", "scale(0.7, 1)");
document.body.appendChild(btn);  


var div = document.createElement("DIV");
div.classList.add('noselect');
document.body.insertBefore(div, document.body.firstChild);
tippy(btn,{
	html: div
});

document.addEventListener("dblclick", function (e) {
	var word = (document.selection && document.selection.createRange().text) ||
		(window.getSelection && window.getSelection().toString());
	
	if (!word) return;
	word = word.trim();
	if (!word) return;
	
	axios.get('https://www.lazylearn.com/dictionary.php?word=' + encodeURIComponent(word)).then(function(res){
		if (!res.data) return;
		if (res.data === '') return;
		btn.setAttribute("title", res.data);
		btn.style.left = e.pageX + "px";
		btn.style.top = e.pageY + "px";
		div.innerHTML = tipHtml(res.data);
		btn._tippy.show();
	});
});

var tipHtml = function(json){
	return json.vi + " " + json.extra;
};

