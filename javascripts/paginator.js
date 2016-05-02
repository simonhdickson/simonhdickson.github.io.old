(function($) {
    
$.fn.paginate = function(options) {
    
    var Paginator = function(self, options) {
        
        var defaults = {
            itemsPerPage: 10,
            selector: {
                next: self.selector+'-next',
                previous: self.selector+'-previous',
                pagination: self.selector+'-pagination',
                pagenumber: self.selector+'-page-number'
            },
            cssClassName: {
                disabled: 'disabled'
            }
        };
        var options = $.extend(defaults, options);
        var currentPage = 1;
        var numberOfPages = 1;
        var numberOfItems = 0;
        
        var init = function() {
            numberOfItems = self.children().size();
            numberOfPages = Math.ceil(numberOfItems / options.itemsPerPage);
            
            $(options.selector.previous).click(function(e){
                e.preventDefault();
                previous();
            });
            $(options.selector.next).click(function(e){
                e.preventDefault();
                next();
            });
            
            show(1);
            
            self.show();
        }
        
        var show = function(page) {
            currentPage = page;
            startPage = (currentPage - 1) * options.itemsPerPage;
            endPage = startPage + options.itemsPerPage;
            self.children().hide().slice(startPage, endPage).show();

            var disabled = options.cssClassName.disabled;
            $(options.selector.pagination + ' a').removeClass(disabled);
            if (currentPage <= 1) {
                $(options.selector.previous).addClass(disabled);
            } else if (currentPage == numberOfPages) {
                $(options.selector.next).addClass(disabled);
            }
            $(options.selector.pagenumber).html('Page: ' + currentPage + ' of ' + numberOfPages);
        };
        
        var next = function() {
            if (currentPage < numberOfPages){
                show(currentPage + 1);
            }
        };
        
        var previous = function() {
            if (currentPage > 1) {
                show(currentPage - 1);
            }
        };
        
        init();
        return this;
    }
    
    return new Paginator(this, options);
};
})(jQuery);