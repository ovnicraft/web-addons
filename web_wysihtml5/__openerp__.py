# -*- coding: utf-8 -*-
##############################################################################
#    
#    Copyright (C) 2012-2013 Gnuthink Cia Ltda.
#    (<http://www.gnuthink.com>)
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as published
#    by the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################

{
    'name': 'WYSIHTML5 Editor',
    'version': '1.0',
    'category': 'web',
    'description': """
    WYSIWYG Editor for TextArea
    """,
    'author': 'Gnuthink Software Cia. Ltda.',
    'website': 'http://www.gnuthink.com',
    'license': 'AGPL-3',
    'depends': ['web'],
    'data': [],
    'active': False,
    'installable': True,
    'css': [
        'static/libs/bootstrap-wysihtml5/src/bootstrap-wysihtml5.css',
        'static/libs/bootstrap-wysihtml5/lib/css/bootstrap.min.css',
    ],
    'js': [
#        'static/libs/bootstrap-wysihtml5/lib/js/wysihtml5-0.3.0.js',
#        'static/libs/bootstrap-wysihtml5/lib/js/jquery-1.7.2.min.js',
#        'static/libs/bootstrap-wysihtml5/lib/js/bootstrap.min.js',
        'static/src/js/textarea.js',
    ],
    'qweb': [
        'static/src/xml/textarea.xml',
    ]
}

