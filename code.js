
var btn = document.createElement("SPAN");
btn.id="ztadad";
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



document.addEventListener("dblclick", function (e) {
	var word = (document.selection && document.selection.createRange().text) ||
		(window.getSelection && window.getSelection().toString());
	if (!word) return;
	axios.get('https://www.lazylearn.com/dictionary.php?word=' + encodeURIComponent(word)).then(function(res){
		if (!res.data) return;
		if (res.data === '') return;
		btn.setAttribute("title", res.data);
		btn.style.left = e.pageX + "px";
		btn.style.top = e.pageY + "px";
		tippy('#ztadad');
		btn._tippy.show();
	});
});