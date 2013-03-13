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
    'name': 'Many2one Simple',
    'version': '1.0',
    'category': 'web',
    'description': """
    Simplify Many2One widget field, remove Create and Edit and Create options
    from autocomplete list
    """,
    'author': 'Gnuthink Software Cia. Ltda.',
    'website': 'http://www.gnuthink.com',
    'license': 'AGPL-3',
    'depends': ['web'],
    'data': [],
    'active': False,
    'installable': True,
    'js': [
        'static/src/js/fields.js',
    ],
}

