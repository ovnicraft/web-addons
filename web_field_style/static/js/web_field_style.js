//  @@@ web_field_style custom JS @@@

openerp.web_field_style = function(openerp) {
    var _t = openerp.web._t,
    _lt = openerp.web._lt;    

    openerp.web.form.Field.include({

        default_style: 'width:100%;',

        init: function(view, node) {
            this._super(view, node);
            this.setup_styles(view, node);
        },

        setup_styles : function(view, node){
            // style
            // this is done for allowing ppl to set up different colors per field
            // without having to deal with css
            var style = this.default_style;
            if(node.attrs.bgcolor){
                style += 'background-color:' + node.attrs.bgcolor + ' !important;';
            }
            if(node.attrs.fgcolor){
                style += 'color:' + node.attrs.fgcolor + ' !important;';
            }
            this.input_style = style;
            // css class
            var cssclass = 'field_' + this.type;
            cssclass += _(['integer', 'float', 'float_time']).contains(this.type) ? ' oe-number' : '';
            if(node.attrs.cssclass){
                cssclass += ' ' + node.attrs.cssclass;
            }
            if(node.attrs.placeholder){
                this.input_placeholder = node.attrs.placeholder;
            }
            this.input_cssclass = cssclass;
        }
    });

    openerp.web.form.FieldMany2One.include({
        get_search_result: function(request, response) {
            var search_val = request.term;
            var self = this;

            if (this.abort_last) {
                this.abort_last();
                delete this.abort_last;
            }
            var dataset = new openerp.web.DataSetStatic(this, this.field.relation, self.build_context());

            dataset.name_search(search_val, self.build_domain(), 'ilike',
                                this.limit + 1, function(data) {
                                    self.last_search = data;
                                    // possible selections for the m2o
                                    var values = _.map(data, function(x) {
                                        return {
                                            label: _.str.escapeHTML(x[1]),
                                            value:x[1],
                                            name:x[1],
                                            id:x[0]
                                        };
                                    });

                                    // search more... if more results that max
                                    if (values.length > self.limit) {
                                        var open_search_popup = function(data) {
                                            self._change_int_value(null);
                                            self._search_create_popup("search", data);
                                        };
                                        values = values.slice(0, self.limit);
                                        values.push({label: _t("<em>   Search More...</em>"), action: function() {
                                            if (!search_val) {
                                                // search optimisation - in case user didn't enter any text we
                                                // do not need to prefilter records; for big datasets (ex: more
                                                // that 10.000 records) calling name_search() could be very very
                                                // expensive!
                                                open_search_popup();
                                                return;
                                            }
                                            dataset.name_search(search_val, self.build_domain(),
                                                                'ilike', false, open_search_popup);
                                        }});
                                    }
                                    // quick create
                                    var raw_result = _(data.result).map(function(x) {return x[1];});
                                    if (search_val.length > 0 && !_.include(raw_result, search_val) && (!self.value || search_val !== self.value[1])) {
                                        values.push({label: _.str.sprintf(_t('<em>   No existe "<strong>%s</strong>"</em>'),
                                                                          $('<span />').text(search_val).html()), action: false});
                                    }
                                    // create...
/*                                    values.push({label: _t("<em>   Create and Edit...</em>"), action: function() {
                                        self._change_int_value(null);
                                        self._search_create_popup("form", undefined, {"default_name": search_val});
                                    }});*/

                                    response(values);
                                });
            this.abort_last = dataset.abort_last;
        },        
    });

}
