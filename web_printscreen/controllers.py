# -*- encoding: utf-8 -*-
##############################################################################
#
#    Copyright (c) 2013 ZestyBeanz Technologies Pvt. Ltd.
#    (http://wwww.zbeanztech.com)
#    contact@zbeanztech.com
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as published by
#    the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.
#
#    You should have received a copy of the GNU General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################

try:
    import json
except ImportError:
    import simplejson as json

import web.http as openerpweb
from web.controllers.main import ExcelExport
from web.controllers.main import Export

import time, os
from lxml  import etree
import trml2pdf
import locale
import openerp.tools as tools


class ExportPdf(Export):
    _cp_path = '/web/export/pdf'
    fmt = {
        'tag': 'pdf',
        'label': 'PDF',
        'error': None
    }
    
    def content_type(self):
        return 'application/pdf'
    
    def filename(self, base):
        return base + '.pdf'
    
    def from_data(self, uid, fields, rows, model):
        pageSize=[210.0,297.0]
        new_doc = etree.Element("report")
        config = etree.SubElement(new_doc, 'config')
        def _append_node(name, text):
            n = etree.SubElement(config, name)
            n.text = text
        _append_node('date', time.strftime(str(locale.nl_langinfo(locale.D_FMT).replace('%y', '%Y'))))
        _append_node('PageSize', '%.2fmm,%.2fmm' % tuple(pageSize))
        _append_node('PageWidth', '%.2f' % (pageSize[0] * 2.8346,))
        _append_node('PageHeight', '%.2f' %(pageSize[1] * 2.8346,))
        _append_node('PageFormat', 'a4')
        _append_node('header-date', time.strftime(str(locale.nl_langinfo(locale.D_FMT).replace('%y', '%Y'))))
        l = []
        t = 0
        temp = []
        tsum = []
        header = etree.SubElement(new_doc, 'header')
        for f in fields:
            field = etree.SubElement(header, 'field')
            field.text = tools.ustr(f)
        lines = etree.SubElement(new_doc, 'lines')
        for row_lines in rows:
            node_line = etree.SubElement(lines, 'row')
            for row in row_lines:
                col = etree.SubElement(node_line, 'col', para='yes', tree='no')
                col.text = tools.ustr(row)
        transform = etree.XSLT(
            etree.parse(os.path.join(tools.config['root_path'],
                                     'addons/base/report/custom_new.xsl')))
        rml = etree.tostring(transform(new_doc))
        self.obj = trml2pdf.parseNode(rml, title='Printscreen')
        return self.obj
        
class PdfExportView(ExportPdf):
    _cp_path = '/web/export/pdf_view'
    
    @openerpweb.httprequest
    def index(self, req, data, token):
        data = json.loads(data)
        model = data.get('model',[])
        columns_headers = data.get('headers',[])
        rows = data.get('rows',[])
        uid = data.get('uid', False)
        return req.make_response(self.from_data(uid, columns_headers, rows, model),
            headers=[('Content-Disposition', 'attachment; filename="%s"' % self.filename(model)),
                     ('Content-Type', self.content_type)],
            cookies={'fileToken': int(token)})
    
class ExcelExportView(ExcelExport):
    _cp_path = '/web/export/xls_view'

    @openerpweb.httprequest
    def index(self, req, data, token):
        data = json.loads(data)
        model = data.get('model',[])
        columns_headers = data.get('headers',[])
        rows = data.get('rows',[])

        return req.make_response(self.from_data(columns_headers, rows),
            headers=[('Content-Disposition', 'attachment; filename="%s"' % self.filename(model)),
                     ('Content-Type', self.content_type)],
            cookies={'fileToken': int(token)})

