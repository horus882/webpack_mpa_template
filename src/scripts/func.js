const func = {

    echo: function(msg) {
        console.log(msg);
    },

	getAppEnv: function() {
		return process.env.APP_ENV;
	},

	getParameterByName: function(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
		return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	},

	removeURLParameter: function(url, parameter) {
		var urlparts = url.split('?');
		if (urlparts.length >= 2) {
			var prefix = encodeURIComponent(parameter) + '=';
			var pars = urlparts[1].split(/[&;]/g);
			for (var i = pars.length; i-- > 0;) {
				if (pars[i].lastIndexOf(prefix, 0) !== -1) {
					pars.splice(i, 1);
				}
			}
			url = urlparts[0] + '?' + pars.join('&');
			return url;
		} else {
			return url;
		}
	},

	preload: function(arrayOfImages) {
		$(arrayOfImages).each(function() {
			$('<img/>')[0].src = this;
		});
	},

	shuffle: function(array) {

		var j, x, i;
		for (i = array.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = array[i];
			array[i] = array[j];
			array[j] = x;
		}
		return array;

	},

	getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	setCookie: function(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = 'expires=' + d.toUTCString();
		document.cookie = cname + '=' + cvalue + '; ' + expires;
	},

	getCookie: function(cname) {
		var name = cname + '=';
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1);
			if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
		}
		return '';
	},

    sendEvent: function(category, action, label, href) {

        if (typeof(gtag) != 'undefined') {

            gtag('event', action, {
                'event_category' : category,
                'event_label' : label
            });

            console.log('event: ' + category + ', ' + action + ', ' + label);

			if (href) {
				setTimeout(function() { location.href = href }, 200)
			}
            
        }

    },

    sendPageView: function(page, title) {

        if (typeof(gtag) != 'undefined') {

            gtag('config', '', {
                // 'page_title' : title,
                'page_path': page
            });

            console.log('pageview: ' + page/* + ', ' + title*/);

        }

    },

	formatFloat: function(num, pos) {
		let size = Math.pow(10, pos);
		return Math.round(num * size) / size;
	},

	scaleContainer: function(matches, ele) {
		if (matches) {
			ele.css('transform', 'scale(' + this.formatFloat((window.innerHeight / 1920), 4) + ')');
		} else {
			ele.css('transform', 'none');
		}
	},

	lockContainer: function() {

		$('#container').css({ 'position': 'fixed', 'top': ($('html, body').scrollTop() - $('#header').height()) * -1 });
		$('html, body').scrollTop(0);

	},

	unlockContainer: function() {

		var scrollY = parseInt($('#container').css('top').replace('px', '')) * -1 + $('#header').height();
		$('#container').css({ 'position': 'relative', 'top': 0 });
		$('html, body').scrollTop(scrollY);

	},

	openPopUp: function(target) {

		this.lockContainer();
		$('#pop, ' + target).show();
		if (
			target === '#pop-discount' || 
			target === '#pop-rule'
		) {
			$('.pop-container').addClass('align-items-start');
		}

	},

	closePopUp: function() {
		
		this.unlockContainer();
		$('#pop, .pop-main:visible').hide();
		$('.pop-container').attr('class', 'pop-container');

	},

	checkInputFormat: function(prop, value) {

		var format = {
			email: 	/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
			mobile: /^[09]{2}[0-9]{8}$/,
			tel: 	/^[0-9]{7,10}$/,
			serial: /^[A-Za-z0-9]{10}$/
		}

		return format[prop].test(value);

	},

	addMultipleEventListener: function(element, events, handler) {
		events.forEach(e => element.addEventListener(e, handler))
	},

    addScript(param) {

        let src = '';

        switch(param) {
            case 'animejs':
                src = 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.0/anime.min.js';
                break;
			default:
				src = param;
				break;
        }

        let script = document.createElement('script');
        script.setAttribute('src', src);
        document.head.appendChild(script);

    }

}

export default func;
