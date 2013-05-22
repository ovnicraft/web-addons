openerp.web_printscreen = function(instance, m) {
var _t = instance.web._t,
    QWeb = instance.web.qweb;

    instance.web.Sidebar.include({
        redraw: function() {
            var self = this;
            this._super.apply(this, arguments);
            self.$el.find('.oe_sidebar').append(QWeb.render('AddPrintScreenMain', {widget: self}))
            self.$el.find('.oe_sidebar_printscreen_pdf').on('click', self.on_sidebar_export_view_pdf);
            self.$el.find('.oe_sidebar_printscreen_xls').on('click', self.on_sidebar_export_view);
        },

    on_sidebar_export_view: function() {
        var self = this,
        view = this.getParent(),
        columns = view.visible_columns;
        export_columns_keys = [];
        export_columns_names = [];
        $.each(columns,function(){
            if(this.tag=='field'){
                export_columns_keys.push(this.id);
                export_columns_names.push(this.string);
            }
        });
        rows = view.$el.find('.oe_list_content > tbody > tr');
        export_rows = [];
        $.each(rows,function(){
            $row = $(this);
            if($row.attr('data-id')){
                export_row = [];
                checked = $row.find('th input[type=checkbox]').attr("checked");
                if (checked === "checked"){
	                $.each(export_columns_keys,function(){
	                    cell = $row.find('td[data-field="'+this+'"]').get(0);
	                    text = cell.text || cell.textContent || cell.innerHTML || "";
	                    export_row.push(text.trim());
	                });
	                export_rows.push(export_row);
                };
            }
        });
        $.blockUI();
        view.session.get_file({
            url: '/web/export/xls_view',
            data: {data: JSON.stringify({
                model : view.model,
                headers : export_columns_names,
                rows : export_rows,
            })},
            complete: $.unblockUI
        });
    },
    
    on_sidebar_export_view_pdf: function() {
        var self = this,
        view = this.getParent(),
        columns = view.visible_columns;
        export_columns_keys = [];
        export_columns_names = [];
        $.each(columns,function(){
            if(this.tag=='field'){
                // non-fields like `_group` or buttons
                export_columns_keys.push(this.id);
                export_columns_names.push(this.string);
            }
        });
        rows = view.$el.find('.oe_list_content > tbody > tr');
        export_rows = [];
        $.each(rows,function(){
            $row = $(this);
            // find only rows with data
            if($row.attr('data-id')){
                checked = $row.find('th input[type=checkbox]').attr("checked");
                if (checked === "checked"){
	                export_row = [];
	                $.each(export_columns_keys,function(){
	                    cell = $row.find('td[data-field="'+this+'"]').get(0);
	                    text = cell.text || cell.textContent || cell.innerHTML || "";
	                    export_row.push(text.trim());
	                });
	                export_rows.push(export_row);
                }
            }
        });
        $.blockUI();
        view.session.get_file({
            url: '/web/export/pdf_view',
            data: {data: JSON.stringify({
                uid: this.session.uid,
                model : view.model,
                headers : export_columns_names,
                rows : export_rows,
            })},
            complete: $.unblockUI
        });
    },

});};