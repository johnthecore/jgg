var jgg = (function() {
    var jgg = function() {}
    jgg.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }
    jgg.extend = function(destination, source) {
        for (var property in source) {
            if (source[property] && source[property].constructor && source[property].constructor === Object) {
                destination[property] = destination[property] || {};
                arguments.callee(destination[property], source[property]);
            } else {
                destination[property] = source[property];
            }
        }
        return destination;
    }
    jgg.component = (function() {
        var component = function(options) {
            var element;
            this.create = function() {
                element = document.createElement(options.html.tag);
                jgg.extend(element, options.html);
                for (var eventName in options.html.event) {
                    element.addEventListener(eventName, options.html.event[eventName]);
                }
                document.body.appendChild(element);
                return this;
            }
            this.getElement = function() {
                return element;
            }
        }
        return component;
    })();
    var env = (function() {
        var env = function() {}
        env.Builder = (function() {
            var components;
            var builder = function() {
                components = [];
                this.addComponent = function(componentOptions) {
                    components.push(new jgg.component(componentOptions));
                    return this;
                }
                this.build = function() {
                    for (var k in components) {
                        var component = components[k].create();
                        // console.log(component.getElement());
                    }
                }
            }
            return builder;
        })();
        return env;
    })();
    return {
        env: env
    };
})();