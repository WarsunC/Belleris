(function(window, document){

	// 公共方法定义
	const methods = {
        appendChild(parents, ...children) {
            children.forEach(el => {
                parents.appendChild(el);
            });
        },
        $(selector, root = document) {
            return root.querySelector(selector);
        },
        $$(selector, root = document) {
            return root.querySelectorAll(selector);
        }
    }

    let MobilePage = function() {
    	this._init();
    	this._getMessage();
    	this._createImgItem();
    	this._bind();
    }

    // 初始化：标签获取，变量初始化
    MobilePage.prototype._init = function() {

    	this.productData = [];
    	this.scenesData = [];
    	this.currentShowData = []; //当前展示在页面的数据
    	this.chooseShowNumber = 2; //默认每行展示2个元素

    	this.content = methods.$('.content');
    	this.scenesButton = methods.$('.content_choose1 span:nth-of-type(1)', this.content);
    	this.productButton = methods.$('.content_choose1 span:nth-of-type(2)', this.content);
    	this.chooseOneShow = methods.$('.content_choose-line-show-one', this.content);
    	this.chooseTwoShow = methods.$('.content_choose-line-show-two', this.content);
    	this.contentMatch = methods.$('.content_match', this.content);
    	this.itemShowArea = methods.$('.content_list', this.content);
    	this.sortWindow = methods.$('.sort-window');
    	this.shade = methods.$('.shade');
    	this.shadeOption = methods.$$(".sort-window_option_item",this.sortWindow);
    	this.sortClose = methods.$(".sort-window_close", this.sortWindow);
    	this.contentMatchSpan = methods.$("span", this.contentMatch);

    }


    MobilePage.prototype._getMessage = function() {
    	// 从data中获取数据
    	this.productData = productData;
    	this.scenesData = scenesData;
    	this.currentShowData = scenesData;
    }

    MobilePage.prototype._createImgItem = function() {
    	let itemsContent = [];
    	let className = "";
    	switch (this.chooseShowNumber) {
    		case 1:
    			className = "content_list_showone";
    			break;
    		case 2:
    			className = "content_list-showtwo";
    			break;
    	}
    	this.currentShowData.forEach((item, index) => itemsContent.push(`<li class=${className}><img src=${item.picUrl} alt=""><div class="content_list_title">${item.title}</div><div class="content_list_price"><span class="content_list_price_new">${item.newPrice} </span><span class="content_list_price_old">${item.oldPrice}</span></div></li>`))
    	itemsContent = itemsContent.join('');
    	this.itemShowArea.innerHTML = itemsContent;
    }

    // 给元素绑定事件
    MobilePage.prototype._bind = function() {
    	this.scenesButton.addEventListener("touchend", () => {this._scenesEvent(this)});
    	this.productButton.addEventListener("touchend", () => {this._productEvent(this)});
    	this.chooseOneShow.addEventListener("touchend", () => {this._showOneEvent(this)});
    	this.chooseTwoShow.addEventListener("touchend", () => {this._showTwoEvent(this)});
    	this.contentMatch.addEventListener("touchend", () => {this._alertSortWindow(this)});
    	this.shadeOption.forEach(item => {item.addEventListener("touchend", (e) => {
    		this.contentMatchSpan.innerText = e.target.innerText;
    		this._closeShade(this);
    		this._closeSortWindow(this);
    	})});
    	this.sortWindow.addEventListener("touchend", () => {
    		this._closeShade(this);
    		this._closeSortWindow(this);
    	})
    	this.shade.addEventListener("touchend", () => {
    		this._closeShade(this);
    		this._closeSortWindow(this);
    	})
    }


    MobilePage.prototype._scenesEvent = function(This) {
    	if (This.currentShowData === This.scenesData){
    		return;
    	}else {
    		This.currentShowData = This.scenesData;
    		This._createImgItem(This.chooseShowNumber);
    		This._setScenesButtonBorder(This);
    	}
    }

    MobilePage.prototype._productEvent = function(This) {
    	if (This.currentShowData === This.productData){
    		return;
    	}else {
    		This.currentShowData = This.productData;
    		This._createImgItem(This.chooseShowNumber);
    		This._setProductButtonBorder(This);
    	}
    }

    MobilePage.prototype._showOneEvent = function(This) {
    	if(This.chooseShowNumber === 1){
    		return;
    	}else {
    		This.chooseShowNumber = 1;
    		This.chooseOneShow.className = "content_choose-line-show-one content_choose-line-show-active";
    		methods.$$("div",This.chooseTwoShow).forEach((item) => {item.className = ""});
    		This._createImgItem();
    	}
    }

    MobilePage.prototype._showTwoEvent = function(This) {
    	if(This.chooseShowNumber === 2){
    		return;
    	}else {
    		This.chooseShowNumber = 2;
    		methods.$$("div",This.chooseTwoShow).forEach((item) => {item.className = "content_choose-line-show-active"});
    		This.chooseOneShow.className = "content_choose-line-show-one";
    		This._createImgItem();
    	}
    }

	MobilePage.prototype._setScenesButtonBorder = function(This) {
		This.scenesButton.className = "content_choose1-button-active";
		This.productButton.className = "";
	}

	MobilePage.prototype._setProductButtonBorder = function(This) {
		This.productButton.className = "content_choose1-button-active";
		This.scenesButton.className = "";
    	This._createImgItem();
	}

	MobilePage.prototype._alertSortWindow = function(This) {
		This._alertShade(This);
		This.sortWindow.className = "sort-window sort-window-active";
	}

	MobilePage.prototype._alertShade = function(This) {
		This.shade.className = "shade shade-active";
	}

	MobilePage.prototype._closeShade = function(This) {
		This.shade.className = "shade";
	}

	MobilePage.prototype._closeSortWindow = function(This) {
		This.sortWindow.className = "sort-window";
	}

	window.MobilePage = MobilePage;
})(window, document);
