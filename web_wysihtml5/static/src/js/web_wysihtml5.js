openerp.web_wysihtml5 = function (openerp){
    openerp.web.form.widgets.add('wysihtml5','openerp.web_wysihtml5.Wysihtml5');
    openerp.web_wysihtml5.Wysihtml5 = openerp.web.form.Field.extend({
        template: 'Wysihtml5',
        init: function(view, code){
            this._super(view, code);
            console.log('loading wysihmtl5...');
        },
        start: function(){
            this._super.apply(this, arguments);
            var $textarea = this.$element.find('textarea');
            $textarea.wysihtml5();
            $textarea.change(this.on_ui_change);
            this.resized = false;
        },
        set_value: function(value) {
            this._super.apply(this, arguments);
            var show_value = openerp.web.format_value(value, this, '');
            this.$element.find('textarea').val(show_value);
            if (!this.resized && this.view.options.resize_textareas) {
                this.do_resize(this.view.options.resize_textareas);
                this.resized = true;
            }
        },
    });
}
