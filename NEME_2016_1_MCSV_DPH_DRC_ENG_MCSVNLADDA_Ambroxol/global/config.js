(function () {
    //var player = "MI"; 
    var player = "Browser";
    window.drcom = window.drcom || {};
    drcom = {
        readyTmp: [],
        ready: function() {
            var args = Array.prototype.slice.call(arguments),
                len = args.length,
                required, func;
            
            switch (len) {
                case 1:
                    func = args[0];
                    required = [];
                    break;
                default:
                    required = args[0];
                    func = args[1];
                    break;
            }

            if (this.readyComplete) {
                require(required, func);
            } else {
                this.readyTmp.push({
                    func: func,
                    required: required
                });
            }
        },

        readyExecute: function() {
            this.readyComplete = true;
            var requiredList = [];
            for (var i = 0; i < this.readyTmp.length; i++) {
                requiredList = requiredList.concat(this.readyTmp[i].required);
            }
            
            require(requiredList, function() {
                var args = arguments;
                for (var i = 0; i < drcom.readyTmp.length; i++) {
                    drcom.readyTmp[i].func.apply(window, arguments);
                }
            });
        }
    };

    drcom.config = {
        presentationName: "Mucosolvan",
        visibleMeasure: false,
        debug: false,
        debugUrl: "http://192.168.1.15:8080",
        
        //player: player,//Veeva,Browser,MI,HarVie
        disableJs: false,
        baseUrl: "global/js",
        root: "../../",
        useSystemSwipe: false,
        stopAnimationBeforeGotoSlide: true,
        storageType: "sessionStorage",
        swipeInFourDirections: false,
	
        externalScripts: ['../../javascript/main'],
		menu: {
            isShow: false,
            hasImage: true,
            useDoubleTap: true,
			tapRevert: true,
            thumbPath: 'global/images/thumb_navi',
            submenu: {
                isShow: true,
                hasImage: true,
                thumbPath: 'global/images/thumb_navi',
				layout: 'vertical'
            }
        },
		preloads: [],
		
        sitemap: {
            isShow: false,
            isMultiFlows: false
        },

        breadcrumb: {
            isShow: false,
            list_icon: { path: "", color: "#fdae35" },
            active_icon: { path: "global/images/breadcrumb/breadcrumb_active_icon.png", color: "#fff" },
            next_icon: { path: "", color: "#bd461e" },
            prev_icon: { path: "", color: "#bd461e" },
            down_icon: { path: "", color: "#bd461e" },
            container: { path: "", color: "#ea6f1d" }
        },
        marker: {
            isShow: false,
            colors: ['#006dd6', '#96c93c', '#ea2920', '#f7ec5e', '#231f20', '#fff']
        },

        toolbar: {
            isShow: false,
            PI: [],
            approvedCode: ""
        }
    };
    
    drcom.menuItem = 13;
})();